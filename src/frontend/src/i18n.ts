export type Lang = "en" | "hi";

const t = {
  // Nav
  nav_dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  nav_advisor: { en: "Crop Advisor", hi: "फसल सलाहकार" },
  nav_scanner: { en: "Plant Scanner", hi: "पौधा स्कैनर" },
  nav_market: { en: "Market", hi: "बाज़ार" },
  nav_chat: { en: "Chat", hi: "चैट" },
  nav_encyclopedia: { en: "Diseases", hi: "रोग सूची" },

  // Dashboard
  welcome: { en: "Welcome back", hi: "वापस स्वागत है" },
  soil_status: { en: "Soil Status", hi: "मिट्टी की स्थिति" },
  last_recommendation: { en: "Last Recommendation", hi: "अंतिम सिफारिश" },
  market_today: { en: "Today's Top Price", hi: "आज की सर्वोच्च कीमत" },
  scan_plant: { en: "🔍 Scan Plant", hi: "🔍 पौधा स्कैन करें" },
  no_data_yet: { en: "No data yet", hi: "अभी तक कोई डेटा नहीं" },
  tap_to_scan: {
    en: "Tap to detect crop diseases instantly",
    hi: "फसल रोगों का तुरंत पता लगाएं",
  },
  enter_name: { en: "Enter your name", hi: "अपना नाम दर्ज करें" },
  get_started: { en: "Get Started", hi: "शुरू करें" },
  farmer_name_placeholder: { en: "Your name...", hi: "आपका नाम..." },

  // Crop Advisor
  soil_inputs: { en: "Soil Parameters", hi: "मिट्टी के मापदंड" },
  soil_ph: { en: "Soil pH", hi: "मिट्टी pH" },
  moisture: { en: "Moisture %", hi: "नमी %" },
  nitrogen: { en: "Nitrogen (kg/ha)", hi: "नाइट्रोजन (kg/ha)" },
  phosphorus: { en: "Phosphorus (kg/ha)", hi: "फास्फोरस (kg/ha)" },
  potassium: { en: "Potassium (kg/ha)", hi: "पोटेशियम (kg/ha)" },
  season: { en: "Season", hi: "मौसम" },
  submit: { en: "Get Recommendations", hi: "सिफारिशें प्राप्त करें" },
  recommendations: { en: "Crop Recommendations", hi: "फसल सिफारिशें" },
  yield_score: { en: "Yield", hi: "उपज" },
  profit_score: { en: "Profit", hi: "मुनाफा" },
  sustain_score: { en: "Sustainability", hi: "स्थिरता" },
  rotation_history: { en: "Crop Rotation History", hi: "फसल चक्र इतिहास" },
  add_crop: { en: "Add Crop", hi: "फसल जोड़ें" },
  crop_name: { en: "Crop Name", hi: "फसल का नाम" },
  year: { en: "Year", hi: "वर्ष" },
  no_rotation: {
    en: "No crop rotation history yet",
    hi: "अभी तक कोई फसल चक्र नहीं",
  },
  kharif: { en: "Kharif (Jun–Oct)", hi: "खरीफ (जून–अक्टूबर)" },
  rabi: { en: "Rabi (Nov–Mar)", hi: "रबी (नवंबर–मार्च)" },
  zaid: { en: "Zaid (Mar–Jun)", hi: "जायद (मार्च–जून)" },
  tip: { en: "Tip", hi: "सुझाव" },
  best_match: { en: "Best Match", hi: "सर्वश्रेष्ठ" },

  // Scanner
  scanner_title: { en: "Plant Disease Scanner", hi: "पौधा रोग स्कैनर" },
  scanner_instruction: {
    en: "Point camera at a plant leaf to detect diseases",
    hi: "रोग का पता लगाने के लिए पत्ती पर कैमरा लगाएं",
  },
  capture: { en: "📷 Capture Photo", hi: "📷 फोटो लें" },
  analyse: { en: "🔬 Analyse", hi: "🔬 विश्लेषण" },
  retake: { en: "↩ Retake", hi: "↩ पुनः लें" },
  analysing: { en: "Analysing...", hi: "विश्लेषण हो रहा है..." },
  disease_result: { en: "Detection Result", hi: "जांच परिणाम" },
  confidence: { en: "Confidence", hi: "विश्वास" },
  treatment: { en: "Treatment Steps", hi: "उपचार के चरण" },
  start_camera: { en: "Start Camera", hi: "कैमरा शुरू करें" },
  camera_error: { en: "Camera not available", hi: "कैमरा उपलब्ध नहीं" },
  load_model: { en: "Load AI Model (Optional)", hi: "AI मॉडल लोड करें (वैकल्पिक)" },
  model_loaded: { en: "AI Model Loaded", hi: "AI मॉडल लोड हो गया" },
  model_loading: { en: "Loading model...", hi: "मॉडल लोड हो रहा है..." },
  model_instruction: {
    en: "Upload your trained model.json file for real AI detection",
    hi: "असली AI पहचान के लिए अपना model.json फ़ाइल अपलोड करें",
  },
  model_error: { en: "Failed to load model", hi: "मॉडल लोड नहीं हुआ" },

  // Market
  market_title: { en: "Market Prices", hi: "बाज़ार मूल्य" },
  last_updated: { en: "Last updated", hi: "अंतिम अपडेट" },
  per_quintal: { en: "₹/quintal", hi: "₹/क्विंटल" },

  // Chat
  chat_title: { en: "Farm Advisory Chat", hi: "कृषि सलाह चैट" },
  chat_placeholder: {
    en: "Ask about crops, pests, weather...",
    hi: "फसल, कीट, मौसम के बारे में पूछें...",
  },
  send: { en: "Send", hi: "भेजें" },

  // Login
  login_title: { en: "KisanAI", hi: "किसान AI" },
  login_subtitle: {
    en: "Smart Farm Advisory Platform",
    hi: "स्मार्ट कृषि सलाह मंच",
  },
  login_btn: { en: "Login to Continue", hi: "जारी रखने के लिए लॉगिन करें" },
  logging_in: { en: "Logging in...", hi: "लॉगिन हो रहा है..." },

  // Encyclopedia
  encyclopedia_title: { en: "Disease Encyclopedia", hi: "रोग विश्वकोश" },
  encyclopedia_subtitle: {
    en: "38 plant diseases from Kaggle PlantVillage dataset",
    hi: "Kaggle PlantVillage डेटासेट से 38 पौधे रोग",
  },
  encyclopedia_search_placeholder: {
    en: "Search disease or crop...",
    hi: "रोग या फसल खोजें...",
  },
  encyclopedia_results: { en: "diseases found", hi: "रोग मिले" },
  symptoms: { en: "Symptoms", hi: "लक्षण" },
  description: { en: "About", hi: "विवरण" },
  no_results: { en: "No diseases found", hi: "कोई रोग नहीं मिला" },
};

export type TranslationKey = keyof typeof t;

export function useTranslation(lang: Lang) {
  return function tr(key: TranslationKey): string {
    return t[key][lang] ?? t[key].en;
  };
}

export { t };
