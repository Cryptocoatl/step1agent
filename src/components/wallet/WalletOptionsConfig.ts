
import { WalletType } from "@/services/icpWalletService";

export interface WalletConfig {
  id: WalletType;
  name: string;
  icon: string;
  description: string;
  color: string;
  url: string;
}

export const walletOptions: WalletConfig[] = [
  {
    id: "plug" as WalletType,
    name: "Plug Wallet",
    icon: "🔌",
    description: "The most popular ICP browser wallet extension",
    color: "from-purple-500 to-indigo-600",
    url: "https://plugwallet.ooo/"
  },
  {
    id: "stoic" as WalletType,
    name: "Stoic Wallet",
    icon: "🧠",
    description: "Web-based ICP wallet, no extension needed",
    color: "from-blue-500 to-sky-600",
    url: "https://www.stoicwallet.com/"
  },
  {
    id: "bitfinity" as WalletType,
    name: "Bitfinity Wallet",
    icon: "∞",
    description: "Multi-chain ICP compatible wallet",
    color: "from-pink-500 to-rose-600",
    url: "https://bitfinity.network/"
  },
  {
    id: "infinity" as WalletType,
    name: "Infinity Wallet",
    icon: "♾️",
    description: "DeFi focused ICP wallet",
    color: "from-green-500 to-emerald-600",
    url: "https://wallet.infinityswap.one/"
  },
  {
    id: "nfid" as WalletType,
    name: "NFID",
    icon: "🔑",
    description: "Internet Identity based authentication",
    color: "from-amber-500 to-yellow-600",
    url: "https://nfid.one/"
  }
];
