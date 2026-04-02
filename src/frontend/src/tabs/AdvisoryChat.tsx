import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getBotResponse } from "../chatLogic";
import type { Lang } from "../i18n";
import { useTranslation } from "../i18n";
import type { ChatMessage } from "../types";

interface AdvisoryChatProps {
  lang: Lang;
}

const LANG_TO_SPEECH: Record<Lang, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  ml: "ml-IN",
  te: "te-IN",
  kn: "kn-IN",
  mr: "mr-IN",
};

const WELCOME_EN =
  "🌾 Namaste! I'm your KisanAI Farm Advisor. Ask me anything about crops, irrigation, fertilizers, pests, or market prices. I'm here to help!";
const WELCOME_HI =
  "🌾 नमस्ते! मैं आपका किसान AI सलाहकार हूं। फसल, सिंचाई, खाद, कीट या बाज़ार मूल्य के बारे में कुछ भी पूछें।";

// biome-ignore lint/suspicious/noExplicitAny: SpeechRecognition types vary across browsers
const SpeechRecognitionAPI: any =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    : null;

export default function AdvisoryChat({ lang }: AdvisoryChatProps) {
  const tr = useTranslation(lang);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: lang === "hi" ? WELCOME_HI : WELCOME_EN,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-to-bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Stop recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  function startListening() {
    if (!SpeechRecognitionAPI) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = LANG_TO_SPEECH[lang] ?? "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const botText = getBotResponse(text);
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      text: botText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  }

  const quickPrompts =
    lang === "hi"
      ? ["सिंचाई कब करें?", "NPK खाद", "कीट नियंत्रण", "मंडी भाव", "PM-किसान योजना"]
      : [
          "When to irrigate?",
          "NPK fertilizer",
          "Pest control",
          "Market prices",
          "PM-KISAN scheme",
        ];

  const speechSupported = !!SpeechRecognitionAPI;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 border-b border-border">
        <h2 className="text-xl font-display font-bold text-foreground">
          🤖 {tr("chat_title")}
        </h2>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {quickPrompts.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => {
                setInput(p);
              }}
              className="flex-shrink-0 text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors border border-border"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-sm"
                    style={{ background: "oklch(0.40 0.13 145)" }}
                  >
                    <span className="text-white text-xs">AI</span>
                  </div>
                )}
                <div
                  className={
                    msg.role === "bot" ? "chat-bubble-bot" : "chat-bubble-user"
                  }
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: "oklch(0.40 0.13 145)" }}
              >
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="chat-bubble-bot">
                <div className="flex gap-1 items-center py-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-background">
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2 px-2"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-xs text-red-500 font-semibold">
              {tr("tap_mic")}
            </span>
          </motion.div>
        )}
        <div className="flex gap-2">
          <Input
            data-ocid="chat.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={tr("chat_placeholder")}
            className="flex-1 rounded-xl"
          />
          {speechSupported && (
            <Button
              data-ocid="chat.voice_button"
              type="button"
              onClick={startListening}
              variant={isListening ? "destructive" : "outline"}
              className="px-3 rounded-xl"
              title={tr("voice_input")}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button
            data-ocid="chat.submit_button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
