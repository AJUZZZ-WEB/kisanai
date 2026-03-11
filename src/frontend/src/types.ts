export interface SoilParams {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  season: "Kharif" | "Rabi" | "Zaid";
}

export interface CropRecommendation {
  name: string;
  emoji: string;
  yieldScore: number;
  profitScore: number;
  sustainScore: number;
  tip: string;
}

export interface RotationEntry {
  id: string;
  season: string;
  year: string;
  cropName: string;
}

export interface DiseaseResult {
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  isHealthy: boolean;
}

export interface MarketPrice {
  crop: string;
  emoji: string;
  price: number;
  trend: "up" | "down" | "stable";
  change: string;
}

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}
