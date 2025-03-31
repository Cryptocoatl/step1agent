
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { getTotalTokenBalance } from "@/services/rewardsService";
import { getVerificationSteps, createICPWalletIfNeeded, calculateProgress } from "./digital-id/utils";
import { fetchUserProfile, completeDigitalIdStep, determineCompletedSteps } from "@/services/digitalIdService";
import { DigitalIdState, Step } from "./digital-id/types";

export const useDigitalId = () => {
  const { user, isEmailVerified } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  
  // Get verification steps from utils
  const steps: Step[] = getVerificationSteps();
  
  // Automatically generate ICP wallet address if user is verified
  useEffect(() => {
    if (user && isEmailVerified) {
      createICPWalletIfNeeded(user, isEmailVerified);
    }
  }, [user, isEmailVerified]);
  
  // Fetch user data
  useEffect(() => {
    if (user) {
      const loadUserData = async () => {
        setIsLoading(true);
        try {
          // Get profile data
          const profileData = await fetchUserProfile(user.id);
          
          if (profileData) {
            setProfile(profileData);
            setDisplayName(profileData.display_name || '');
            
            // Determine completed steps
            const newCompleted = await determineCompletedSteps(profileData);
            setCompletedSteps(newCompleted);
            
            // Set next incomplete step as active
            for (let i = 0; i < steps.length; i++) {
              if (!newCompleted.includes(i)) {
                setActiveStep(i);
                break;
              }
            }
            
            // Get token balance
            const balance = await getTotalTokenBalance();
            setTokenBalance(balance);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, [user, steps]);
  
  // Handle step completion
  const completeStep = async (index: number) => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    
    const result = await completeDigitalIdStep(user, index, completedSteps, displayName);
    
    if (result.success) {
      if (result.tokenBalance) setTokenBalance(result.tokenBalance);
      if (result.completedSteps) setCompletedSteps(result.completedSteps);
      
      // Set next step active
      if (index < steps.length - 1) {
        setActiveStep(index + 1);
      }
    }
    
    setIsLoading(false);
  };
  
  // Calculate progress
  const progress = calculateProgress(completedSteps, steps.length);

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
