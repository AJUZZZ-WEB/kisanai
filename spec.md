# KisanAI – Kaggle Dataset Expansion

## Current State
- Plant Scanner has 38 PlantVillage disease classes with symptoms/treatments in `diseaseLogic.ts`
- Disease Encyclopedia browses/filters these 38 entries
- Market Prices shows 8 static crops with dummy prices
- Crop Advisor uses rule-based logic in `cropLogic.ts`
- i18n supports 7 languages (en, hi, ta, ml, te, kn, mr)

## Requested Changes (Diff)

### Add
- **Expanded PlantVillage disease database**: Break down the 38 classes into 54 entries with crop variety detail, severity levels, cause (fungal/bacterial/viral/pest), prevention tips, and whether fungicide/pesticide is recommended
- **Soil dataset reference data**: Add a SoilDataPanel to Crop Advisor with reference ranges for NPK, pH, and micronutrients for each recommended crop (from standard agricultural datasets)
- **Expanded Market Prices dataset**: Increase from 8 to 25 crops with state-wise average prices (Punjab, Maharashtra, Telangana, Tamil Nadu, UP), weekly/monthly trend data, and a price comparison chart
- **Weather impact data**: Add a WeatherAdvisory section to Dashboard that shows crop-specific weather warnings and advisory based on simulated weather conditions for different Indian states/regions
- **Kaggle crop recommendation dataset integration**: Expand cropLogic.ts to use a richer rule set derived from the Kaggle Crop Recommendation Dataset (22 crops, NPK ranges, temperature, humidity, rainfall)

### Modify
- `diseaseLogic.ts`: Expand from 38 to 54 entries, add severity, cause, prevention, fungicide fields to DiseaseEntry
- `cropLogic.ts`: Use richer Kaggle-based rules for 22 crops with more accurate NPK/pH ranges
- `MarketPrices.tsx`: Expand to 25 crops, add state filter, trend chart
- `Dashboard.tsx`: Add WeatherAdvisory card
- `DiseaseEncyclopedia.tsx`: Show severity badge, cause tag, prevention tips
- `types.ts`: Add severity, cause, prevention, fungicide to DiseaseEntry; add state to MarketPrice
- `i18n.ts`: Add translation keys for new UI sections

### Remove
- Nothing removed

## Implementation Plan
1. Update `types.ts` with extended DiseaseEntry and MarketPrice types
2. Expand `diseaseLogic.ts` with 54 entries including severity, cause, prevention, fungicide
3. Expand `cropLogic.ts` with Kaggle crop recommendation dataset rules (22 crops)
4. Expand `MarketPrices.tsx` with 25 crops, state filter tabs, trend indicators
5. Update `DiseaseEncyclopedia.tsx` to display new fields (severity badge, cause, prevention)
6. Add WeatherAdvisory card to `Dashboard.tsx`
7. Add translation keys for new sections to `i18n.ts`
