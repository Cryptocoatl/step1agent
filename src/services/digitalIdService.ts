
import { supabase } from "@/integrations/supabase/client";
import { awardTokens, getTotalTokenBalance } from "@/services/rewardsService";
import { toast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

// Fetch user profile data
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
};

// Complete a step in the Digital ID process
export const completeDigitalIdStep = async (
  user: User | null,
  index: number,
  completedSteps: number[],
  displayName: string
) => {
  if (!user || completedSteps.includes(index)) return { success: false };
  
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
          return { success: false };
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
        break;
        
      case 3: // DAO Registration
        // Simulate DAO registration
        await awardTokens(
          'profile_completion', 
          15, 
          'Reward for registering with the DAO'
        );
        break;
    }
    
    // Get updated token balance
    const balance = await getTotalTokenBalance();
    
    toast({
      title: "Step completed",
      description: `You've completed step ${index + 1}`,
    });
    
    return { 
      success: true, 
      tokenBalance: balance, 
      completedSteps: [...completedSteps, index]
    };
  } catch (err) {
    console.error("Error completing step:", err);
    toast({
      title: "Error",
      description: "Failed to complete this step. Please try again.",
      variant: "destructive",
    });
    return { success: false };
  }
};

// Determine which steps are completed
export const determineCompletedSteps = async (profileData: any) => {
  const completedSteps: number[] = [0]; // Basic ID is created if user exists
  
  // Check wallets
  const wallets = await getConnectedWallets();
  if (wallets.length > 0) {
    completedSteps.push(1); // Wallet connected
  }
  
  // Check profile completion
  if (profileData?.display_name && 
      profileData?.bio && 
      (profileData?.social_links && Object.keys(profileData.social_links).length > 0)) {
    completedSteps.push(2); // Profile completed
  }
  
  return completedSteps;
};

// Import at the top
import { getConnectedWallets } from "@/services/walletService";
