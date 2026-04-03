# KisanAI

## Current State
The frontend uses ICP/Motoko backend dependencies: `@dfinity/auth-client`, `@icp-sdk/core`, and the `InternetIdentityProvider` wrapper. The `useInternetIdentity` hook tries to initialize an `AuthClient` on mount, which causes the app to hang or error when running locally without a running ICP local replica or `dfx`. The `App.tsx` waits for `isInitializing` to be false before rendering, which is gated on the ICP auth client.

## Requested Changes (Diff)

### Add
- A standalone mock for `useInternetIdentity` that immediately returns `isInitializing: false` and `identity: undefined` without touching any ICP libraries
- A `vite.config.js` `dev` port configuration so it starts on port 3000

### Modify
- `useInternetIdentity.ts`: Replace the ICP AuthClient initialization with a simple stub that works offline (no ICP SDK calls), so the app boots immediately in VS Code with just `npm run dev`
- `main.tsx`: Remove `InternetIdentityProvider` wrapper (or make it a no-op) since it's not needed for the form-based login flow
- `vite.config.js`: Add `server.port: 3000` and remove the ICP proxy that requires dfx running
- Add a `dev` script to `package.json` that runs `vite`

### Remove
- Nothing functional removed -- all KisanAI features remain intact

## Implementation Plan
1. Replace `useInternetIdentity` hook with a standalone stub that never calls ICP SDK
2. Update `main.tsx` to not require `InternetIdentityProvider`
3. Update `vite.config.js`: add `server.port: 3000`, keep environment plugins but remove dfx proxy requirement
4. Add `"dev": "vite"` to `package.json` scripts
5. Add a `README-LOCAL.md` with simple local setup instructions
