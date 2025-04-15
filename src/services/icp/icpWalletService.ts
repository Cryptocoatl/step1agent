
import { toast } from "@/hooks/use-toast";

export type WalletType = 'plug' | 'stoic' | 'bitfinity' | 'infinityswap' | 'nfid';

export const getAvailableWallets = () => {
  const wallets = [
    {
      type: 'plug' as WalletType,
      name: 'Plug Wallet',
      icon: 'https://plugwallet.ooo/assets/images/plug-logo.svg',
      description: 'Browser extension',
      url: 'https://plugwallet.ooo/',
      available: typeof (window as any).ic?.plug !== 'undefined'
    },
    {
      type: 'bitfinity' as WalletType,
      name: 'Bitfinity Wallet',
      icon: 'https://bitfinity.network/logo.svg',
      description: 'Browser extension',
      url: 'https://bitfinity.network/',
      available: typeof (window as any).ic?.bitfinity !== 'undefined'
    },
    {
      type: 'nfid' as WalletType,
      name: 'NFID',
      icon: 'https://nfid.one/images/nfid-logo.svg',
      description: 'Internet Identity',
      url: 'https://nfid.one/',
      available: true
    }
  ];
  
  return wallets.filter(wallet => wallet.available);
};

// Connect to a wallet and get the principal ID
export const connectWallet = async (walletType: WalletType): Promise<string> => {
  const whitelist = [
    "bd3sg-teaaa-aaaaa-qaaba-cai", // Backend canister
    "be2us-64aaa-aaaaa-qaabq-cai", // Cross-chain wallet adapter
  ];
  
  const host = "https://icp-api.io";
  
  switch (walletType) {
    case 'plug':
      if (!(window as any).ic?.plug) {
        throw new Error('Plug wallet extension not found. Please install Plug wallet.');
      }
      
      try {
        const connected = await (window as any).ic.plug.requestConnect({
          whitelist,
          host
        });
        
        if (!connected) {
          throw new Error('Failed to connect to Plug wallet.');
        }
        
        const principal = await (window as any).ic.plug.agent.getPrincipal();
        return principal.toText();
      } catch (error) {
        console.error('Error connecting to Plug wallet:', error);
        throw new Error('Failed to connect to Plug wallet. Please try again.');
      }
      
    case 'bitfinity':
      if (!(window as any).ic?.bitfinity) {
        throw new Error('Bitfinity wallet extension not found. Please install Bitfinity wallet.');
      }
      
      try {
        const connected = await (window as any).ic.bitfinity.requestConnect({
          whitelist,
          host
        });
        
        if (!connected) {
          throw new Error('Failed to connect to Bitfinity wallet.');
        }
        
        const principal = await (window as any).ic.bitfinity.getPrincipal();
        return principal.toString();
      } catch (error) {
        console.error('Error connecting to Bitfinity wallet:', error);
        throw new Error('Failed to connect to Bitfinity wallet. Please try again.');
      }
      
    case 'nfid':
      // For NFID, we'll use Internet Identity flow which is handled in icpService.ts
      // This is a placeholder for now
      try {
        // Generate a mock principal for demo purposes
        const mockPrincipal = `nfid-${Math.random().toString(36).substring(2, 10)}`;
        
        toast({
          title: "NFID Integration",
          description: "NFID integration would launch Internet Identity here in production."
        });
        
        return mockPrincipal;
      } catch (error) {
        console.error('Error connecting to NFID:', error);
        throw new Error('Failed to connect to NFID. Please try again.');
      }
      
    default:
      throw new Error(`Wallet type '${walletType}' not supported.`);
  }
};
