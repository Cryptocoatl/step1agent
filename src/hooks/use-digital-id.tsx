
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { awardTokens, getTotalTokenBalance } from "@/services/rewardsService";
import { getConnectedWallets, connectWallet } from "@/services/walletService";
import { Step } from "@/components/digital-id/VerificationSteps";

export const useDigitalId = () => {
  const { user, isEmailVerified } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  
  const steps: Step[] = [
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
  
  // Automatically generate ICP wallet address if user is verified
  useEffect(() => {
    if (user && isEmailVerified) {
      const createICPWallet = async () => {
        try {
          // Only create wallet if user doesn't have one already
          const wallets = await getConnectedWallets();
          const hasICPWallet = wallets.some(wallet => wallet.chain_type === 'ICP');
          
          if (!hasICPWallet) {
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
              
              // Connect the wallet
              await connectWallet(icpAddress, 'Smart Wallet', 'ICP');
              
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
            }
          }
        } catch (error) {
          console.error("Error creating ICP wallet:", error);
        }
      };
      
      createICPWallet();
    }
  }, [user, isEmailVerified]);
  
  // Fetch user data
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          // Get profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          if (profileData) {
            setProfile(profileData);
            setDisplayName(profileData.display_name || '');
            
            // Mark appropriate steps as completed
            const newCompleted: number[] = [0]; // Basic ID is created if user exists
            
            // Check wallets
            const wallets = await getConnectedWallets();
            if (wallets.length > 0) {
              newCompleted.push(1); // Wallet connected
            }
            
            // Check profile completion
            if (profileData.display_name && 
                profileData.bio && 
                (profileData.social_links && Object.keys(profileData.social_links).length > 0)) {
              newCompleted.push(2); // Profile completed
            }
            
            // Get token balance
            const balance = await getTotalTokenBalance();
            setTokenBalance(balance);
            
            setCompletedSteps(newCompleted);
            
            // Set next incomplete step as active
            for (let i = 0; i < steps.length; i++) {
              if (!newCompleted.includes(i)) {
                setActiveStep(i);
                break;
              }
            }
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const completeStep = async (index: number) => {
    if (!user || completedSteps.includes(index)) return;
    
    setIsLoading(true);
    
    try {
      // Handle different step completion logic
      switch (index) {
        case 0: // Basic Identity
          // First step is already completed if the user exists
          if (!completedSteps.includes(0)) {
            // Award tokens for completing this step
            await awardTokens(
              'profile_completion', 
              10, 
              'Reward for creating your basic digital identity'
            );
            
            // Mark step as completed
            setCompletedSteps(prev => [...prev, 0]);
          }
          break;
          
        case 1: // Connect Wallet
          // This is handled by the wallet connector component
          // We'll skip this here as the wallet connector will call onWalletConnected
          break;
          
        case 2: // Complete Profile
          if (!displayName) {
            toast({
              title: "Display Name Required",
              description: "Please enter a display name to complete this step",
              variant: "destructive"
            });
            setIsLoading(false);
            return;
          }
          
          // Update profile
          const { error } = await supabase
            .from('profiles')
            .update({ 
              display_name: displayName 
            })
            .eq('id', user.id);
          
          if (error) throw error;
          
          // Award tokens for completing profile
          await awardTokens(
            'profile_completion', 
            10, 
            'Reward for updating your profile information'
          );
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, 2]);
          break;
          
        case 3: // DAO Registration
          // Simulate DAO registration
          await awardTokens(
            'profile_completion', 
            15, 
            'Reward for registering with the DAO'
          );
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, 3]);
          break;
      }
      
      // Update token balance
      const balance = await getTotalTokenBalance();
      setTokenBalance(balance);
      
      // Set next step active
      if (index < steps.length - 1) {
        setActiveStep(index + 1);
      }
      
      toast({
        title: "Step completed",
        description: `You've completed: ${steps[index].title}`,
      });
    } catch (err) {
      console.error("Error completing step:", err);
      toast({
        title: "Error",
        description: "Failed to complete this step. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const progress = completedSteps.length > 0 
    ? Math.round((completedSteps.length / steps.length) * 100) 
    : 0;

  return {
    user,
    steps,
    activeStep,
    setActiveStep,
    completedSteps,
    setCompletedSteps,
    isLoading,
    displayName,
    setDisplayName,
    profile,
    tokenBalance,
    progress,
    completeStep,
    isEmailVerified
  };
};
