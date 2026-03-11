import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCamera } from "../camera/useCamera";
import { detectDisease } from "../diseaseLogic";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { DiseaseResult } from "../types";

interface PlantScannerProps {
  lang: Lang;
  isActive: boolean;
}

export default function PlantScanner({ lang, isActive }: PlantScannerProps) {
  const tr = useTranslation(lang);
  const camera = useCamera({ facingMode: "environment", quality: 0.85 });

  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [analysing, setAnalysing] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only runs on tab activation
  useEffect(() => {
    if (isActive && !capturedFile) {
      camera.startCamera();
    }
    if (!isActive) {
      camera.stopCamera();
    }
  }, [isActive]);

  // Cleanup blob URL
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

  async function handleAnalyse() {
    if (!capturedFile) return;
    setAnalysing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const res = detectDisease(capturedFile.size);
    setResult(res);
    setAnalysing(false);
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
        <h2 className="text-xl font-display font-bold text-foreground">
          🌿 {tr("scanner_title")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {tr("scanner_instruction")}
        </p>
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
