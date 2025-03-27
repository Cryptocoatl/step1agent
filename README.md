
# STEP1 Ecosystem – Digital ID + DAO Infrastructure on ICP

A modular Web3 platform powered by the Internet Computer Protocol (ICP) to unify decentralized regenerative projects across multiple chains.

## Key Components
1. Universal Digital Identity Layer (on ICP)
2. Wallet Connector & Cross-Chain Integrations
3. DAO Infrastructure with Hypha + ICP
4. Glocal Network UI/UX Layer
5. Modular Launchpad for Aligned Projects

## Setup Instructions

### Prerequisites
1. Install DFX (Internet Computer SDK):
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

2. Install project dependencies:
```bash
npm install
```

### Development

1. Start the local ICP replica:
```bash
dfx start --clean --background
```

2. Deploy canisters to local replica:
```bash
dfx deploy
```

3. Start the development server:
```bash
npm run dev
```

### Production Deployment to ICP Mainnet

1. Create a cycles wallet if you don't have one already.

2. Switch to mainnet:
```bash
dfx identity use default
dfx identity get-principal
```

3. Deploy to mainnet:
```bash
DFX_NETWORK=ic dfx deploy
```

4. Your app will be available at:
```
https://<frontend_canister_id>.ic0.app
```

## Features
- Digital ID management
- Multi-chain wallet connections
- DAO governance tools
- Glocal regenerative network interface
- AI agent integration

## Technologies
- Frontend: React, Tailwind CSS, shadcn/ui
- Backend: Internet Computer (Motoko)
- Wallet Connections: Multiple chain adapters
- DAO: Hypha integration
