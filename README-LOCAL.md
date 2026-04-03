# Running KisanAI Locally

No `dfx` or Internet Computer setup required. Just Node.js.

## Prerequisites
- Node.js v18 or higher: https://nodejs.org
- npm (comes with Node.js)

## Steps

```bash
# 1. Go into the frontend folder
cd src/frontend

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev
```

Then open http://localhost:3000 in your browser.

## Notes
- Login works with any username (3+ characters) and password (4+ characters)
- Session is saved in browser localStorage
- Plant Scanner, Disease Encyclopedia, Crop Advisor, Market Prices, and Chat all work fully offline
- Internet Identity (blockchain login) is disabled in local mode -- use the form login instead
