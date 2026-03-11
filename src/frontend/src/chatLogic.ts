export function getBotResponse(message: string): string {
  const msg = message.toLowerCase();

  if (
    msg.includes("irrigation") ||
    msg.includes("water") ||
    msg.includes("पानी") ||
    msg.includes("सिंचाई")
  ) {
    return "💧 Irrigation Advice: Water crops in the early morning (6–8 AM) or evening to reduce evaporation. For most crops, irrigate when soil moisture drops below 50%. Drip irrigation can save up to 40% water compared to flood irrigation. Monitor soil moisture by inserting a finger 5cm deep — if dry, it's time to water.";
  }

  if (
    msg.includes("fertilizer") ||
    msg.includes("nutrient") ||
    msg.includes("npk") ||
    msg.includes("खाद") ||
    msg.includes("उर्वरक")
  ) {
    return "🌱 Fertilizer Guidance: Use the NPK ratio based on soil test results. General recommendation: Apply Urea (46% N) for nitrogen, DAP (18-46-0) for phosphorus, and MOP (0-0-60) for potassium. Apply in split doses — 1/3 at sowing, 1/3 at 30 days, 1/3 at flowering. Organic matter like compost improves nutrient availability.";
  }

  if (
    msg.includes("pest") ||
    msg.includes("insect") ||
    msg.includes("bug") ||
    msg.includes("कीट") ||
    msg.includes("कीड़ा")
  ) {
    return "🐛 Pest Control: Use Integrated Pest Management (IPM). First try neem oil spray (10ml/L water). Install yellow sticky traps and pheromone traps. Introduce beneficial insects like ladybugs. Chemical pesticides should be last resort — use selectively and follow label instructions. Scout fields weekly for early detection.";
  }

  if (
    msg.includes("disease") ||
    msg.includes("blight") ||
    msg.includes("rot") ||
    msg.includes("mildew") ||
    msg.includes("रोग") ||
    msg.includes("बीमारी")
  ) {
    return "🔬 Use the Plant Scanner tab to photograph your crop and get instant AI-powered disease detection with treatment recommendations! Go to the 🌿 Scanner tab and point your camera at the affected leaf.";
  }

  if (
    msg.includes("weather") ||
    msg.includes("rain") ||
    msg.includes("monsoon") ||
    msg.includes("मौसम") ||
    msg.includes("बारिश")
  ) {
    return "☁️ Seasonal Advice: Kharif crops (Jun–Oct) depend on monsoon — ensure good drainage. Rabi crops (Nov–Mar) need 4–6 irrigations. During excessive rain, clear drainage channels and apply fungicide preventively. In drought, use mulching to conserve soil moisture. Always have a contingency plan for weather extremes.";
  }

  if (
    msg.includes("market") ||
    msg.includes("price") ||
    msg.includes("sell") ||
    msg.includes("mandi") ||
    msg.includes("बाज़ार") ||
    msg.includes("कीमत")
  ) {
    return "📊 Check the Market Prices tab for current ₹/quintal rates for all major crops. Cotton and Sugarcane are showing strong prices this season. Diversifying crops can reduce market risk. Connect with your local APMC mandi or use eNAM platform for better price discovery.";
  }

  if (msg.includes("soil") || msg.includes("मिट्टी")) {
    return "🌍 Soil Health: Test your soil every 2-3 years. Ideal pH for most crops is 6.0–7.5. Add organic matter (compost/FYM) to improve soil structure. Green manuring with Dhaincha or Sunhemp before monsoon can restore nitrogen levels. Avoid excessive tillage to preserve soil biology.";
  }

  if (
    msg.includes("seed") ||
    msg.includes("sowing") ||
    msg.includes("बीज") ||
    msg.includes("बुवाई")
  ) {
    return "🌱 Seed & Sowing: Use certified seeds from government agencies or reputed companies. Treat seeds with Thiram or Carbendazim (2g/kg) before sowing. For best results, check local KVK (Krishi Vigyan Kendra) for variety recommendations suited to your region.";
  }

  return "🌾 Thank you for your question. For personalized advice, please consult your local Krishi Vigyan Kendra (KVK) or call the Kisan Call Centre at 1800-180-1551 (toll-free). You can also use the Crop Advisor tab for soil-based recommendations.";
}
