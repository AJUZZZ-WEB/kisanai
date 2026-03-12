# KisanAI

## Current State
KisanAI has a Plant Scanner tab that uses the device camera to capture a plant image and runs a simulated disease detection returning one of 5 diseases (Healthy, Leaf Blight, Powdery Mildew, Root Rot, Aphid Infestation). The app has 5 tabs: Dashboard, Crop Advisor, Plant Scanner, Market Prices, Advisory Chat.

## Requested Changes (Diff)

### Add
- All 38 Kaggle PlantVillage disease classes into `diseaseLogic.ts` (Apple Scab, Apple Black Rot, Cedar Apple Rust, Healthy variants for Apple, Blueberry, Cherry, Corn/Maize diseases, Grape diseases, Orange Haunglongbing, Peach diseases, Pepper Bell diseases, Potato diseases, Raspberry, Soybean, Squash, Strawberry, Tomato diseases, etc.) with descriptions and treatment steps.
- A new "Disease Encyclopedia" tab (6th tab) with a searchable/filterable list of all 38 disease entries showing crop, disease name, symptoms, and treatment steps.
- TensorFlow.js model upload/load support in PlantScanner so users can load their own trained `.json` model for real on-device inference instead of random simulation.

### Modify
- `diseaseLogic.ts`: Replace 5 placeholder diseases with full 38-class database. Update `detectDisease` to randomly pick from full list (still simulated unless TFjs model loaded).
- `PlantScanner.tsx`: Add optional TFjs model loader UI (upload model.json + weights). When model is loaded, run real inference; otherwise fall back to simulation.
- `i18n.ts`: Add keys for encyclopedia tab label and UI strings.
- `App.tsx`: Add encyclopedia tab.
- `types.ts`: Add `DiseaseEntry` type for encyclopedia.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `types.ts` to add `DiseaseEntry` with crop, class, symptoms, treatment fields.
2. Replace `diseaseLogic.ts` with full 38-class Kaggle dataset entries.
3. Create `src/frontend/src/tabs/DiseaseEncyclopedia.tsx` with search + filter by crop, list all diseases.
4. Update `PlantScanner.tsx` to add TFjs model loader (file input for model.json + weights shards), run inference when loaded.
5. Update `i18n.ts` with new translation keys.
6. Update `App.tsx` to add encyclopedia tab.
