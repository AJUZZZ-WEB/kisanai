import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { CropRecommendation, SoilParams } from "../types";

interface DashboardProps {
  lang: Lang;
  farmerName: string;
  lastSoil: SoilParams | null;
  lastRec: CropRecommendation | null;
  onScanClick: () => void;
  onLangToggle: () => void;
}

export default function Dashboard({
  lang,
  farmerName,
  lastSoil,
  lastRec,
  onScanClick,
  onLangToggle,
}: DashboardProps) {
  const tr = useTranslation(lang);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-8 pb-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.12 145), oklch(0.45 0.14 150))",
        }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10 bg-white" />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img
                src="/assets/generated/kisanai-logo-transparent.dim_120x120.png"
                alt="KisanAI"
                className="w-8 h-8"
              />
              <span className="text-white/70 text-sm font-body">KisanAI</span>
            </div>
            <h1 className="text-white text-2xl font-display font-bold leading-tight">
              {tr("welcome")},
            </h1>
            <h2 className="text-white/90 text-3xl font-display font-extrabold">
              {farmerName}
            </h2>
          </div>
          <button
            type="button"
            data-ocid="dashboard.language_toggle"
            onClick={onLangToggle}
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors border border-white/30"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Button
            data-ocid="dashboard.scan_button"
            onClick={onScanClick}
            className="w-full bg-white text-primary font-display font-bold text-base py-6 rounded-2xl shadow-lg hover:bg-white/95 active:scale-[0.98] transition-transform"
            size="lg"
          >
            {tr("scan_plant")}
          </Button>
          <p className="text-white/60 text-xs text-center mt-2">
            {tr("tap_to_scan")}
          </p>
        </motion.div>
      </div>

      {/* Summary cards */}
      <div className="px-4 -mt-4 flex flex-col gap-3 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                  🌍
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {tr("soil_status")}
                  </p>
                  {lastSoil ? (
                    <p className="text-foreground font-semibold">
                      pH {lastSoil.ph.toFixed(1)} · {lastSoil.moisture}%{" "}
                      {lang === "hi" ? "नमी" : "moisture"}
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {tr("no_data_yet")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                  🌱
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {tr("last_recommendation")}
                  </p>
                  {lastRec ? (
                    <p className="text-foreground font-semibold">
                      {lastRec.emoji} {lastRec.name}
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {tr("no_data_yet")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                  📈
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {tr("market_today")}
                  </p>
                  <p className="text-foreground font-semibold">
                    Cotton ☁️ · ₹6,500/q{" "}
                    <span className="text-emerald-600 text-sm">↑+8%</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-4"
          style={{ background: "oklch(0.95 0.04 145)" }}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            🌞 {lang === "hi" ? "आज की सलाह" : "Today's Tip"}
          </p>
          <p className="text-sm text-foreground">
            {lang === "hi"
              ? "सुबह 6-8 बजे सिंचाई करें — वाष्पीकरण कम होगा और फसल को अधिक पानी मिलेगा।"
              : "Irrigate between 6–8 AM to minimize evaporation and maximize water uptake by roots."}
          </p>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
