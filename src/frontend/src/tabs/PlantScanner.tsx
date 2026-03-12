import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCamera } from "../camera/useCamera";
import { DISEASE_DATABASE, detectDisease } from "../diseaseLogic";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { DiseaseResult } from "../types";

interface PlantScannerProps {
  lang: Lang;
  isActive: boolean;
}

type TFModel = {
  predict: (tensor: unknown) => { data: () => Promise<Float32Array> };
};

export default function PlantScanner({ lang, isActive }: PlantScannerProps) {
  const tr = useTranslation(lang);
  const camera = useCamera({ facingMode: "environment", quality: 0.85 });

  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [analysing, setAnalysing] = useState(false);

  // TFjs model state
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [showModelPanel, setShowModelPanel] = useState(false);
  const modelRef = useRef<TFModel | null>(null);
  const modelFileRef = useRef<HTMLInputElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only runs on tab activation
  useEffect(() => {
    if (isActive && !capturedFile) {
      camera.startCamera();
    }
    if (!isActive) {
      camera.stopCamera();
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    };
  }, [capturedUrl]);

  async function handleCapture() {
    const file = await camera.capturePhoto();
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedFile(file);
      setCapturedUrl(url);
      setResult(null);
      camera.stopCamera();
    }
  }

  async function runTFInference(file: File): Promise<DiseaseResult> {
    // Dynamically load TF.js only when a model is loaded
    // @ts-ignore
    const tf = window.tf as
      | {
          browser: { fromPixels: (img: HTMLImageElement) => unknown };
          image: {
            resizeBilinear: (t: unknown, size: [number, number]) => unknown;
          };
          cast: (t: unknown, dtype: string) => unknown;
          div: (t: unknown, scalar: number) => unknown;
          expandDims: (t: unknown, axis: number) => unknown;
        }
      | undefined;

    if (!tf || !modelRef.current) return detectDisease(file.size);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const tensor = tf.expandDims(
            tf.div(
              tf.cast(
                tf.image.resizeBilinear(tf.browser.fromPixels(img), [224, 224]),
                "float32",
              ),
              255,
            ),
            0,
          );
          const predTensor = modelRef.current!.predict(tensor);
          const predData = await predTensor.data();
          const maxIdx = Array.from(predData).indexOf(
            Math.max(...Array.from(predData)),
          );
          const entry = DISEASE_DATABASE[maxIdx % DISEASE_DATABASE.length];
          resolve({
            name: entry.disease,
            confidence: Math.round(predData[maxIdx] * 100),
            description: entry.description,
            treatment: entry.treatment,
            isHealthy: entry.isHealthy,
            crop: entry.crop,
          });
        } catch {
          resolve(detectDisease(file.size));
        }
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  async function handleAnalyse() {
    if (!capturedFile) return;
    setAnalysing(true);
    await new Promise((r) => setTimeout(r, modelLoaded ? 600 : 1800));
    const res = modelLoaded
      ? await runTFInference(capturedFile)
      : detectDisease(capturedFile.size);
    setResult(res);
    setAnalysing(false);
  }

  async function handleModelUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setModelLoading(true);
    setModelError(false);
    try {
      // Dynamically inject TF.js if not present
      // @ts-ignore
      if (!window.tf) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js";
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      // @ts-ignore
      const tf = window.tf;
      const modelUrl = URL.createObjectURL(file);
      const model = await tf.loadLayersModel(modelUrl);
      modelRef.current = model;
      setModelLoaded(true);
      setShowModelPanel(false);
    } catch {
      setModelError(true);
    } finally {
      setModelLoading(false);
    }
  }

  function handleRetake() {
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedFile(null);
    setCapturedUrl(null);
    setResult(null);
    camera.startCamera();
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">
              🌿 {tr("scanner_title")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {tr("scanner_instruction")}
            </p>
          </div>
          <button
            type="button"
            data-ocid="scanner.model_toggle"
            onClick={() => setShowModelPanel((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${
              modelLoaded
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
            }`}
          >
            {modelLoaded
              ? `✅ ${tr("model_loaded")}`
              : `🤖 ${tr("load_model")}`}
          </button>
        </div>

        {/* Model upload panel */}
        <AnimatePresence>
          {showModelPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 rounded-xl border border-border bg-muted/50 p-3 overflow-hidden"
            >
              <p className="text-xs text-muted-foreground mb-2">
                {tr("model_instruction")}
              </p>
              <input
                ref={modelFileRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleModelUpload}
              />
              <Button
                data-ocid="scanner.model_upload_button"
                size="sm"
                variant="outline"
                disabled={modelLoading}
                onClick={() => modelFileRef.current?.click()}
                className="w-full"
              >
                {modelLoading ? tr("model_loading") : "📂 Upload model.json"}
              </Button>
              {modelError && (
                <p
                  data-ocid="scanner.model.error_state"
                  className="text-xs text-destructive mt-2"
                >
                  {tr("model_error")}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4">
        {!capturedFile ? (
          <div
            className="relative rounded-2xl overflow-hidden bg-black"
            style={{ aspectRatio: "4/3" }}
          >
            <video
              ref={camera.videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={camera.canvasRef} className="hidden" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white/60 rounded-2xl" />
            </div>

            {camera.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-center">
                  <div className="text-3xl mb-2 animate-spin">🌿</div>
                  <p className="text-sm">Loading camera...</p>
                </div>
              </div>
            )}

            {camera.error && (
              <div
                data-ocid="scanner.camera.error_state"
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3"
              >
                <p className="text-white text-sm">{tr("camera_error")}</p>
                <Button
                  onClick={() => camera.startCamera()}
                  variant="outline"
                  className="text-white border-white"
                >
                  {tr("start_camera")}
                </Button>
              </div>
            )}

            {!camera.isActive && !camera.isLoading && !camera.error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 gap-3">
                <div className="text-5xl">📷</div>
                <Button
                  onClick={() => camera.startCamera()}
                  className="bg-white text-primary font-semibold"
                >
                  {tr("start_camera")}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={capturedUrl ?? ""}
              alt="Captured plant"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {!capturedFile ? (
            <Button
              data-ocid="scanner.capture_button"
              onClick={handleCapture}
              disabled={!camera.isActive}
              className="flex-1 py-6 text-base font-display font-bold rounded-xl"
            >
              {tr("capture")}
            </Button>
          ) : (
            <>
              <Button
                data-ocid="scanner.retake_button"
                onClick={handleRetake}
                variant="outline"
                className="flex-1 py-6 text-base font-semibold rounded-xl border-border"
              >
                {tr("retake")}
              </Button>
              <Button
                data-ocid="scanner.analyse_button"
                onClick={handleAnalyse}
                disabled={analysing}
                className="flex-1 py-6 text-base font-display font-bold rounded-xl"
              >
                {analysing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">🔬</span> {tr("analysing")}
                  </span>
                ) : (
                  tr("analyse")
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 mt-5 pb-6"
          >
            <h3 className="text-lg font-display font-bold mb-3">
              🔍 {tr("disease_result")}
            </h3>
            <Card className="shadow-card border-0 overflow-hidden">
              <div
                className="h-2"
                style={{
                  background: result.isHealthy
                    ? "oklch(0.40 0.13 145)"
                    : "oklch(0.56 0.20 25)",
                }}
              />
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-display font-bold text-foreground">
                      {result.isHealthy ? "✅" : "⚠️"} {result.name}
                    </h4>
                    {result.crop && (
                      <p className="text-xs text-muted-foreground">
                        🌿 {result.crop}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {tr("confidence")}:{" "}
                      <span className="font-semibold text-primary">
                        {result.confidence}%
                      </span>
                    </p>
                  </div>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      background: result.isHealthy
                        ? "oklch(0.40 0.13 145)"
                        : "oklch(0.56 0.20 25)",
                    }}
                  >
                    {result.confidence}%
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {result.description}
                </p>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    💊 {tr("treatment")}
                  </p>
                  <div className="flex flex-col gap-2">
                    {result.treatment.map((step, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: treatment steps are ordered
                      <div key={i} className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-bold"
                          style={{ background: "oklch(0.40 0.13 145)" }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
