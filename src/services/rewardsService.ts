
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define reward types
export type RewardType = 
  | 'video_watch' 
  | 'wallet_connect' 
  | 'profile_completion' 
  | 'kyc_verification';

// Define content types
export type ContentType = 
  | 'video' 
  | 'tutorial' 
  | 'article';

// Function to award tokens to a user
export const awardTokens = async (
  rewardType: RewardType, 
  tokenAmount: number, 
  description: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_rewards')
      .insert({
        reward_type: rewardType,
        token_amount: tokenAmount,
        description: description
      });
    
    if (error) throw error;
    
    toast({
      title: `${tokenAmount} STEP1 Tokens Earned!`,
      description: description,
    });
    
    return true;
  } catch (error) {
    console.error('Error awarding tokens:', error);
    toast({
      title: 'Failed to award tokens',
      description: 'There was an error processing your reward. Please try again.',
      variant: 'destructive'
    });
    return false;
  }
};

// Function to mark content as completed
export const markContentCompleted = async (
  contentId: string, 
  contentType: ContentType
): Promise<boolean> => {
  try {
    // Check if already completed
    const { data: existing } = await supabase
      .from('content_completion')
      .select()
      .eq('content_id', contentId)
      .single();
    
    if (existing) {
      return true; // Already completed
    }
    
    // Insert completion record
    const { error } = await supabase
      .from('content_completion')
      .insert({
        content_id: contentId,
        content_type: contentType
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error marking content as completed:', error);
    return false;
  }
};

// Function to check if a piece of content is completed
export const isContentCompleted = async (contentId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('content_completion')
      .select()
      .eq('content_id', contentId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is the "not found" error code
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking content completion:', error);
    return false;
  }
};

// Function to get total token balance
export const getTotalTokenBalance = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('user_rewards')
      .select('token_amount');
    
    if (error) throw error;
    
    return data.reduce((total, reward) => total + reward.token_amount, 0);
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
};

// Function to get all rewards
export const getUserRewards = async () => {
  try {
    const { data, error } = await supabase
      .from('user_rewards')
      .select('*')
      .order('earned_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error getting user rewards:', error);
    return [];
  }
};
