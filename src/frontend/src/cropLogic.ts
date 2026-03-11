import type { CropRecommendation, SoilParams } from "./types";

const ALL_CROPS: Array<{
  name: string;
  emoji: string;
  minPH: number;
  maxPH: number;
  moistureMin: number;
  moistureMax: number;
  seasons: string[];
  yieldScore: number;
  profitScore: number;
  sustainScore: number;
  tip: string;
}> = [
  {
    name: "Rice",
    emoji: "🌾",
    minPH: 5.5,
    maxPH: 7.0,
    moistureMin: 60,
    moistureMax: 100,
    seasons: ["Kharif"],
    yieldScore: 85,
    profitScore: 70,
    sustainScore: 75,
    tip: "Maintain standing water of 5cm during vegetative stage. Use SRI method for better yield.",
  },
  {
    name: "Wheat",
    emoji: "🌿",
    minPH: 6.0,
    maxPH: 7.5,
    moistureMin: 30,
    moistureMax: 60,
    seasons: ["Rabi"],
    yieldScore: 80,
    profitScore: 75,
    sustainScore: 80,
    tip: "Apply first irrigation at crown root initiation stage (21 days after sowing).",
  },
  {
    name: "Maize",
    emoji: "🌽",
    minPH: 5.8,
    maxPH: 7.0,
    moistureMin: 30,
    moistureMax: 70,
    seasons: ["Kharif", "Zaid"],
    yieldScore: 75,
    profitScore: 65,
    sustainScore: 70,
    tip: "Ensure proper spacing (60×25cm) and apply split nitrogen doses for higher yield.",
  },
  {
    name: "Soybean",
    emoji: "🫘",
    minPH: 6.0,
    maxPH: 7.0,
    moistureMin: 40,
    moistureMax: 80,
    seasons: ["Kharif"],
    yieldScore: 70,
    profitScore: 80,
    sustainScore: 85,
    tip: "Inoculate seeds with Rhizobium culture before sowing to fix atmospheric nitrogen.",
  },
  {
    name: "Cotton",
    emoji: "☁️",
    minPH: 6.0,
    maxPH: 8.0,
    moistureMin: 0,
    moistureMax: 50,
    seasons: ["Kharif"],
    yieldScore: 65,
    profitScore: 85,
    sustainScore: 60,
    tip: "Monitor for bollworm. Install pheromone traps at 5 traps/hectare for pest monitoring.",
  },
  {
    name: "Sugarcane",
    emoji: "🎋",
    minPH: 6.0,
    maxPH: 7.5,
    moistureMin: 70,
    moistureMax: 100,
    seasons: ["Kharif"],
    yieldScore: 90,
    profitScore: 90,
    sustainScore: 55,
    tip: "Use trash mulching to conserve moisture and suppress weeds effectively.",
  },
  {
    name: "Tomato",
    emoji: "🍅",
    minPH: 5.5,
    maxPH: 7.0,
    moistureMin: 30,
    moistureMax: 70,
    seasons: ["Kharif", "Rabi", "Zaid"],
    yieldScore: 70,
    profitScore: 75,
    sustainScore: 65,
    tip: "Use drip irrigation with fertigation for 30% water saving and higher fruit quality.",
  },
  {
    name: "Onion",
    emoji: "🧅",
    minPH: 6.0,
    maxPH: 7.5,
    moistureMin: 0,
    moistureMax: 50,
    seasons: ["Rabi"],
    yieldScore: 65,
    profitScore: 70,
    sustainScore: 70,
    tip: "Stop irrigation 10 days before harvest to improve storage quality and shelf life.",
  },
];

export function getCropRecommendations(
  params: SoilParams,
): CropRecommendation[] {
  const scored = ALL_CROPS.map((crop) => {
    let score = 0;
    const phMatch = params.ph >= crop.minPH && params.ph <= crop.maxPH;
    const moistureMatch =
      params.moisture >= crop.moistureMin &&
      params.moisture <= crop.moistureMax;
    const seasonMatch = crop.seasons.includes(params.season);

    if (phMatch) score += 40;
    if (moistureMatch) score += 35;
    if (seasonMatch) score += 25;

    return { ...crop, matchScore: score };
  });

  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map(({ name, emoji, yieldScore, profitScore, sustainScore, tip }) => ({
      name,
      emoji,
      yieldScore,
      profitScore,
      sustainScore,
      tip,
    }));
}
