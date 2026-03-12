import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { DISEASE_DATABASE } from "../diseaseLogic";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { DiseaseEntry } from "../types";

interface DiseaseEncyclopediaProps {
  lang: Lang;
}

export default function DiseaseEncyclopedia({
  lang,
}: DiseaseEncyclopediaProps) {
  const tr = useTranslation(lang);
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const crops = [
    "All",
    ...Array.from(new Set(DISEASE_DATABASE.map((d) => d.crop))),
  ];

  const filtered = DISEASE_DATABASE.filter((d) => {
    const matchesCrop = selectedCrop === "All" || d.crop === selectedCrop;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      d.disease.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q);
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-6 pb-3">
        <h2 className="text-xl font-display font-bold text-foreground">
          📚 {tr("encyclopedia_title")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {tr("encyclopedia_subtitle")}
        </p>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <Input
          data-ocid="encyclopedia.search_input"
          placeholder={tr("encyclopedia_search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl"
        />
      </div>

      {/* Crop filter */}
      <div className="px-4 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
          {crops.map((crop) => (
            <button
              key={crop}
              type="button"
              data-ocid={"encyclopedia.crop_filter.tab"}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCrop === crop
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-4 mb-2">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {tr("encyclopedia_results")}
        </p>
      </div>

      {/* List */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div
            data-ocid="encyclopedia.empty_state"
            className="text-center py-12 text-muted-foreground"
          >
            <div className="text-4xl mb-2">🔍</div>
            <p>{tr("no_results")}</p>
          </div>
        )}
        {filtered.map((entry: DiseaseEntry, i: number) => (
          <div
            key={entry.id}
            data-ocid={`encyclopedia.item.${i + 1}`}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
          >
            <button
              type="button"
              className="w-full text-left px-4 py-3 flex items-center gap-3"
              onClick={() =>
                setExpanded(expanded === entry.id ? null : entry.id)
              }
            >
              <span className="text-2xl">{entry.cropEmoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {entry.disease}
                  </span>
                  <Badge
                    variant={entry.isHealthy ? "outline" : "destructive"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {entry.isHealthy
                      ? lang === "hi"
                        ? "स्वस्थ"
                        : "Healthy"
                      : lang === "hi"
                        ? "रोग"
                        : "Disease"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {entry.crop}
                </p>
              </div>
              <span className="text-muted-foreground text-sm">
                {expanded === entry.id ? "▲" : "▼"}
              </span>
            </button>

            {expanded === entry.id && (
              <div className="px-4 pb-4 border-t border-border pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  {tr("symptoms")}
                </p>
                <p className="text-sm text-foreground mb-3">{entry.symptoms}</p>

                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  {tr("description")}
                </p>
                <p className="text-sm text-foreground mb-3">
                  {entry.description}
                </p>

                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  💊 {tr("treatment")}
                </p>
                <div className="flex flex-col gap-1.5">
                  {entry.treatment.map((step, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: treatment steps are ordered
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className="w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-bold"
                        style={{ background: "oklch(0.40 0.13 145)" }}
                      >
                        {idx + 1}
                      </span>
                      <p className="text-sm text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
