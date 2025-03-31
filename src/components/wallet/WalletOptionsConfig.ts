
export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  url?: string;
}

export const walletOptions: WalletOption[] = [
  {
    id: "solana",
    name: "Solana",
    icon: "SOL",
    description: "Connect to Solana DeFi ecosystem",
    color: "from-green-400 to-teal-500",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "ETH",
    description: "Connect to EVM compatible networks",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "BTC",
    description: "Connect your Bitcoin wallet",
    color: "from-orange-400 to-amber-500",
  },
  {
    id: "holochain",
    name: "Holochain",
    icon: "HOT",
    description: "Connect your Holochain identity",
    color: "from-green-500 to-emerald-600",
  },
];
