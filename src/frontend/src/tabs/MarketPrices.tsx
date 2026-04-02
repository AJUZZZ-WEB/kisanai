import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";

interface MarketPricesProps {
  lang: Lang;
}

type State =
  | "All India"
  | "Punjab"
  | "Maharashtra"
  | "Telangana"
  | "Tamil Nadu"
  | "Uttar Pradesh";
type Trend = "up" | "down" | "stable";

interface CropPrice {
  crop: string;
  emoji: string;
  base: number;
  trend: Trend;
  change: string;
  stateMultiplier: Partial<Record<State, number>>;
}

const STATES: State[] = [
  "All India",
  "Punjab",
  "Maharashtra",
  "Telangana",
  "Tamil Nadu",
  "Uttar Pradesh",
];

const CROPS: CropPrice[] = [
  {
    crop: "Rice",
    emoji: "🌾",
    base: 2200,
    trend: "up",
    change: "+3%",
    stateMultiplier: {
      Punjab: 0.955,
      Maharashtra: 1.045,
      Telangana: 1.0,
      "Tamil Nadu": 1.09,
      "Uttar Pradesh": 0.95,
    },
  },
  {
    crop: "Wheat",
    emoji: "🌿",
    base: 2150,
    trend: "stable",
    change: "0%",
    stateMultiplier: {
      Punjab: 1.05,
      Maharashtra: 0.97,
      Telangana: 0.96,
      "Tamil Nadu": 0.94,
      "Uttar Pradesh": 1.08,
    },
  },
  {
    crop: "Maize",
    emoji: "🌽",
    base: 1850,
    trend: "up",
    change: "+5%",
    stateMultiplier: {
      Punjab: 1.02,
      Maharashtra: 1.0,
      Telangana: 1.03,
      "Tamil Nadu": 0.98,
      "Uttar Pradesh": 1.01,
    },
  },
  {
    crop: "Soybean",
    emoji: "🫘",
    base: 4200,
    trend: "down",
    change: "-2%",
    stateMultiplier: {
      Punjab: 0.97,
      Maharashtra: 1.05,
      Telangana: 1.02,
      "Tamil Nadu": 1.0,
      "Uttar Pradesh": 0.98,
    },
  },
  {
    crop: "Cotton",
    emoji: "☁️",
    base: 6500,
    trend: "up",
    change: "+8%",
    stateMultiplier: {
      Punjab: 0.98,
      Maharashtra: 1.02,
      Telangana: 1.06,
      "Tamil Nadu": 1.03,
      "Uttar Pradesh": 0.95,
    },
  },
  {
    crop: "Sugarcane",
    emoji: "🎋",
    base: 350,
    trend: "stable",
    change: "+1%",
    stateMultiplier: {
      Punjab: 1.04,
      Maharashtra: 1.02,
      Telangana: 0.97,
      "Tamil Nadu": 1.01,
      "Uttar Pradesh": 1.1,
    },
  },
  {
    crop: "Tomato",
    emoji: "🍅",
    base: 1200,
    trend: "down",
    change: "-12%",
    stateMultiplier: {
      Punjab: 0.94,
      Maharashtra: 0.96,
      Telangana: 1.05,
      "Tamil Nadu": 1.08,
      "Uttar Pradesh": 0.93,
    },
  },
  {
    crop: "Onion",
    emoji: "🧅",
    base: 1800,
    trend: "up",
    change: "+15%",
    stateMultiplier: {
      Punjab: 0.96,
      Maharashtra: 1.08,
      Telangana: 1.02,
      "Tamil Nadu": 1.0,
      "Uttar Pradesh": 0.97,
    },
  },
  {
    crop: "Potato",
    emoji: "🥔",
    base: 1400,
    trend: "stable",
    change: "+2%",
    stateMultiplier: {
      Punjab: 1.03,
      Maharashtra: 0.99,
      Telangana: 0.97,
      "Tamil Nadu": 0.96,
      "Uttar Pradesh": 1.06,
    },
  },
  {
    crop: "Chickpea",
    emoji: "🟡",
    base: 5300,
    trend: "up",
    change: "+4%",
    stateMultiplier: {
      Punjab: 1.0,
      Maharashtra: 1.04,
      Telangana: 1.02,
      "Tamil Nadu": 0.97,
      "Uttar Pradesh": 1.03,
    },
  },
  {
    crop: "Mustard",
    emoji: "🌼",
    base: 5800,
    trend: "up",
    change: "+6%",
    stateMultiplier: {
      Punjab: 1.06,
      Maharashtra: 0.97,
      Telangana: 0.95,
      "Tamil Nadu": 0.93,
      "Uttar Pradesh": 1.05,
    },
  },
  {
    crop: "Groundnut",
    emoji: "🥜",
    base: 5600,
    trend: "stable",
    change: "+1%",
    stateMultiplier: {
      Punjab: 0.98,
      Maharashtra: 1.03,
      Telangana: 1.05,
      "Tamil Nadu": 1.07,
      "Uttar Pradesh": 0.97,
    },
  },
  {
    crop: "Turmeric",
    emoji: "🟠",
    base: 9200,
    trend: "up",
    change: "+10%",
    stateMultiplier: {
      Punjab: 0.95,
      Maharashtra: 1.0,
      Telangana: 1.08,
      "Tamil Nadu": 1.05,
      "Uttar Pradesh": 0.97,
    },
  },
  {
    crop: "Ginger",
    emoji: "🫚",
    base: 7800,
    trend: "up",
    change: "+7%",
    stateMultiplier: {
      Punjab: 0.96,
      Maharashtra: 1.02,
      Telangana: 1.04,
      "Tamil Nadu": 1.06,
      "Uttar Pradesh": 0.99,
    },
  },
  {
    crop: "Arhar Dal",
    emoji: "🟤",
    base: 6800,
    trend: "down",
    change: "-3%",
    stateMultiplier: {
      Punjab: 0.98,
      Maharashtra: 1.03,
      Telangana: 1.06,
      "Tamil Nadu": 1.02,
      "Uttar Pradesh": 1.01,
    },
  },
  {
    crop: "Urad Dal",
    emoji: "⚪",
    base: 7200,
    trend: "stable",
    change: "0%",
    stateMultiplier: {
      Punjab: 0.97,
      Maharashtra: 1.04,
      Telangana: 1.05,
      "Tamil Nadu": 1.03,
      "Uttar Pradesh": 1.0,
    },
  },
  {
    crop: "Sunflower",
    emoji: "🌻",
    base: 5400,
    trend: "up",
    change: "+5%",
    stateMultiplier: {
      Punjab: 0.99,
      Maharashtra: 1.01,
      Telangana: 1.07,
      "Tamil Nadu": 1.04,
      "Uttar Pradesh": 0.97,
    },
  },
  {
    crop: "Sesame",
    emoji: "🌰",
    base: 8500,
    trend: "up",
    change: "+9%",
    stateMultiplier: {
      Punjab: 0.96,
      Maharashtra: 1.0,
      Telangana: 1.06,
      "Tamil Nadu": 1.08,
      "Uttar Pradesh": 0.98,
    },
  },
  {
    crop: "Bajra",
    emoji: "🌾",
    base: 2350,
    trend: "stable",
    change: "+2%",
    stateMultiplier: {
      Punjab: 1.01,
      Maharashtra: 1.0,
      Telangana: 0.98,
      "Tamil Nadu": 0.96,
      "Uttar Pradesh": 1.03,
    },
  },
  {
    crop: "Jowar",
    emoji: "🌾",
    base: 2200,
    trend: "stable",
    change: "0%",
    stateMultiplier: {
      Punjab: 0.98,
      Maharashtra: 1.04,
      Telangana: 1.02,
      "Tamil Nadu": 1.01,
      "Uttar Pradesh": 0.99,
    },
  },
  {
    crop: "Banana",
    emoji: "🍌",
    base: 1600,
    trend: "up",
    change: "+6%",
    stateMultiplier: {
      Punjab: 0.96,
      Maharashtra: 1.03,
      Telangana: 1.05,
      "Tamil Nadu": 1.1,
      "Uttar Pradesh": 0.98,
    },
  },
  {
    crop: "Mango",
    emoji: "🥭",
    base: 4500,
    trend: "up",
    change: "+12%",
    stateMultiplier: {
      Punjab: 0.93,
      Maharashtra: 1.05,
      Telangana: 1.09,
      "Tamil Nadu": 1.07,
      "Uttar Pradesh": 1.04,
    },
  },
  {
    crop: "Garlic",
    emoji: "🧄",
    base: 8200,
    trend: "up",
    change: "+18%",
    stateMultiplier: {
      Punjab: 1.02,
      Maharashtra: 1.06,
      Telangana: 1.0,
      "Tamil Nadu": 0.97,
      "Uttar Pradesh": 1.05,
    },
  },
  {
    crop: "Capsicum",
    emoji: "🫑",
    base: 3200,
    trend: "down",
    change: "-5%",
    stateMultiplier: {
      Punjab: 1.0,
      Maharashtra: 1.03,
      Telangana: 1.05,
      "Tamil Nadu": 1.08,
      "Uttar Pradesh": 0.97,
    },
  },
  {
    crop: "Watermelon",
    emoji: "🍉",
    base: 900,
    trend: "up",
    change: "+8%",
    stateMultiplier: {
      Punjab: 1.02,
      Maharashtra: 1.0,
      Telangana: 1.04,
      "Tamil Nadu": 1.03,
      "Uttar Pradesh": 1.01,
    },
  },
];

function getStatePrice(crop: CropPrice, state: State): number {
  if (state === "All India") return crop.base;
  const mult = crop.stateMultiplier[state] ?? 1;
  return Math.round(crop.base * mult);
}

export default function MarketPrices({ lang }: MarketPricesProps) {
  const tr = useTranslation(lang);
  const [selectedState, setSelectedState] = useState<State>("All India");

  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const trendIcon = (t: Trend) => (t === "up" ? "↑" : t === "down" ? "↓" : "→");
  const trendClass = (t: Trend) =>
    t === "up" ? "price-up" : t === "down" ? "price-down" : "price-stable";

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-display font-bold text-foreground">
          📊 {tr("market_title")}
        </h2>
      </div>

      {/* State selector */}
      <div className="flex gap-2 items-center mb-3 overflow-x-auto pb-1">
        {STATES.map((s) => (
          <button
            key={s}
            type="button"
            data-ocid="market.state_filter.tab"
            onClick={() => setSelectedState(s)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              selectedState === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-5">
        {tr("last_updated")}: {dateStr} · ₹/quintal
      </p>

      <div className="grid grid-cols-2 gap-3">
        {CROPS.map((item, i) => (
          <motion.div
            key={item.crop}
            data-ocid={`market.price_card.${i + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="shadow-card border-0 overflow-hidden h-full">
              <div
                className="h-1"
                style={{
                  background:
                    item.trend === "up"
                      ? "oklch(0.40 0.13 145)"
                      : item.trend === "down"
                        ? "oklch(0.56 0.20 25)"
                        : "oklch(0.75 0.17 65)",
                }}
              />
              <CardContent className="p-3">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <p className="font-display font-bold text-sm text-foreground">
                  {item.crop}
                </p>
                <p className="text-lg font-bold text-primary mt-1">
                  ₹{getStatePrice(item, selectedState).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tr("per_quintal")}
                </p>
                <div
                  className={`flex items-center gap-1 mt-2 text-sm font-bold ${trendClass(item.trend)}`}
                >
                  <span>{trendIcon(item.trend)}</span>
                  <span>{item.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Market insight */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 rounded-2xl p-4"
        style={{ background: "oklch(0.95 0.04 145)" }}
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          📈 {lang === "hi" ? "बाज़ार अंतर्दृष्टि" : "Market Insight"}
        </p>
        <p className="text-sm text-foreground">
          {lang === "hi"
            ? "लहसुन (+18%), प्याज (+15%), और हल्दी (+10%) इस सप्ताह मजबूत कीमत दिखा रहे हैं। टमाटर और शिमला मिर्च की कीमत में गिरावट — कटाई में देरी पर विचार करें।"
            : "Garlic (+18%), Onion (+15%), Turmeric (+10%) showing strong momentum. Tomato & Capsicum prices down — consider delaying harvest if possible."}
        </p>
      </motion.div>
    </div>
  );
}
