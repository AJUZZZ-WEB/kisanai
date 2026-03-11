import type { DiseaseResult } from "./types";

const DISEASES: DiseaseResult[] = [
  {
    name: "Healthy Plant",
    confidence: 94,
    description:
      "No disease detected. Your plant appears healthy with good leaf color and structure.",
    treatment: [
      "Continue regular watering schedule",
      "Apply balanced NPK fertilizer monthly",
      "Monitor for early pest signs weekly",
      "Ensure adequate sunlight (6-8 hours/day)",
    ],
    isHealthy: true,
  },
  {
    name: "Leaf Blight",
    confidence: 87,
    description:
      "Fungal infection causing brown, water-soaked lesions on leaves. Spreads rapidly in humid conditions.",
    treatment: [
      "Apply copper-based fungicide (Bordeaux mixture 1%)",
      "Remove and destroy infected leaves immediately",
      "Improve field drainage to reduce humidity",
      "Space plants to improve air circulation",
      "Avoid overhead irrigation — use drip instead",
    ],
    isHealthy: false,
  },
  {
    name: "Powdery Mildew",
    confidence: 91,
    description:
      "Fungal disease appearing as white powdery coating on leaf surfaces. Thrives in dry conditions with high humidity.",
    treatment: [
      "Spray sulfur-based fungicide (0.2% wettable sulfur)",
      "Apply neem oil spray (5ml/L water) as preventive",
      "Reduce plant density to improve air flow",
      "Avoid excess nitrogen fertilization",
      "Remove severely infected plant parts",
    ],
    isHealthy: false,
  },
  {
    name: "Root Rot",
    confidence: 83,
    description:
      "Caused by overwatering or poorly drained soil. Roots turn brown/black and soft, affecting nutrient uptake.",
    treatment: [
      "Immediately reduce irrigation frequency",
      "Apply Trichoderma-based bio-fungicide to soil",
      "Improve soil drainage with organic matter",
      "Drench soil with Carbendazim 0.1% solution",
      "Avoid waterlogging — raise beds if needed",
    ],
    isHealthy: false,
  },
  {
    name: "Aphid Infestation",
    confidence: 89,
    description:
      "Small soft-bodied insects sucking plant sap from leaves, causing curling, yellowing, and stunted growth.",
    treatment: [
      "Spray neem oil solution (10ml + 5ml soap/L water)",
      "Introduce ladybugs as natural predators",
      "Apply imidacloprid 17.8% SL (0.5ml/L) if severe",
      "Use yellow sticky traps to monitor population",
      "Remove heavily infested shoot tips",
    ],
    isHealthy: false,
  },
];

export function detectDisease(imageSize: number): DiseaseResult {
  const index = imageSize % DISEASES.length;
  const disease = DISEASES[index];
  // Vary confidence slightly
  const variance = (imageSize % 10) - 5;
  return {
    ...disease,
    confidence: Math.min(96, Math.max(78, disease.confidence + variance)),
  };
}
