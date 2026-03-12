import type { DiseaseEntry, DiseaseResult } from "./types";

export const DISEASE_DATABASE: DiseaseEntry[] = [
  // Apple
  {
    id: "apple_scab",
    crop: "Apple",
    cropEmoji: "🍎",
    disease: "Apple Scab",
    isHealthy: false,
    symptoms:
      "Olive-green to brown velvety spots on leaves and fruit; leaves may curl and drop early.",
    description:
      "Fungal disease caused by Venturia inaequalis. Spreads via spores in wet spring conditions.",
    treatment: [
      "Apply captan or myclobutanil fungicide at bud-break",
      "Remove and destroy fallen infected leaves",
      "Prune trees to improve air circulation",
      "Avoid overhead irrigation",
      "Use scab-resistant apple varieties for replanting",
    ],
  },
  {
    id: "apple_black_rot",
    crop: "Apple",
    cropEmoji: "🍎",
    disease: "Apple Black Rot",
    isHealthy: false,
    symptoms:
      "Purple spots on leaves expanding to brown; fruit shows dark sunken lesions turning mummified.",
    description:
      "Caused by Botryosphaeria obtusa fungus. Enters through wounds or lenticels.",
    treatment: [
      "Apply thiophanate-methyl fungicide from pink stage through harvest",
      "Remove mummified fruit and dead wood from trees",
      "Prune cankers at least 15 cm below visible infection",
      "Maintain tree vigor with proper fertilization",
      "Control insects that create entry wounds",
    ],
  },
  {
    id: "apple_cedar_rust",
    crop: "Apple",
    cropEmoji: "🍎",
    disease: "Apple Cedar Rust",
    isHealthy: false,
    symptoms:
      "Bright orange-yellow spots on upper leaf surface; tube-like structures on leaf undersides.",
    description:
      "Caused by Gymnosporangium juniperi-virginianae; requires cedar/juniper as alternate host.",
    treatment: [
      "Apply myclobutanil or mancozeb fungicide from pink bud stage",
      "Remove nearby cedar or juniper trees if possible",
      "Apply protective sprays during wet spring periods",
      "Choose rust-resistant apple varieties",
      "Continue fungicide program for 3–4 weeks after petal fall",
    ],
  },
  {
    id: "apple_healthy",
    crop: "Apple",
    cropEmoji: "🍎",
    disease: "Healthy",
    isHealthy: true,
    symptoms: "No visible disease symptoms; leaves are green and glossy.",
    description:
      "Plant is in good health with no signs of fungal, bacterial, or pest damage.",
    treatment: [
      "Maintain regular pruning schedule",
      "Apply balanced fertilizer in early spring",
      "Monitor weekly for early disease signs",
      "Ensure adequate irrigation and drainage",
    ],
  },
  // Blueberry
  {
    id: "blueberry_healthy",
    crop: "Blueberry",
    cropEmoji: "🫐",
    disease: "Healthy",
    isHealthy: true,
    symptoms: "No visible disease symptoms; leaves are vibrant green.",
    description:
      "Plant is in good health with no signs of infection or stress.",
    treatment: [
      "Maintain soil pH between 4.5–5.5",
      "Mulch around base to retain moisture",
      "Apply sulfur-based acidifying fertilizer",
      "Prune out dead canes each winter",
    ],
  },
  // Cherry
  {
    id: "cherry_powdery_mildew",
    crop: "Cherry",
    cropEmoji: "🍒",
    disease: "Powdery Mildew",
    isHealthy: false,
    symptoms:
      "White powdery coating on young leaves; leaves curl inward and may turn yellow.",
    description:
      "Caused by Podosphaera clandestina; thrives in warm dry days with cool humid nights.",
    treatment: [
      "Spray wettable sulfur (0.2%) at early infection",
      "Apply potassium bicarbonate as organic option",
      "Increase air circulation through pruning",
      "Avoid excessive nitrogen fertilization",
      "Remove infected shoots promptly",
    ],
  },
  {
    id: "cherry_healthy",
    crop: "Cherry",
    cropEmoji: "🍒",
    disease: "Healthy",
    isHealthy: true,
    symptoms: "Leaves are dark green and fully formed with no lesions.",
    description: "Cherry plant is healthy with no observable disease pressure.",
    treatment: [
      "Apply dormant copper spray before bud break",
      "Prune to open canopy for air flow",
      "Monitor for brown rot at flowering",
      "Maintain consistent watering",
    ],
  },
  // Corn/Maize
  {
    id: "corn_gray_leaf_spot",
    crop: "Corn",
    cropEmoji: "🌽",
    disease: "Gray Leaf Spot",
    isHealthy: false,
    symptoms:
      "Rectangular tan to gray lesions on leaves bounded by leaf veins; lesions run parallel to veins.",
    description:
      "Caused by Cercospora zeae-maydis; favored by warm humid conditions and heavy dew.",
    treatment: [
      "Apply azoxystrobin or propiconazole fungicide at VT/R1 stage",
      "Plant resistant hybrids",
      "Rotate crops with non-host crops for 2 years",
      "Reduce residue by tillage where feasible",
      "Scout fields regularly after V8 stage",
    ],
  },
  {
    id: "corn_common_rust",
    crop: "Corn",
    cropEmoji: "🌽",
    disease: "Common Rust",
    isHealthy: false,
    symptoms:
      "Small, powdery, brick-red pustules scattered on both leaf surfaces; pustules turn black late season.",
    description:
      "Caused by Puccinia sorghi; spreads via wind-borne urediniospores from southern regions.",
    treatment: [
      "Apply triazole or strobilurin fungicide if severe",
      "Use resistant hybrid varieties",
      "Scout from V5 stage onwards",
      "Apply fungicide before tasseling if >50% leaves infected",
      "Avoid late planting dates that coincide with spore movement",
    ],
  },
  {
    id: "corn_northern_leaf_blight",
    crop: "Corn",
    cropEmoji: "🌽",
    disease: "Northern Leaf Blight",
    isHealthy: false,
    symptoms:
      "Long, cigar-shaped gray-green to tan lesions (2.5–15 cm); may have wavy margins.",
    description:
      "Caused by Setosphaeria turcica; favored by moderate temperatures and prolonged leaf wetness.",
    treatment: [
      "Apply fungicide at VT stage if disease is present on ear leaf or above",
      "Plant resistant hybrids with Ht gene",
      "Rotate crops and till residue",
      "Scout after canopy closure",
      "Propiconazole, azoxystrobin, or pyraclostrobin are effective",
    ],
  },
  {
    id: "corn_healthy",
    crop: "Corn",
    cropEmoji: "🌽",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Tall, upright plants with bright green leaves and no discoloration.",
    description:
      "Corn crop is healthy with good stand and no visible disease or pest pressure.",
    treatment: [
      "Continue balanced NPK fertilization schedule",
      "Monitor soil moisture and irrigate as needed",
      "Scout for armyworm and aphid pressure",
      "Apply herbicide for weed control as needed",
    ],
  },
  // Grape
  {
    id: "grape_black_rot",
    crop: "Grape",
    cropEmoji: "🍇",
    disease: "Black Rot",
    isHealthy: false,
    symptoms:
      "Tan circular lesions with dark borders on leaves; berries turn black and shrivel to hard mummies.",
    description:
      "Caused by Guignardia bidwellii; most severe during warm, wet weather after bud break.",
    treatment: [
      "Apply captan or mancozeb from bud break through veraison",
      "Remove mummified berries and infected canes",
      "Train vines to improve canopy airflow",
      "Spray myclobutanil at early infection stages",
      "Keep records of infection timing for next season",
    ],
  },
  {
    id: "grape_esca",
    crop: "Grape",
    cropEmoji: "🍇",
    disease: "Esca (Black Measles)",
    isHealthy: false,
    symptoms:
      "Interveinal chlorosis and necrosis forming tiger-stripe pattern; berries show dark spots.",
    description:
      "Complex vascular disease caused by Phaeomoniella and Phaeoacremonium species.",
    treatment: [
      "Prune infected wood at least 30 cm below visible symptoms",
      "Protect pruning wounds with fungicidal paste",
      "Avoid large pruning wounds; use double pruning",
      "Remove and burn severely infected vines",
      "No curative chemical treatment available; prevention is key",
    ],
  },
  {
    id: "grape_leaf_blight",
    crop: "Grape",
    cropEmoji: "🍇",
    disease: "Leaf Blight (Isariopsis Leaf Spot)",
    isHealthy: false,
    symptoms:
      "Irregular dark brown spots on upper leaf surface; premature defoliation in severe cases.",
    description:
      "Caused by Pseudocercospora vitis; occurs in late season under warm humid conditions.",
    treatment: [
      "Apply mancozeb or copper fungicide when symptoms appear",
      "Improve canopy management with proper trellising",
      "Avoid late-season excess nitrogen",
      "Remove heavily infected leaves",
      "Implement preventive spray program from mid-season",
    ],
  },
  {
    id: "grape_healthy",
    crop: "Grape",
    cropEmoji: "🍇",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Leaves are full-sized, dark green, and free of spots or discoloration.",
    description:
      "Vine is healthy with no fungal, bacterial, or pest damage observed.",
    treatment: [
      "Continue dormant pruning to manage canopy",
      "Apply copper dormant spray before bud break",
      "Monitor for downy and powdery mildew from early spring",
      "Maintain balanced nutrition program",
    ],
  },
  // Orange
  {
    id: "orange_haunglongbing",
    crop: "Orange",
    cropEmoji: "🍊",
    disease: "Haunglongbing (Citrus Greening)",
    isHealthy: false,
    symptoms:
      "Yellow shoots, blotchy mottle on leaves, lopsided bitter fruit that remains green at stylar end.",
    description:
      "Caused by Candidatus Liberibacter asiaticus; spread by Asian citrus psyllid. No cure exists.",
    treatment: [
      "Remove and destroy infected trees immediately",
      "Control psyllid vector with imidacloprid or abamectin",
      "Use certified disease-free nursery stock",
      "Apply foliar nutrition to extend productive life of mildly affected trees",
      "Report confirmed cases to local agriculture department",
    ],
  },
  // Peach
  {
    id: "peach_bacterial_spot",
    crop: "Peach",
    cropEmoji: "🍑",
    disease: "Bacterial Spot",
    isHealthy: false,
    symptoms:
      "Small water-soaked spots on leaves turning purple-brown with yellow halos; fruit shows shallow pits.",
    description:
      "Caused by Xanthomonas arboricola pv. pruni; spreads in warm wet weather through rain splash.",
    treatment: [
      "Apply copper hydroxide spray from shuck split through harvest",
      "Avoid overhead irrigation",
      "Plant resistant varieties where available",
      "Avoid sites with frequent wind and rain",
      "Apply oxytetracycline during bloom in high-risk areas",
    ],
  },
  {
    id: "peach_healthy",
    crop: "Peach",
    cropEmoji: "🍑",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Leaves are bright green with no spots or lesions; fruit developing normally.",
    description:
      "Peach tree is healthy with no bacterial, fungal, or pest problems detected.",
    treatment: [
      "Apply dormant copper spray before green tip",
      "Thin fruit for better size and reduced disease load",
      "Monitor for brown rot at pit-hardening stage",
      "Fertilize with balanced NPK plus zinc and boron",
    ],
  },
  // Pepper Bell
  {
    id: "pepper_bacterial_spot",
    crop: "Pepper Bell",
    cropEmoji: "🫑",
    disease: "Bacterial Spot",
    isHealthy: false,
    symptoms:
      "Small dark water-soaked spots on leaves and fruit; spots may coalesce causing leaf drop.",
    description:
      "Caused by Xanthomonas campestris pv. vesicatoria; favored by warm rainy weather.",
    treatment: [
      "Apply copper bactericide every 5–7 days during wet weather",
      "Avoid working in fields when foliage is wet",
      "Use certified pathogen-free seed",
      "Rotate with non-solanaceous crops for 2–3 years",
      "Remove infected plant debris after harvest",
    ],
  },
  {
    id: "pepper_healthy",
    crop: "Pepper Bell",
    cropEmoji: "🫑",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Plants are vigorous with dark green leaves and no spots or wilting.",
    description:
      "Pepper plant is healthy and developing normally with no observable disease.",
    treatment: [
      "Maintain consistent soil moisture",
      "Apply calcium spray to prevent blossom end rot",
      "Scout weekly for aphids and thrips",
      "Apply balanced fertilizer at transplanting and again at fruit set",
    ],
  },
  // Potato
  {
    id: "potato_early_blight",
    crop: "Potato",
    cropEmoji: "🥔",
    disease: "Early Blight",
    isHealthy: false,
    symptoms:
      "Dark brown concentric ring lesions (target-board pattern) on older leaves first; yellowing around lesions.",
    description:
      "Caused by Alternaria solani; occurs in warm weather and is worse on stressed plants.",
    treatment: [
      "Apply chlorothalonil or mancozeb fungicide preventively",
      "Maintain adequate plant nutrition especially nitrogen",
      "Rotate crops with non-solanaceous crops",
      "Remove and destroy infected plant material",
      "Irrigate early in day to allow foliage to dry",
    ],
  },
  {
    id: "potato_late_blight",
    crop: "Potato",
    cropEmoji: "🥔",
    disease: "Late Blight",
    isHealthy: false,
    symptoms:
      "Pale green water-soaked lesions becoming brown-black; white sporulation on leaf undersides in wet weather.",
    description:
      "Caused by Phytophthora infestans; the pathogen that caused the Irish Famine. Spreads rapidly in cool wet conditions.",
    treatment: [
      "Apply metalaxyl + mancozeb (Ridomil Gold) at first sign",
      "Scout twice weekly during cool wet periods",
      "Destroy infected volunteer plants and cull piles",
      "Apply protective fungicide on 5–7 day schedule",
      "Use certified disease-free seed tubers",
    ],
  },
  {
    id: "potato_healthy",
    crop: "Potato",
    cropEmoji: "🥔",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Vigorous green plants with no lesions, wilting, or discoloration.",
    description:
      "Potato crop is healthy with no blight or pest pressure detected.",
    treatment: [
      "Hill plants at 15–20 cm height for tuber protection",
      "Apply balanced fertilizer at planting and side-dress at hilling",
      "Scout for Colorado potato beetle from emergence",
      "Maintain consistent irrigation to prevent hollow heart",
    ],
  },
  // Raspberry
  {
    id: "raspberry_healthy",
    crop: "Raspberry",
    cropEmoji: "🍓",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Canes are upright with bright green leaves; no spots or die-back visible.",
    description:
      "Raspberry plants are healthy with no observable fungal or pest issues.",
    treatment: [
      "Remove floricanes after harvest",
      "Apply dormant copper spray before growth resumes",
      "Mulch rows to suppress weeds and retain moisture",
      "Scout for spider mites during hot dry spells",
    ],
  },
  // Soybean
  {
    id: "soybean_healthy",
    crop: "Soybean",
    cropEmoji: "🌿",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Plants are uniformly green with no yellowing, spots, or wilting.",
    description:
      "Soybean crop is healthy and progressing through normal growth stages.",
    treatment: [
      "Maintain weed control through V6 stage",
      "Scout for soybean aphid from V2 stage",
      "Apply rhizobium inoculant at planting",
      "Monitor for sudden death syndrome in wet years",
    ],
  },
  // Squash
  {
    id: "squash_powdery_mildew",
    crop: "Squash",
    cropEmoji: "🎃",
    disease: "Powdery Mildew",
    isHealthy: false,
    symptoms:
      "White powdery colonies on upper and lower leaf surfaces; leaves may yellow and die prematurely.",
    description:
      "Caused by Podosphaera xanthii; spreads rapidly in warm dry weather with moderate humidity.",
    treatment: [
      "Apply potassium bicarbonate or neem oil at first sign",
      "Use sulfur-based fungicide every 7–10 days",
      "Plant resistant varieties",
      "Avoid overhead irrigation late in day",
      "Remove heavily infected leaves",
    ],
  },
  // Strawberry
  {
    id: "strawberry_leaf_scorch",
    crop: "Strawberry",
    cropEmoji: "🍓",
    disease: "Leaf Scorch",
    isHealthy: false,
    symptoms:
      "Small dark purple spots on leaves; centers turn grayish-brown and borders remain purple.",
    description:
      "Caused by Diplocarpon earlianum; spreads in wet cool spring conditions via rain splash.",
    treatment: [
      "Apply captan fungicide from early spring through harvest",
      "Renovate beds after harvest to remove infected foliage",
      "Avoid overhead irrigation",
      "Plant in well-drained raised beds",
      "Choose scorch-resistant varieties for replanting",
    ],
  },
  {
    id: "strawberry_healthy",
    crop: "Strawberry",
    cropEmoji: "🍓",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Leaves are bright green, trifoliate, and free of spots or scorch.",
    description:
      "Strawberry plants are healthy with good color and no visible disease.",
    treatment: [
      "Renew mulch to keep fruit clean and reduce splash",
      "Apply potassium-rich fertilizer before fruiting",
      "Scout for two-spotted spider mite in hot dry weather",
      "Renovate beds by mowing and thinning after harvest",
    ],
  },
  // Tomato
  {
    id: "tomato_bacterial_spot",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Bacterial Spot",
    isHealthy: false,
    symptoms:
      "Small, dark, water-soaked spots on leaves and fruit; spots have yellow halos on leaves.",
    description:
      "Caused by Xanthomonas species; spreads rapidly in warm wet weather via rain and irrigation.",
    treatment: [
      "Apply copper bactericide every 5–7 days during wet weather",
      "Use pathogen-free transplants",
      "Avoid working in wet fields",
      "Rotate away from tomato and pepper for 2 years",
      "Remove infected plant debris after harvest",
    ],
  },
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Early Blight",
    isHealthy: false,
    symptoms:
      "Dark concentric ring target lesions on older leaves; stems may show dark sunken collar rot.",
    description:
      "Caused by Alternaria solani; most severe on stressed plants or during warm humid weather.",
    treatment: [
      "Apply chlorothalonil or mancozeb fungicide preventively every 7 days",
      "Stake and mulch plants to reduce soil splash",
      "Maintain adequate nitrogen fertility",
      "Remove lower infected leaves",
      "Rotate crops for 2–3 years",
    ],
  },
  {
    id: "tomato_late_blight",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Late Blight",
    isHealthy: false,
    symptoms:
      "Greasy gray-green water-soaked lesions on leaves becoming brown; white sporulation on undersides.",
    description:
      "Caused by Phytophthora infestans; spreads explosively in cool wet conditions.",
    treatment: [
      "Apply metalaxyl-based fungicide (Ridomil) at first sign",
      "Destroy infected plants immediately to limit spread",
      "Scout twice weekly during cool wet periods",
      "Avoid overhead irrigation",
      "Plant resistant varieties (e.g., Defiant, Mountain Magic)",
    ],
  },
  {
    id: "tomato_leaf_mold",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Leaf Mold",
    isHealthy: false,
    symptoms:
      "Pale green to yellow patches on upper leaf; olive-green to gray velvety sporulation below.",
    description:
      "Caused by Passalora fulva; primarily a problem in greenhouses and tunnels with high humidity.",
    treatment: [
      "Increase ventilation and reduce humidity below 85%",
      "Apply chlorothalonil or copper fungicide",
      "Remove infected leaves",
      "Avoid wetting foliage when irrigating",
      "Use resistant varieties in greenhouse production",
    ],
  },
  {
    id: "tomato_septoria_leaf_spot",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Septoria Leaf Spot",
    isHealthy: false,
    symptoms:
      "Small circular spots with dark borders and tan centers; black dots (pycnidia) in lesion centers.",
    description:
      "Caused by Septoria lycopersici; starts on lower leaves and moves upward during wet weather.",
    treatment: [
      "Apply chlorothalonil, mancozeb, or copper fungicide every 7–10 days",
      "Remove infected lower leaves",
      "Mulch to reduce soil splash",
      "Avoid overhead irrigation",
      "Rotate crops and remove volunteer tomatoes",
    ],
  },
  {
    id: "tomato_spider_mites",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Spider Mites (Two-spotted Spider Mite)",
    isHealthy: false,
    symptoms:
      "Fine stippling or bronzing on leaves; fine webbing on leaf undersides; leaves turn yellow and fall.",
    description:
      "Caused by Tetranychus urticae; populations explode in hot dry conditions.",
    treatment: [
      "Apply abamectin or bifenazate acaricide when populations exceed threshold",
      "Spray forceful water jets on leaf undersides to dislodge mites",
      "Introduce predatory mites (Phytoseiulus persimilis) as biocontrol",
      "Avoid broad-spectrum insecticides that kill natural enemies",
      "Maintain irrigation to reduce plant stress",
    ],
  },
  {
    id: "tomato_target_spot",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Target Spot",
    isHealthy: false,
    symptoms:
      "Circular brown lesions with concentric rings and yellow halos on leaves; defoliation if severe.",
    description:
      "Caused by Corynespora cassiicola; common in tropical and subtropical conditions.",
    treatment: [
      "Apply azoxystrobin or difenoconazole fungicide",
      "Improve plant spacing for better airflow",
      "Avoid night irrigation",
      "Remove infected plant material",
      "Scout from transplanting onwards in high-risk areas",
    ],
  },
  {
    id: "tomato_yellow_leaf_curl",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Tomato Yellow Leaf Curl Virus",
    isHealthy: false,
    symptoms:
      "Upward curling and yellowing of young leaves; stunted plants; flowers may drop without fruit set.",
    description:
      "Caused by Tomato yellow leaf curl virus (TYLCV); transmitted by whitefly (Bemisia tabaci).",
    treatment: [
      "Control whitefly vector with imidacloprid or thiamethoxam",
      "Use yellow sticky traps to monitor whitefly populations",
      "Remove and destroy infected plants early",
      "Plant TYLCV-resistant varieties (e.g., Ty-1 gene)",
      "Use reflective mulches to repel whiteflies",
    ],
  },
  {
    id: "tomato_mosaic_virus",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Tomato Mosaic Virus",
    isHealthy: false,
    symptoms:
      "Mottled light and dark green mosaic pattern on leaves; leaves may be distorted or stunted.",
    description:
      "Caused by Tomato mosaic virus (ToMV); spreads via contact, tools, and contaminated seed.",
    treatment: [
      "Remove and destroy infected plants promptly",
      "Wash hands and tools with soap before handling plants",
      "Use virus-free certified seed or transplants",
      "Avoid tobacco products near plants (cross-contamination risk)",
      "No chemical cure; prevention and sanitation are critical",
    ],
  },
  {
    id: "tomato_healthy",
    crop: "Tomato",
    cropEmoji: "🍅",
    disease: "Healthy",
    isHealthy: true,
    symptoms:
      "Dark green leaves, upright habit, no spots or discoloration observed.",
    description:
      "Tomato plant is healthy and growing normally with no detectable disease.",
    treatment: [
      "Continue balanced fertilization (higher K at fruit set)",
      "Maintain consistent soil moisture to prevent blossom end rot",
      "Support with stakes or cages",
      "Scout for hornworm and fruitworm caterpillars",
    ],
  },
];

export function detectDisease(imageSize: number): DiseaseResult {
  const index = imageSize % DISEASE_DATABASE.length;
  const entry = DISEASE_DATABASE[index];
  const baseConfidence = entry.isHealthy ? 92 : 85;
  const variance = (imageSize % 13) - 6;
  return {
    name: entry.disease,
    confidence: Math.min(97, Math.max(76, baseConfidence + variance)),
    description: entry.description,
    treatment: entry.treatment,
    isHealthy: entry.isHealthy,
    crop: entry.crop,
  };
}
