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
    return "📊 Check the Market Prices tab for current ₹/quintal rates for 25 major crops. Use the state filter for local prices. Cotton, Garlic and Onion are showing strong prices this season. Connect with your local APMC mandi or use eNAM platform for better price discovery.";
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

  if (msg.includes("rice") || msg.includes("paddy") || msg.includes("धान")) {
    return "🌾 Rice Cultivation: Transplant paddy at 25-30 days age. Maintain 5cm water level during vegetative stage. Apply 120-80-60 kg NPK/ha in 3 splits. Watch for Brown Plant Hopper and Blast disease. Use SRI method (System of Rice Intensification) to increase yield by 30-50%.";
  }

  if (msg.includes("wheat") || msg.includes("गेहूं")) {
    return "🌿 Wheat Cultivation: Sow in October-November for Rabi. Seed rate: 100 kg/ha. Apply 120-60-40 kg NPK/ha. Irrigation at crown root initiation (21 days), tillering (45 days), and grain filling (85 days) are critical. Use HD-2967, PBW-343 or WH-1105 for high yield.";
  }

  if (msg.includes("cotton") || msg.includes("कपास")) {
    return "☁️ Cotton Growing: Plant in May-June in Kharif. Needs 700-1000mm water. Apply 120 kg N, 60 kg P, 60 kg K per hectare. Watch for Bollworm — use Bt cotton or pheromone traps. Harvest when 50% bolls open. Intercrop with groundnut for better land utilization.";
  }

  if (msg.includes("organic") || msg.includes("जैविक")) {
    return "🌿 Organic Farming: Start by reducing chemical inputs by 25% each year. Use FYM (15-20 tonnes/ha), vermicompost (3-5 tonnes/ha), and green manures. Apply biofertilizers like Rhizobium, Azospirillum, PSB. Organic certification takes 3 years but fetches 20-30% premium prices.";
  }

  if (
    msg.includes("drip") ||
    msg.includes("sprinkler") ||
    msg.includes("ड्रिप")
  ) {
    return "💧 Drip Irrigation: Saves 40-60% water vs. flood irrigation. Install with 20-30cm emitter spacing for vegetables, 60-90cm for fruit crops. Fertigation through drip can improve nutrient efficiency by 30%. Get 50-90% subsidy under PM Krishi Sinchayee Yojana.";
  }

  if (
    msg.includes("insurance") ||
    msg.includes("fasal bima") ||
    msg.includes("bima") ||
    msg.includes("बीमा") ||
    msg.includes("फसल बीमा")
  ) {
    return "🛡️ PM Fasal Bima Yojana: Premium: 2% for Kharif, 1.5% for Rabi, 5% for horticultural crops. Sum insured covers full crop loss. Register at nearest CSC center or pmfby.gov.in before notified cutoff dates. Claims settled within 60 days of crop cutting experiments.";
  }

  if (
    msg.includes("pm-kisan") ||
    msg.includes("pm kisan") ||
    msg.includes("किसान सम्मान") ||
    msg.includes("government scheme") ||
    msg.includes("सरकारी योजना")
  ) {
    return "💰 PM-KISAN Scheme: ₹6,000/year income support in 3 installments of ₹2,000 each. Eligibility: Small & marginal farmers with up to 2 hectares of cultivable land. Register at pmkisan.gov.in or nearest CSC. Also check: Kisan Credit Card (KCC) for low-interest crop loans up to ₹3 lakh at 4% interest.";
  }

  if (
    msg.includes("storage") ||
    msg.includes("harvest") ||
    msg.includes("post harvest") ||
    msg.includes("भंडारण") ||
    msg.includes("कटाई")
  ) {
    return "🏭 Post-Harvest Storage: Dry grains to 12-14% moisture before storage. Use metal bins or HDPE bags for airtight storage. Apply Aluminium Phosphide tablets for fumigation. Use Warehouse Receipt System to store at nearest FCI/CWC warehouse and avail loans against stored produce.";
  }

  if (
    msg.includes("seed treatment") ||
    msg.includes("बीज उपचार") ||
    msg.includes("seed dressing")
  ) {
    return "🧪 Seed Treatment: Treat with Thiram 75WP (3g/kg) for fungal diseases. Imidacloprid 70WS (7g/kg) for sucking pests. Biofertilizer treatment: Rhizobium/Azospirillum (5-10g/kg seed) for legumes. Always treat seeds in shade to avoid UV damage. Treated seeds should be sown within 24 hours.";
  }

  if (
    msg.includes("vermicompost") ||
    msg.includes("compost") ||
    msg.includes("वर्मीकम्पोस्ट") ||
    msg.includes("खाद")
  ) {
    return "♻️ Vermicompost: Use earthworms (Eisenia fetida) to convert crop waste and FYM into rich compost. 1 kg vermicompost = 6 times more nutrients than FYM. Apply 3-5 tonnes/ha. Maintain 60-70% moisture in vermibed. Ready in 45-60 days. Sell surplus at ₹8-15/kg for extra income.";
  }

  if (msg.includes("mango") || msg.includes("आम") || msg.includes("aam")) {
    return "🥭 Mango Cultivation: Plant at 10×10m spacing. Apply 50kg FYM + 1kg N + 500g P + 1kg K per tree annually. Prune canopy to improve air circulation. Watch for Mango Hopper, Fruit Fly. Use cover bags for export quality fruit. Alphonso, Kesar, and Langra are top commercial varieties.";
  }

  if (msg.includes("tomato") || msg.includes("टमाटर")) {
    return "🍅 Tomato Cultivation: Transplant at 30-35 days. Spacing: 60×45cm. Apply 120-80-80 kg NPK/ha. Stake plants at 30cm height. Watch for Early Blight, Late Blight, and ToLCV virus. Use resistant hybrids like Arka Vikas. Drip irrigation + mulching can double yield and reduce disease.";
  }

  if (msg.includes("soybean") || msg.includes("सोयाबीन")) {
    return "🫘 Soybean Cultivation: Sow in June-July at 45×5cm spacing. Seed rate: 75 kg/ha. Apply 20 kg N + 80 kg P + 40 kg K/ha. Inoculate with Bradyrhizobium for nitrogen fixation. Watch for Girdle Beetle and Yellow Mosaic Virus. Harvest at 80-90 days when leaves turn yellow.";
  }

  if (msg.includes("potato") || msg.includes("आलू")) {
    return "🥔 Potato Cultivation: Plant in Oct-Nov in ridges at 60×20cm. Use 25-35mm size seed pieces. Apply 180-100-150 kg NPK/ha. Earth up at 25 and 45 days. Critical irrigation at tuber initiation and development. Watch for Late Blight — use Mancozeb preventively. Kufri Jyoti and Kufri Sindhuri are popular varieties.";
  }

  if (msg.includes("onion") || msg.includes("प्याज") || msg.includes("pyaz")) {
    return "🧅 Onion Cultivation: Raise nursery for 8 weeks. Transplant at 15×10cm spacing. Apply 120-50-50 kg NPK/ha. Withhold irrigation 2 weeks before harvest for better pungency. Watch for Purple Blotch and Thrips. Store at 1-2°C with 70-75% humidity or in well-ventilated traditional stores.";
  }

  return "🌾 Thank you for your question. For personalized advice, please consult your local Krishi Vigyan Kendra (KVK) or call the Kisan Call Centre at 1800-180-1551 (toll-free). You can also use the Crop Advisor tab for soil-based recommendations.";
}
