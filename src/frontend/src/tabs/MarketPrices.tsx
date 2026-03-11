import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { MarketPrice } from "../types";

interface MarketPricesProps {
  lang: Lang;
}

const PRICES: MarketPrice[] = [
  { crop: "Rice", emoji: "🌾", price: 2200, trend: "up", change: "+3%" },
  { crop: "Wheat", emoji: "🌿", price: 2150, trend: "stable", change: "0%" },
  { crop: "Maize", emoji: "🌽", price: 1850, trend: "up", change: "+5%" },
  { crop: "Soybean", emoji: "🫘", price: 4200, trend: "down", change: "-2%" },
  { crop: "Cotton", emoji: "☁️", price: 6500, trend: "up", change: "+8%" },
  {
    crop: "Sugarcane",
    emoji: "🎋",
    price: 350,
    trend: "stable",
    change: "+1%",
  },
  { crop: "Tomato", emoji: "🍅", price: 1200, trend: "down", change: "-12%" },
  { crop: "Onion", emoji: "🧅", price: 1800, trend: "up", change: "+15%" },
];

export default function MarketPrices({ lang }: MarketPricesProps) {
  const tr = useTranslation(lang);

  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const trendIcon = (t: MarketPrice["trend"]) =>
    t === "up" ? "↑" : t === "down" ? "↓" : "→";
  const trendClass = (t: MarketPrice["trend"]) =>
    t === "up" ? "price-up" : t === "down" ? "price-down" : "price-stable";

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-display font-bold text-foreground">
          📊 {tr("market_title")}
        </h2>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        {tr("last_updated")}: {dateStr}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {PRICES.map((item, i) => (
          <motion.div
            key={item.crop}
            data-ocid={`market.price_card.${i + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
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
                  ₹{item.price.toLocaleString("en-IN")}
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
            ? "कपास और प्याज की कीमतें इस सप्ताह मजबूत हैं। टमाटर की कीमत में गिरावट है — कटाई में देरी पर विचार करें।"
            : "Cotton (+8%) and Onion (+15%) showing strong price momentum this week. Tomato prices down 12% — consider delaying harvest if possible."}
        </p>
      </motion.div>
    </div>
  );
}
