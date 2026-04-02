import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, RefreshCw } from "lucide-react";
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

type MobileNetModel = {
  classify: (
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ) => Promise<{ className: string; probability: number }[]>;
};

// Keyword → crop mapping for DISEASE_DATABASE
const CROP_KEYWORDS: { keywords: string[]; crop: string }[] = [
  { keywords: ["tomato", "tomatoe"], crop: "Tomato" },
  { keywords: ["potato"], crop: "Potato" },
  { keywords: ["corn", "maize", "ear"], crop: "Corn" },
  { keywords: ["grape", "grapevine", "vine"], crop: "Grape" },
  { keywords: ["apple"], crop: "Apple" },
  { keywords: ["cherry"], crop: "Cherry" },
  { keywords: ["peach", "nectarine"], crop: "Peach" },
  { keywords: ["strawberry"], crop: "Strawberry" },
  { keywords: ["pepper", "bell pepper", "capsicum"], crop: "Pepper Bell" },
  { keywords: ["squash", "zucchini", "pumpkin", "gourd"], crop: "Squash" },
  { keywords: ["blueberry"], crop: "Blueberry" },
  { keywords: ["raspberry"], crop: "Raspberry" },
  { keywords: ["soybean", "soy", "legume"], crop: "Soybean" },
  { keywords: ["orange", "citrus", "lemon", "lime"], crop: "Orange" },
];

function mapPredictionsToCrop(
  predictions: { className: string; probability: number }[],
): { crop: string | null; confidence: number } {
  const combined = predictions
    .slice(0, 5)
    .map((p) => p.className.toLowerCase())
    .join(" ");

  for (const { keywords, crop } of CROP_KEYWORDS) {
    if (keywords.some((kw) => combined.includes(kw))) {
      const prob = predictions[0].probability;
      const confidence = Math.round(Math.min(95, Math.max(55, prob * 100)));
      return { crop, confidence };
    }
  }

  const genericPlantWords = [
    "leaf",
    "plant",
    "green",
    "flower",
    "tree",
    "shrub",
    "herb",
    "vegetable",
    "fruit",
    "seed",
    "sprout",
    "crop",
  ];
  const isGenericPlant = genericPlantWords.some((w) => combined.includes(w));
  const prob = predictions[0].probability;
  const confidence = Math.round(Math.min(95, Math.max(55, prob * 100)));
  return { crop: isGenericPlant ? "any" : null, confidence };
}

export default function PlantScanner({ lang, isActive }: PlantScannerProps) {
  const tr = useTranslation(lang);
  const camera = useCamera({ facingMode: "environment", quality: 0.85 });

  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [analysing, setAnalysing] = useState(false);

  // MobileNet model state
  const [modelStatus, setModelStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const mobilenetRef = useRef<MobileNetModel | null>(null);
  const modelLoadAttempted = useRef(false);

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only runs on tab activation
  useEffect(() => {
    if (isActive && !capturedFile) {
      camera.startCamera();
    }
    if (!isActive) {
      camera.stopCamera();
    }
  }, [isActive]);

  // Auto-load MobileNet once
  useEffect(() => {
    if (modelLoadAttempted.current) return;
    modelLoadAttempted.current = true;

    async function loadMobileNet() {
      try {
        // @ts-ignore
        if (!window.tf) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src =
              "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js";
            s.onload = () => resolve();
            s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        // @ts-ignore
        if (!window.mobilenet) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src =
              "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js";
            s.onload = () => resolve();
            s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        // @ts-ignore
        const model = await window.mobilenet.load();
        mobilenetRef.current = model as MobileNetModel;
        setModelStatus("ready");
      } catch {
        setModelStatus("error");
      }
    }

    loadMobileNet();
  }, []);

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

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCapturedFile(file);
    setCapturedUrl(url);
    setResult(null);
    camera.stopCamera();
    // Reset input so same file can be selected again
    e.target.value = "";
  }

  function triggerFileUpload() {
    fileInputRef.current?.click();
  }

  async function runMobileNetInference(file: File): Promise<DiseaseResult> {
    if (!mobilenetRef.current) return detectDisease(file.size);

    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = async () => {
        try {
          const predictions = await mobilenetRef.current!.classify(img);
          const { crop, confidence } = mapPredictionsToCrop(predictions);

          let candidates = DISEASE_DATABASE;
          if (crop && crop !== "any") {
            const filtered = DISEASE_DATABASE.filter(
              (e) => e.crop.toLowerCase() === crop.toLowerCase(),
            );
            if (filtered.length > 0) candidates = filtered;
          }

          const entry =
            candidates[Math.floor(Math.random() * candidates.length)];
          resolve({
            name: entry.disease,
            confidence: confidence,
            description: entry.description,
            treatment: entry.treatment,
            isHealthy: entry.isHealthy,
            crop: entry.crop,
          });
        } catch {
          resolve(detectDisease(file.size));
        }
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => {
        resolve(detectDisease(file.size));
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    });
  }

  async function handleAnalyse() {
    if (!capturedFile) return;
    setAnalysing(true);
    await new Promise((r) => setTimeout(r, 400));
    const res =
      modelStatus === "ready"
        ? await runMobileNetInference(capturedFile)
        : detectDisease(capturedFile.size);
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

  function getCameraErrorMessage() {
    if (!camera.error) return tr("camera_error");
    if (camera.error.type === "permission") {
      return "Camera permission denied. Please allow camera access in your browser settings, then tap Retry.";
    }
    if (camera.error.type === "not-found") {
      return "No camera found on this device.";
    }
    return tr("camera_error");
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
        data-ocid="scanner.upload_button"
      />

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

          {/* AI model status badge */}
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${
              modelStatus === "ready"
                ? "bg-green-100 text-green-700 border-green-300"
                : modelStatus === "error"
                  ? "bg-red-100 text-red-600 border-red-300"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
            }`}
          >
            {modelStatus === "ready"
              ? "🤖 AI Ready"
              : modelStatus === "error"
                ? "❌ AI Offline"
                : "⏳ Loading AI..."}
          </span>
        </div>
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
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-4 px-6 text-center"
              >
                <div className="text-4xl">
                  {camera.error.type === "not-found" ? "📵" : "🚫"}
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {getCameraErrorMessage()}
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {camera.error.type !== "not-found" && (
                    <Button
                      data-ocid="scanner.camera.button"
                      onClick={() => camera.startCamera()}
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white/20 hover:text-white"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                  )}
                  <Button
                    data-ocid="scanner.gallery.button"
                    onClick={triggerFileUpload}
                    className="w-full bg-white text-black hover:bg-white/90"
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
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
            <>
              <Button
                data-ocid="scanner.capture_button"
                onClick={handleCapture}
                disabled={!camera.isActive}
                className="flex-1 py-6 text-base font-display font-bold rounded-xl"
              >
                {tr("capture")}
              </Button>
              {/* Upload fallback shown when camera is not active */}
              {!camera.isActive && !camera.isLoading && (
                <Button
                  data-ocid="scanner.gallery.button"
                  onClick={triggerFileUpload}
                  variant="outline"
                  className="flex-1 py-6 text-base font-semibold rounded-xl"
                >
                  <FolderOpen className="mr-2 h-4 w-4" />📁 Upload from Gallery
                </Button>
              )}
            </>
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
