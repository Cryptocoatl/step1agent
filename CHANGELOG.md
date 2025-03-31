# Changelog

## [Unreleased] - 2025-03-30

### Added
- Created `src/services/crossChainService.ts` to handle interactions with the `cross_chain_wallet_adapter` canister.
- Added `CHANGELOG.md` to track project changes.

### Changed
- Updated `src/components/wallet/WalletConnect.tsx`:
    - Replaced simulated connections for Solana, Ethereum, and Bitcoin with calls to `connectCrossChainWallet` from `crossChainService.ts`.
    - Refactored connection logic using `switch` statement to resolve TypeScript errors.
    - Updated disconnect logic for non-ICP wallets (UI only).
- Updated `src/components/digital-id/DigitalIDCard.tsx`:
    - Replaced non-existent `useAuth` hook with direct calls to `getAuthState` and `logout` from `src/services/icpService.ts`.
    - Added `className` prop to allow styling from parent components.
    - Added optional `expanded` prop.
    - Added basic styling using Tailwind CSS and `cn` utility.
- Updated `src/pages/Index.tsx`:
    - Corrected import for `DigitalIDCard` from named to default import.
- Updated `src/pages/DigitalID.tsx`:
    - Corrected import for `DigitalIDCard` from named to default import.

### Fixed
- Resolved TypeScript errors related to component imports (`DigitalIDCard` in `Index.tsx` and `DigitalID.tsx`).
- Resolved TypeScript errors related to props (`className` and `expanded` in `DigitalIDCard`).
- Resolved TypeScript errors related to type inference in `WalletConnect.tsx` and `crossChainService.ts`.

### Infrastructure
- Started local DFINITY replica using `dfx start --background`.
- Deployed canisters to local replica using `dfx deploy`. (Build succeeded after fixing import/prop errors).
- Updated `src/config/canister.config.ts` to read canister IDs from `import.meta.env`.
- Redeployed frontend canister (`dfx deploy frontend`) to apply the config changes and fix runtime error.
- Updated `vite.config.ts` by removing the duplicate `host` property.
- Removed the duplicate `define` property from `vite.config.ts`.
- Redeployed frontend canister (`dfx deploy frontend`) to apply the config changes.
- Switched from `BrowserRouter` to `HashRouter` in `src/App.tsx` for diagnostic purposes regarding the blank page issue.
