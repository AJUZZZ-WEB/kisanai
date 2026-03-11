import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getCropRecommendations } from "../cropLogic";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { CropRecommendation, RotationEntry, SoilParams } from "../types";

interface CropAdvisorProps {
  lang: Lang;
  onRecommendations: (soil: SoilParams, recs: CropRecommendation[]) => void;
  initialRotation: RotationEntry[];
}

export default function CropAdvisor({
  lang,
  onRecommendations,
  initialRotation,
}: CropAdvisorProps) {
  const tr = useTranslation(lang);
  const [ph, setPh] = useState(6.5);
  const [moisture, setMoisture] = useState(50);
  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(60);
  const [potassium, setPotassium] = useState(80);
  const [season, setSeason] = useState<"Kharif" | "Rabi" | "Zaid">("Kharif");
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(
    [],
  );
  const [submitted, setSubmitted] = useState(false);

  const [rotation, setRotation] = useState<RotationEntry[]>(initialRotation);
  const [rotCrop, setRotCrop] = useState("");
  const [rotSeason, setRotSeason] = useState("");
  const [rotYear, setRotYear] = useState("2024");

  function handleSubmit() {
    const params: SoilParams = {
      ph,
      moisture,
      nitrogen,
      phosphorus,
      potassium,
      season,
    };
    const recs = getCropRecommendations(params);
    setRecommendations(recs);
    setSubmitted(true);
    onRecommendations(params, recs);
  }

  function addRotation() {
    if (!rotCrop.trim()) return;
    const entry: RotationEntry = {
      id: Date.now().toString(),
      season: rotSeason || season,
      year: rotYear,
      cropName: rotCrop,
    };
    setRotation((prev) => [entry, ...prev]);
    setRotCrop("");
  }

  const seasonColors: Record<string, string> = {
    Kharif: "bg-emerald-100 text-emerald-800",
    Rabi: "bg-blue-100 text-blue-800",
    Zaid: "bg-orange-100 text-orange-800",
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      {/* Soil Inputs */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          🌍 {tr("soil_inputs")}
        </h2>

        <Card className="shadow-card border-0">
          <CardContent className="p-5 flex flex-col gap-5">
            {/* pH */}
            <div>
              <Label className="text-sm font-semibold text-foreground mb-2 block">
                {tr("soil_ph")}:{" "}
                <span className="text-primary font-bold">{ph.toFixed(1)}</span>
              </Label>
              <Slider
                data-ocid="advisor.ph_input"
                min={4.0}
                max={9.0}
                step={0.1}
                value={[ph]}
                onValueChange={([v]) => setPh(v)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>4.0 (Acidic)</span>
                <span>9.0 (Alkaline)</span>
              </div>
            </div>

            {/* Moisture */}
            <div>
              <Label className="text-sm font-semibold text-foreground mb-2 block">
                {tr("moisture")}:{" "}
                <span className="text-primary font-bold">{moisture}%</span>
              </Label>
              <Slider
                data-ocid="advisor.moisture_input"
                min={0}
                max={100}
                step={1}
                value={[moisture]}
                onValueChange={([v]) => setMoisture(v)}
                className="w-full"
              />
            </div>

            {/* NPK */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  {tr("nitrogen")}
                </Label>
                <Input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(Number(e.target.value))}
                  className="text-center"
                  placeholder="N"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  {tr("phosphorus")}
                </Label>
                <Input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(Number(e.target.value))}
                  className="text-center"
                  placeholder="P"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  {tr("potassium")}
                </Label>
                <Input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(Number(e.target.value))}
                  className="text-center"
                  placeholder="K"
                />
              </div>
            </div>

            {/* Season */}
            <div>
              <Label className="text-sm font-semibold text-foreground mb-2 block">
                {tr("season")}
              </Label>
              <Select
                value={season}
                onValueChange={(v) =>
                  setSeason(v as "Kharif" | "Rabi" | "Zaid")
                }
              >
                <SelectTrigger
                  data-ocid="advisor.season_select"
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif">{tr("kharif")}</SelectItem>
                  <SelectItem value="Rabi">{tr("rabi")}</SelectItem>
                  <SelectItem value="Zaid">{tr("zaid")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              data-ocid="advisor.submit_button"
              onClick={handleSubmit}
              className="w-full py-6 text-base font-display font-bold rounded-xl"
            >
              🌱 {tr("submit")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <AnimatePresence>
        {submitted && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              🏆 {tr("recommendations")}
            </h2>
            <div className="flex flex-col gap-3">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="shadow-card border-0 overflow-hidden">
                    <div
                      className="h-1.5"
                      style={{
                        background:
                          i === 0
                            ? "oklch(0.75 0.17 65)"
                            : i === 1
                              ? "oklch(0.40 0.13 145)"
                              : "oklch(0.65 0.15 200)",
                      }}
                    />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{rec.emoji}</span>
                          <div>
                            <h3 className="font-display font-bold text-foreground">
                              {rec.name}
                            </h3>
                            {i === 0 && (
                              <Badge className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-100">
                                {tr("best_match")}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-primary">
                          #{i + 1}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 mb-3">
                        {[
                          {
                            label: tr("yield_score"),
                            value: rec.yieldScore,
                            color: "oklch(0.40 0.13 145)",
                          },
                          {
                            label: tr("profit_score"),
                            value: rec.profitScore,
                            color: "oklch(0.75 0.17 65)",
                          },
                          {
                            label: tr("sustain_score"),
                            value: rec.sustainScore,
                            color: "oklch(0.55 0.15 200)",
                          },
                        ].map(({ label, value, color }) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">
                                {label}
                              </span>
                              <span className="font-semibold text-foreground">
                                {value}/100
                              </span>
                            </div>
                            <div className="score-bar">
                              <motion.div
                                className="score-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{
                                  duration: 0.8,
                                  delay: i * 0.1 + 0.3,
                                }}
                                style={{ background: color }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/60 rounded-lg p-3">
                        <p className="text-xs font-semibold text-primary mb-1">
                          💡 {tr("tip")}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {rec.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crop Rotation History */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          🔄 {tr("rotation_history")}
        </h2>

        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex gap-2 mb-4">
              <Input
                data-ocid="advisor.rotation_input"
                placeholder={tr("crop_name")}
                value={rotCrop}
                onChange={(e) => setRotCrop(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRotation()}
                className="flex-1"
              />
              <Select value={rotSeason} onValueChange={setRotSeason}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder={tr("season")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif">Kharif</SelectItem>
                  <SelectItem value="Rabi">Rabi</SelectItem>
                  <SelectItem value="Zaid">Zaid</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder={tr("year")}
                value={rotYear}
                onChange={(e) => setRotYear(e.target.value)}
                className="w-20"
              />
            </div>
            <Button
              data-ocid="advisor.rotation_add_button"
              onClick={addRotation}
              variant="outline"
              className="w-full mb-4 border-primary text-primary hover:bg-primary/5"
            >
              + {tr("add_crop")}
            </Button>

            {rotation.length === 0 ? (
              <p
                data-ocid="advisor.rotation.empty_state"
                className="text-center text-muted-foreground text-sm py-4"
              >
                {tr("no_rotation")}
              </p>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="flex flex-col gap-3">
                  {rotation.map((entry, i) => (
                    <div
                      key={entry.id}
                      data-ocid={`advisor.rotation.item.${i + 1}`}
                      className="flex items-center gap-3 pl-10 relative"
                    >
                      <div className="absolute left-3 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                      <div className="flex-1 bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-foreground">
                            {entry.cropName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {entry.year}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${seasonColors[entry.season] || "bg-gray-100 text-gray-700"}`}
                        >
                          {entry.season}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
