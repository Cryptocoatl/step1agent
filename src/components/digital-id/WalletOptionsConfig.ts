
export interface WalletOptionConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  chainType: string;
}

export const walletOptions: WalletOptionConfig[] = [
  {
    id: "icp",
    name: "Internet Computer",
    icon: "ICP",
    description: "Connect your ICP wallet to access your digital identity",
    color: "from-blue-500 to-purple-600",
    chainType: "icp"
  },
  {
    id: "ethereum",
    name: "Ethereum (EVM)",
    icon: "ETH",
    description: "Connect to EVM compatible networks",
    color: "from-blue-400 to-indigo-500",
    chainType: "evm"
  },
  {
    id: "solana",
    name: "Solana",
    icon: "SOL",
    description: "Connect to Solana DeFi ecosystem",
    color: "from-green-400 to-teal-500",
    chainType: "solana"
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "BTC",
    description: "Connect your Bitcoin Ordinals wallet",
    color: "from-orange-400 to-amber-500",
    chainType: "bitcoin"
  },
  {
    id: "holochain",
    name: "Holochain",
    icon: "HOT",
    description: "Connect your Holochain identity",
    color: "from-green-500 to-emerald-600",
    chainType: "holochain"
  },
];
