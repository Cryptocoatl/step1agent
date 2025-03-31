
import { User } from "@supabase/supabase-js";

export interface Step {
  title: string;
  description: string;
}

export interface DigitalIdState {
  user: User | null;
  steps: Step[];
  activeStep: number;
  completedSteps: number[];
  isLoading: boolean;
  displayName: string;
  profile: any;
  tokenBalance: number;
  progress: number;
  isEmailVerified: boolean;
}
