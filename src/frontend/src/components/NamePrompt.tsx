import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";

interface NamePromptProps {
  lang: Lang;
  onSubmit: (name: string) => void;
}

export default function NamePrompt({ lang, onSubmit }: NamePromptProps) {
  const tr = useTranslation(lang);
  const [name, setName] = useState("");

  function handleSubmit() {
    const trimmed = name.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.30 0.12 145), oklch(0.20 0.07 50))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-8 mx-6 w-full max-w-sm shadow-2xl"
      >
        <div className="text-5xl text-center mb-4">👨‍🌾</div>
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-2">
          {tr("enter_name")}
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-6">
          {lang === "hi"
            ? "हम आपकी सलाह को व्यक्तिगत बनाएंगे"
            : "We'll personalize your advisory experience"}
        </p>
        <Input
          placeholder={tr("farmer_name_placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="mb-4 py-6 text-base rounded-xl"
          autoFocus
        />
        <Button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full py-6 text-base font-display font-bold rounded-xl"
        >
          {tr("get_started")}
        </Button>
      </motion.div>
    </div>
  );
}
