import { supabase } from "@/integrations/supabase/client";
import { connectWallet } from "@/services/wallet/walletConnectionService";
import { getConnectedWallets } from "@/services/wallet/walletQueryService";
import { awardTokens } from "@/services/rewardsService";
import { toast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Step } from "./types";

// Define steps for digital ID verification
export const getVerificationSteps = (): Step[] => [
  {
    title: "Basic Identity Verification",
    description: "Set up your basic digital identity"
  },
  {
    title: "Connect Primary Wallet",
    description: "Connect your primary blockchain wallet"
  },
  {
    title: "Complete Profile",
    description: "Add profile details and preferences"
  },
  {
    title: "DAO Registration",
    description: "Register for DAO participation"
  }
];

// Create ICP wallet for verified users
export const createICPWalletIfNeeded = async (user: User | null, isEmailVerified: boolean) => {
  if (!user || !isEmailVerified) return;
  
  try {
    // Only create wallet if user doesn't have one already
    const wallets = await getConnectedWallets();
    const hasICPWallet = wallets.some(wallet => wallet.chain_type === 'icp');
    
    if (!hasICPWallet) {
      console.log("Creating ICP wallet for user:", user.id);
      
      // Generate a deterministic "simulated" ICP address based on the user's email
      // In a real implementation, this would call the ICP canister to create a real wallet
      const emailHash = user.email ? 
        await crypto.subtle.digest(
          'SHA-256', 
          new TextEncoder().encode(user.email)
        ) : null;
      
      if (emailHash) {
        const hashArray = Array.from(new Uint8Array(emailHash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Format as ICP address
        const icpAddress = `${hashHex.substring(0, 8)}-${hashHex.substring(8, 16)}`;
        
        console.log("Generated ICP address:", icpAddress);
        
        // Connect the wallet
        const connected = await connectWallet(icpAddress, 'Smart Wallet', 'icp');
        
        if (connected) {
          console.log("ICP wallet connected successfully");
          
          toast({
            title: "ICP Smart Wallet Created",
            description: "Your STEP1 Identity is now connected to your ICP wallet"
          });
          
          // Award tokens for connecting wallet
          await awardTokens(
            'wallet_connect',
            10,
            'Smart Wallet created and connected to your STEP1 identity'
          );
          
          return true;
        }
      }
    } else {
      console.log("User already has an ICP wallet");
    }
    
    return false;
  } catch (error) {
    console.error("Error creating ICP wallet:", error);
    return false;
  }
};

// Calculate progress based on completed steps
export const calculateProgress = (completedSteps: number[], totalSteps: number): number => {
  return completedSteps.length > 0 
    ? Math.round((completedSteps.length / totalSteps) * 100) 
    : 0;
};
