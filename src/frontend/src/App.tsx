import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import NamePrompt from "./components/NamePrompt";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import type { Lang } from "./i18n";
import { useTranslation } from "./i18n";
import AdvisoryChat from "./tabs/AdvisoryChat";
import CropAdvisor from "./tabs/CropAdvisor";
import Dashboard from "./tabs/Dashboard";
import MarketPrices from "./tabs/MarketPrices";
import PlantScanner from "./tabs/PlantScanner";
import type { CropRecommendation, RotationEntry, SoilParams } from "./types";

type Tab = "dashboard" | "advisor" | "scanner" | "market" | "chat";

const INITIAL_ROTATION: RotationEntry[] = [
  { id: "1", season: "Kharif", year: "2023", cropName: "Rice" },
  { id: "2", season: "Rabi", year: "2023", cropName: "Wheat" },
  { id: "3", season: "Kharif", year: "2022", cropName: "Soybean" },
];

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const [lang, setLang] = useState<Lang>("en");
  const [farmerName, setFarmerName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [lastSoil, setLastSoil] = useState<SoilParams | null>(null);
  const [lastRec, setLastRec] = useState<CropRecommendation | null>(null);
  const [formLoggedIn, setFormLoggedIn] = useState(false);

  const tr = useTranslation(lang);

  function toggleLang() {
    setLang((l) => (l === "en" ? "hi" : "en"));
  }

  function handleRecommendations(soil: SoilParams, recs: CropRecommendation[]) {
    setLastSoil(soil);
    if (recs.length > 0) setLastRec(recs[0]);
  }

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.30 0.12 145), oklch(0.20 0.07 50))",
        }}
      >
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🌱</div>
          <p className="text-white/70 font-body">Loading KisanAI...</p>
        </div>
      </div>
    );
  }

  if (!identity && !formLoggedIn) {
    return (
      <LoginScreen
        lang={lang}
        onLangToggle={toggleLang}
        onLogin={() => setFormLoggedIn(true)}
      />
    );
  }

  if (!farmerName) {
    return <NamePrompt lang={lang} onSubmit={setFarmerName} />;
  }

  const tabs: Array<{
    id: Tab;
    emoji: string;
    ocid: string;
    labelKey:
      | "nav_dashboard"
      | "nav_advisor"
      | "nav_scanner"
      | "nav_market"
      | "nav_chat";
  }> = [
    {
      id: "dashboard",
      emoji: "🏠",
      ocid: "nav.dashboard_tab",
      labelKey: "nav_dashboard",
    },
    {
      id: "advisor",
      emoji: "🌱",
      ocid: "nav.advisor_tab",
      labelKey: "nav_advisor",
    },
    {
      id: "scanner",
      emoji: "🌿",
      ocid: "nav.scanner_tab",
      labelKey: "nav_scanner",
    },
    {
      id: "market",
      emoji: "📊",
      ocid: "nav.market_tab",
      labelKey: "nav_market",
    },
    { id: "chat", emoji: "💬", ocid: "nav.chat_tab", labelKey: "nav_chat" },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/30">
      <div className="mobile-container flex flex-col shadow-2xl">
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: "72px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {activeTab === "dashboard" && (
                <Dashboard
                  lang={lang}
                  farmerName={farmerName}
                  lastSoil={lastSoil}
                  lastRec={lastRec}
                  onScanClick={() => setActiveTab("scanner")}
                  onLangToggle={toggleLang}
                />
              )}
              {activeTab === "advisor" && (
                <CropAdvisor
                  lang={lang}
                  onRecommendations={handleRecommendations}
                  initialRotation={INITIAL_ROTATION}
                />
              )}
              {activeTab === "scanner" && (
                <PlantScanner lang={lang} isActive={activeTab === "scanner"} />
              )}
              {activeTab === "market" && <MarketPrices lang={lang} />}
              {activeTab === "chat" && <AdvisoryChat lang={lang} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom nav */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-card border-t border-border flex z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={tab.ocid}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl leading-none">{tab.emoji}</span>
              <span className="text-[10px] font-semibold leading-tight truncate max-w-full px-1">
                {tr(tab.labelKey)}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 h-0.5 w-8"
                  style={{ background: "oklch(0.40 0.13 145)" }}
                />
              )}
            </button>
          ))}
        </nav>

        <Toaster />
      </div>
    </div>
  );
}
