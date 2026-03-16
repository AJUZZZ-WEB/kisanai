import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { Lang } from "../i18n";
import { LANGUAGES, useTranslation } from "../i18n";

interface LoginScreenProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onLogin: () => void;
}

const EMOJIS = ["🌾", "🌱", "☁️", "🍅", "🌽"];

type FormState = "idle" | "loading" | "success" | "error";

export default function LoginScreen({
  lang,
  onLangChange,
  onLogin,
}: LoginScreenProps) {
  const { login, isLoggingIn } = useInternetIdentity();
  const tr = useTranslation(lang);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1200));

    if (username.length >= 3 && password.length >= 4) {
      setFormState("success");
      setTimeout(() => onLogin(), 800);
    } else {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 2500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.30 0.12 145) 0%, oklch(0.22 0.08 145) 40%, oklch(0.18 0.06 50) 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "oklch(0.75 0.17 65)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(0.40 0.13 145)" }}
        />
        <div className="absolute top-1/4 right-10 text-6xl opacity-20">🌾</div>
        <div className="absolute bottom-1/3 left-8 text-5xl opacity-20">🌿</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-15">☀️</div>
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6 z-10">
        <select
          data-ocid="lang.select"
          value={lang}
          onChange={(e) => onLangChange(e.target.value as Lang)}
          className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-1.5 rounded-full border border-white/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
          style={{ appearance: "none" }}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} style={{ color: "#000" }}>
              {l.nativeLabel}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center px-8 max-w-sm w-full z-10"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          src="/assets/generated/kisanai-logo-transparent.dim_120x120.png"
          alt="KisanAI"
          className="w-24 h-24 mb-6"
        />

        <h1 className="text-5xl font-display font-extrabold text-white mb-2">
          {tr("login_title")}
        </h1>
        <p className="text-white/70 text-lg font-body mb-2">
          {tr("login_subtitle")}
        </p>

        <div className="flex gap-3 mb-8 mt-2">
          {EMOJIS.map((emoji, i) => (
            <motion.span
              key={emoji}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-2xl"
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Username / Password form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          onSubmit={handleSubmit}
          className="w-full space-y-3"
        >
          <div className="text-left space-y-1">
            <Label
              htmlFor="username"
              className="text-white/80 text-sm font-semibold"
            >
              {lang === "hi" ? "उपयोगकर्ता नाम" : "Username"}
            </Label>
            <Input
              id="username"
              data-ocid="login.input"
              type="text"
              autoComplete="username"
              placeholder={lang === "hi" ? "अपना नाम दर्ज करें" : tr("enter_name")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/15 border-white/25 text-white placeholder:text-white/40 focus:border-white/60 focus:ring-white/30 rounded-xl h-12"
              disabled={formState === "loading" || formState === "success"}
            />
          </div>

          <div className="text-left space-y-1">
            <Label
              htmlFor="password"
              className="text-white/80 text-sm font-semibold"
            >
              {lang === "hi" ? "पासवर्ड" : "Password"}
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder={
                lang === "hi" ? "पासवर्ड दर्ज करें" : "Enter your password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/15 border-white/25 text-white placeholder:text-white/40 focus:border-white/60 focus:ring-white/30 rounded-xl h-12"
              disabled={formState === "loading" || formState === "success"}
            />
          </div>

          {/* Feedback states */}
          <AnimatePresence mode="wait">
            {formState === "success" && (
              <motion.div
                key="success"
                data-ocid="login.success_state"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5 text-emerald-300 text-sm font-semibold"
              >
                <CheckCircle2 className="w-4 h-4" />
                {lang === "hi"
                  ? "सफलतापूर्वक लॉग इन हो गया!"
                  : "Logged in successfully!"}
              </motion.div>
            )}
            {formState === "error" && (
              <motion.div
                key="error"
                data-ocid="login.error_state"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5 text-red-300 text-sm font-semibold"
              >
                <AlertCircle className="w-4 h-4" />
                {lang === "hi"
                  ? "गलत उपयोगकर्ता नाम या पासवर्ड"
                  : "Invalid username or password"}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            data-ocid="login.submit_button"
            size="lg"
            disabled={
              formState === "loading" ||
              formState === "success" ||
              !username.trim() ||
              !password.trim()
            }
            className="w-full py-7 text-lg font-display font-bold rounded-2xl bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-60 mt-1"
          >
            {formState === "loading" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                {lang === "hi" ? "लोड हो रहा है…" : "Signing in…"}
              </>
            ) : formState === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />{" "}
                {lang === "hi" ? "लॉग इन हो गया" : "Signed In"}
              </>
            ) : lang === "hi" ? (
              "लॉग इन करें"
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.form>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
            {lang === "hi" ? "या" : "or"}
          </span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Internet Identity */}
        <div className="w-full">
          <Button
            onClick={login}
            disabled={isLoggingIn}
            variant="outline"
            size="lg"
            className="w-full py-6 text-base font-display font-semibold rounded-2xl bg-white/10 border-white/25 text-white hover:bg-white/20 hover:border-white/40"
          >
            {isLoggingIn ? tr("logging_in") : tr("login_btn")}
          </Button>
        </div>

        <p className="text-white/40 text-xs mt-8">
          {lang === "hi"
            ? "सुरक्षित लॉगिन · इंटरनेट कंप्यूटर द्वारा संचालित"
            : "Secure Login · Powered by Internet Computer"}
        </p>
      </motion.div>
    </div>
  );
}
