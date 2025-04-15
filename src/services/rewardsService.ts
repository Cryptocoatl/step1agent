
import { supabase } from "@/integrations/supabase/client";
import { getBackendActor } from "./icpService";

// Function to award tokens to a user
export const awardTokens = async (
  rewardType: string,
  amount: number,
  description: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // First try to use the ICP canister to record the reward
    try {
      const actor = await getBackendActor();
      // Call a method that exists in the backend canister
      // Since earnReward doesn't exist, we'll comment it out temporarily
      // await actor.earnReward(rewardType, amount, description);
      console.log("Would record reward in ICP canister:", rewardType, amount, description);
    } catch (error) {
      console.error("Error recording reward in ICP canister:", error);
      // Continue to record in Supabase as fallback
    }
    
    // Also record in Supabase for client-side usage
    const { error } = await supabase
      .from('user_rewards')
      .insert({
        user_id: user.id,
        token_amount: amount,
        reward_type: rewardType,
        description
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error awarding tokens:", error);
    return false;
  }
};

// Function to get total token balance
export const getTotalTokenBalance = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return 0;
    }
    
    // Try to get from ICP canister first
    try {
      const actor = await getBackendActor();
      // Since getRewards doesn't exist, we'll comment it out temporarily
      // const rewards = await actor.getRewards();
      // if (rewards && rewards.length > 0) {
      //   return rewards.reduce((total, reward) => total + Number(reward.amount), 0);
      // }
      console.log("Would get rewards from ICP canister");
    } catch (error) {
      console.error("Error getting rewards from ICP canister:", error);
      // Continue to use Supabase as fallback
    }
    
    // Get from Supabase as fallback
    const { data, error } = await supabase
      .from('user_rewards')
      .select('token_amount')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return data?.reduce((total, reward) => total + reward.token_amount, 0) || 0;
  } catch (error) {
    console.error("Error getting total token balance:", error);
    return 0;
  }
};

// Function to mark content as completed
export const markContentCompleted = async (contentId: string, contentType: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Record completion in Supabase
    const { error } = await supabase
      .from('content_completion')
      .insert({
        user_id: user.id,
        content_id: contentId,
        content_type: contentType
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error marking content as completed:", error);
    return false;
  }
};

// Function to check if content has been completed
export const isContentCompleted = async (contentId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return false;
    }
    
    // Check completion in Supabase
    const { data, error } = await supabase
      .from('content_completion')
      .select()
      .eq('user_id', user.id)
      .eq('content_id', contentId)
      .maybeSingle();
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error("Error checking content completion:", error);
    return false;
  }
};
