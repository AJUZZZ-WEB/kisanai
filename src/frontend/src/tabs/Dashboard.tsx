import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../i18n";
import { LANGUAGES, useTranslation } from "../i18n";
import type { CropRecommendation, SoilParams } from "../types";

interface DashboardProps {
  lang: Lang;
  farmerName: string;
  lastSoil: SoilParams | null;
  lastRec: CropRecommendation | null;
  onScanClick: () => void;
  onLangChange: (lang: Lang) => void;
  onLogout: () => void;
}

type WeatherState =
  | "All India"
  | "Punjab"
  | "Maharashtra"
  | "Telangana"
  | "Tamil Nadu"
  | "Uttar Pradesh";

const WEATHER_DATA: Record<
  WeatherState,
  {
    temp: string;
    humidity: number;
    rainfall: string;
    warning: string;
    warningHi: string;
  }
> = {
  "All India": {
    temp: "22–35°C",
    humidity: 62,
    rainfall: "Moderate showers expected",
    warning: "Check local forecasts before sowing. Avoid waterlogging.",
    warningHi: "बुवाई से पहले स्थानीय पूर्वानुमान जांचें। जलभराव से बचें।",
  },
  Punjab: {
    temp: "18–38°C",
    humidity: 55,
    rainfall: "Light showers likely in 3 days",
    warning: "Ideal for Wheat irrigation. Watch for wheat rust fungus.",
    warningHi: "गेहूं की सिंचाई के लिए उत्तम। गेहूं के जंग रोग पर नजर रखें।",
  },
  Maharashtra: {
    temp: "25–40°C",
    humidity: 70,
    rainfall: "Heavy rain expected this week",
    warning: "Soybean harvesting may be delayed — protect stored crop.",
    warningHi: "सोयाबीन की कटाई में देरी हो सकती है — संग्रहित फसल की रक्षा करें।",
  },
  Telangana: {
    temp: "26–42°C",
    humidity: 65,
    rainfall: "Dry conditions next 5 days",
    warning: "Irrigate Cotton now. High risk of bollworm attack.",
    warningHi: "अभी कपास की सिंचाई करें। बॉलवॉर्म का अधिक खतरा।",
  },
  "Tamil Nadu": {
    temp: "24–36°C",
    humidity: 78,
    rainfall: "Northeast monsoon active",
    warning:
      "Good time to transplant Paddy. Avoid chemical sprays during rain.",
    warningHi: "धान रोपाई का अच्छा समय। बारिश के दौरान रासायनिक छिड़काव न करें।",
  },
  "Uttar Pradesh": {
    temp: "20–37°C",
    humidity: 58,
    rainfall: "Partly cloudy, minimal rain",
    warning: "Sugarcane needs irrigation. Good conditions for Rabi sowing.",
    warningHi: "गन्ने को सिंचाई चाहिए। रबी बुवाई के लिए अच्छी स्थिति।",
  },
};

const TIPS: Record<Lang, string[]> = {
  en: [
    "Irrigate between 6–8 AM to minimize evaporation and maximize water uptake.",
    "Test your soil pH every 2–3 years for optimal crop productivity.",
    "Use neem cake as a natural fertilizer to improve soil health.",
    "Crop rotation prevents soil-borne diseases and improves fertility.",
    "Apply mulching to conserve moisture during dry spells.",
    "Install pheromone traps to monitor pest populations early.",
    "Use certified seeds for higher germination rates and better yields.",
    "Drip irrigation can save up to 40% water vs. flood irrigation.",
    "Apply compost before monsoon to enrich soil organic matter.",
    "Record crop history to identify yield patterns and plan rotation.",
    "Early morning is the best time to scout for pest damage.",
    "Avoid burning crop residue — it destroys beneficial soil microbes.",
  ],
  hi: [
    "सुबह 6-8 बजे सिंचाई करें — वाष्पीकरण कम होगा और फसल को अधिक पानी मिलेगा।",
    "बेहतर फसल उत्पादकता के लिए हर 2-3 साल में मिट्टी का pH जांचें।",
    "मिट्टी के स्वास्थ्य को बेहतर बनाने के लिए प्राकृतिक उर्वरक के रूप में नीम की खली का उपयोग करें।",
    "फसल चक्र मिट्टीजनित बीमारियों को रोकता है और उर्वरता बढ़ाता है।",
    "सूखे में नमी बनाए रखने के लिए मल्चिंग करें।",
    "कीड़ों की शुरुआती निगरानी के लिए फेरोमोन ट्रैप लगाएं।",
    "बेहतर अंकुरण और उत्पादन के लिए प्रमाणित बीजों का उपयोग करें।",
    "ड्रिप सिंचाई बाढ़ सिंचाई की तुलना में 40% तक पानी बचाती है।",
    "मिट्टी की जैविक सामग्री बढ़ाने के लिए मानसून से पहले कम्पोस्ट डालें।",
    "उपज पैटर्न की पहचान के लिए फसल इतिहास दर्ज करें।",
    "कीट क्षति के लिए सुबह जल्दी खेत की निगरानी करें।",
    "फसल अवशेष न जलाएं — इससे लाभकारी मिट्टी के सूक्ष्मजीव नष्ट होते हैं।",
  ],
  ta: [
    "வாஷ்பமாவதை குறைக்க காலை 6-8 மணிக்கு நீர்ப்பாசனம் செய்யுங்கள்.",
    "சிறந்த பயிர் உற்பத்தித்திறனுக்கு 2-3 ஆண்டுகளுக்கு ஒருமுறை மண் pH சோதியுங்கள்.",
    "மண் ஆரோக்கியத்தை மேம்படுத்த இயற்கை உரமாக வேப்பம் புண்ணாக்கு பயன்படுத்துங்கள்.",
    "பயிர் சுழற்சி மண்ணில் நோய்களை தடுக்கிறது மற்றும் வளத்தை மேம்படுத்துகிறது.",
    "வறட்சியில் ஈரப்பதத்தை பாதுகாக்க மல்ச்சிங் பயன்படுத்துங்கள்.",
    "பூச்சி மக்களை முன்கூட்டியே கண்காணிக்க ஃபெரோமோன் பொறிகள் வைக்கவும்.",
    "அதிக முளைப்பு விகிதத்திற்கு சான்றளிக்கப்பட்ட விதைகளை பயன்படுத்துங்கள்.",
    "சொட்டு நீர்ப்பாசனம் வெள்ளப் பாசனத்தை விட 40% நீரை சேமிக்கலாம்.",
    "மண்ணின் கரிம பொருளை செழுமையாக்க மழைக்காலத்திற்கு முன் உரம் இடுங்கள்.",
    "விளைச்சல் முறைகளை கண்டறிய பயிர் வரலாற்றை பதிவு செய்யுங்கள்.",
    "பூச்சி சேதத்தை கண்காணிக்க காலை சீக்கிரம் நல்லது.",
    "பயிர் எச்சங்களை எரிக்காதீர்கள் — இது நன்மை தரும் மண் நுண்ணுயிரிகளை அழிக்கும்.",
  ],
  ml: [
    "ബാഷ്പീകരണം കുറയ്ക്കാൻ രാവിലെ 6-8 മണിക്ക് ജലസേചനം ചെയ്യുക.",
    "മികച്ച വിള ഉൽപ്പാദനക്ഷമതയ്ക്ക് 2-3 വർഷത്തിലൊരിക്കൽ മണ്ണ് pH പരിശോധിക്കുക.",
    "മണ്ണ് ആരോഗ്യം മെച്ചപ്പെടുത്താൻ വേപ്പ് കേക്ക് ഉപയോഗിക്കുക.",
    "ഫസൽ ചക്രം മണ്ണ് ജനിത രോഗങ്ങൾ തടയുന്നു.",
    "വരൾച്ചയിൽ ഈർപ്പം നിലനിർത്താൻ മൾചിങ്ങ് ഉപയോഗിക്കുക.",
    "കീടങ്ങളെ നേരത്തെ നിരീക്ഷിക്കാൻ ഫെറോമോൺ കെണികൾ സ്ഥാപിക്കുക.",
    "ഉയർന്ന മുളയ്ക്കൽ നിരക്കിന് സർട്ടിഫൈഡ് വിത്തുകൾ ഉപയോഗിക്കുക.",
    "ഡ്രിപ്പ് ജലസേചനം 40% വരെ വെള്ളം ലാഭിക്കും.",
    "മൺസൂണിന് മുമ്പ് കമ്പോസ്റ്റ് ഇടുക.",
    "വിള ചരിത്രം രേഖപ്പെടുത്തി ഉൽപ്പാദന ക്രമം കണ്ടെത്തുക.",
    "കീട നാശനഷ്ടം നേരത്തെ തിരിച്ചറിയാൻ രാവിലെ നിരീക്ഷണം ഏറ്റവും നല്ലത്.",
    "വിള അവശിഷ്ടങ്ങൾ കത്തിക്കരുത് — ഇത് ഗുണകരമായ മണ്ണ് സൂക്ഷ്മജീവികളെ നശിപ്പിക്കും.",
  ],
  te: [
    "ఆవిరైపోవడాన్ని తగ్గించేందుకు ఉదయం 6-8 గంటలకు నీటిపారుదల చేయండి.",
    "మెరుగైన పంట ఉత్పాదకత కోసం 2-3 సంవత్సరాలకు ఒకసారి మట్టి pH పరీక్షించండి.",
    "మట్టి ఆరోగ్యాన్ని మెరుగుపరచడానికి వేప కేక్ ఉపయోగించండి.",
    "పంట మార్పిడి మట్టి వ్యాధులను నివారిస్తుంది.",
    "వడ్డాం సమయంలో తేమను నిలుపుకోవడానికి మల్చింగ్ ఉపయోగించండి.",
    "తెగుళ్ళను ముందుగానే పర్యవేక్షించడానికి ఫెరోమోన్ ఉచ్చులు అమర్చండి.",
    "మెరుగైన మొలకెత్తు రేటుకు ధృవీకరించిన విత్తనాలు ఉపయోగించండి.",
    "డ్రిప్ నీటిపారుదల 40% వరకు నీటిని ఆదా చేయగలదు.",
    "వర్షాకాలానికి ముందు కంపోస్ట్ వేయండి.",
    "దిగుబడి నమూనాలను గుర్తించడానికి పంట చరిత్ర నమోదు చేయండి.",
    "తెగులు నష్టాన్ని పర్యవేక్షించడానికి తెల్లవారుజామున చూడడం ఉత్తమం.",
    "పంట వ్యర్థాలు కాల్చవద్దు — ఇది ప్రయోజనకరమైన మట్టి సూక్ష్మజీవులను నాశనం చేస్తుంది.",
  ],
  kn: [
    "ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ 6-8 ಗಂಟೆಗೆ ನೀರಾವರಿ ಮಾಡಿ.",
    "ಉತ್ತಮ ಬೆಳೆ ಉತ್ಪಾದಕತೆಗಾಗಿ ಪ್ರತಿ 2-3 ವರ್ಷಕ್ಕೊಮ್ಮೆ ಮಣ್ಣಿನ pH ಪರೀಕ್ಷಿಸಿ.",
    "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಿಸಲು ಬೇವಿನ ಹಿಂಡಿ ಬಳಸಿ.",
    "ಬೆಳೆ ಸರದಿ ಮಣ್ಣು ಜನಿತ ರೋಗಗಳನ್ನು ತಡೆಯುತ್ತದೆ.",
    "ಬರ ಕಾಲದಲ್ಲಿ ತೇವಾಂಶ ಕಾಪಾಡಲು ಮಲ್ಚಿಂಗ್ ಬಳಸಿ.",
    "ಕೀಟ ಸಂಖ್ಯೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
    "ಉತ್ತಮ ಮೊಳಕೆ ಪ್ರಮಾಣಕ್ಕಾಗಿ ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಬಳಸಿ.",
    "ಹನಿ ನೀರಾವರಿ 40% ವರೆಗೆ ನೀರನ್ನು ಉಳಿಸಬಹುದು.",
    "ಮಳೆಗಾಲಕ್ಕೆ ಮುನ್ನ ಕಾಂಪೋಸ್ಟ್ ಹಾಕಿ.",
    "ಇಳುವರಿ ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಲು ಬೆಳೆ ಇತಿಹಾಸ ದಾಖಲಿಸಿ.",
    "ಕೀಟ ಹಾನಿ ಪತ್ತೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಬೇಗ ಹೊಲ ತಪಾಸಣೆ ಉತ್ತಮ.",
    "ಬೆಳೆ ಅವಶೇಷ ಸುಡಬೇಡಿ — ಇದು ಉಪಯೋಗಕರ ಮಣ್ಣಿನ ಸೂಕ್ಷ್ಮಜೀವಿಗಳನ್ನು ನಾಶಪಡಿಸುತ್ತದೆ.",
  ],
  mr: [
    "बाष्पीभवन कमी करण्यासाठी सकाळी 6-8 वाजता सिंचन करा.",
    "उत्तम पीक उत्पादनासाठी दर 2-3 वर्षांनी माती pH तपासा.",
    "मातीचे आरोग्य सुधारण्यासाठी कडुनिंब पेंड वापरा.",
    "पीक रोटेशन माती जन्य रोगांना प्रतिबंध करते.",
    "दुष्काळात ओलावा टिकवण्यासाठी मल्चिंग करा.",
    "कीडीवर लवकर नजर ठेवण्यासाठी फेरोमोन सापळे लावा.",
    "चांगल्या उगवणीसाठी प्रमाणित बियाणे वापरा.",
    "ठिबक सिंचन पूर सिंचनाच्या तुलनेत 40% पाणी वाचवू शकते.",
    "मातीतील सेंद्रिय घटक वाढवण्यासाठी पावसाळ्यापूर्वी कंपोस्ट घाला.",
    "उत्पादन नमुने ओळखण्यासाठी पीक इतिहास नोंदवा.",
    "कीड नुकसान लवकर ओळखण्यासाठी पहाटे शेत तपासणे उत्तम.",
    "पीक अवशेष जाळू नका — यामुळे उपयुक्त मातीतील सूक्ष्मजीव नष्ट होतात.",
  ],
};

const WEATHER_STATES: WeatherState[] = [
  "All India",
  "Punjab",
  "Maharashtra",
  "Telangana",
  "Tamil Nadu",
  "Uttar Pradesh",
];

export default function Dashboard({
  lang,
  farmerName,
  lastSoil,
  lastRec,
  onScanClick,
  onLangChange,
  onLogout,
}: DashboardProps) {
  const tr = useTranslation(lang);
  const [weatherState, setWeatherState] = useState<WeatherState>("All India");

  const todayTip =
    TIPS[lang]?.[new Date().getDate() % TIPS[lang].length] ?? TIPS.en[0];
  const weather = WEATHER_DATA[weatherState];

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
          <div className="flex items-center gap-2">
            <select
              data-ocid="lang.select"
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Lang)}
              className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-2 py-1.5 rounded-full border border-white/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{ appearance: "none" }}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} style={{ color: "#000" }}>
                  {l.nativeLabel}
                </option>
              ))}
            </select>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  data-ocid="dashboard.profile.open_modal_button"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center transition-colors"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                data-ocid="dashboard.profile.popover"
                className="w-52 p-3"
                align="end"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "oklch(0.40 0.13 145)" }}
                  >
                    {farmerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {farmerName}
                    </p>
                    <p className="text-xs text-muted-foreground">Farmer</p>
                  </div>
                </div>
                <Button
                  data-ocid="dashboard.logout.button"
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive/5"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  {tr("logout")}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
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
                      {tr("moisture").replace(" %", "")}
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

        {/* Weather Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Card className="shadow-card border-0 overflow-hidden">
            <div
              className="h-1"
              style={{ background: "oklch(0.55 0.15 200)" }}
            />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  🌦 {tr("weather_advisory")}
                </p>
                <select
                  data-ocid="dashboard.weather_state.select"
                  value={weatherState}
                  onChange={(e) =>
                    setWeatherState(e.target.value as WeatherState)
                  }
                  className="text-xs bg-muted text-foreground px-2 py-1 rounded-lg border border-border cursor-pointer focus:outline-none"
                >
                  {WEATHER_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center bg-blue-50 rounded-xl py-2">
                  <p className="text-lg">🌡</p>
                  <p className="text-xs font-bold text-foreground">
                    {weather.temp}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Temp</p>
                </div>
                <div className="text-center bg-cyan-50 rounded-xl py-2">
                  <p className="text-lg">💧</p>
                  <p className="text-xs font-bold text-foreground">
                    {weather.humidity}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">Humidity</p>
                </div>
                <div className="text-center bg-indigo-50 rounded-xl py-2">
                  <p className="text-lg">🌧</p>
                  <p className="text-[10px] font-bold text-foreground leading-tight">
                    {weather.rainfall}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Rain</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <p className="text-xs text-amber-800 leading-relaxed">
                  ⚠️ {lang === "hi" ? weather.warningHi : weather.warning}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tip of the Day */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-4"
          style={{ background: "oklch(0.95 0.04 145)" }}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
            🌞 {tr("tip")}
          </p>
          <p className="text-sm text-foreground">{todayTip}</p>
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
