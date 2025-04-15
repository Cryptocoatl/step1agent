
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null, data: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null, data: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<{ error: any | null, data: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };
  
  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  };
  
  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  // Update user profile
  const updateProfile = async (profileData: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: new Error("Not authenticated"), data: null };
    }
    
    return await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id);
  };
  
  // Provide the auth context value
  const value = {
    session: auth.session,
    user: auth.user,
    isLoading: auth.isLoading,
    isEmailVerified: auth.isEmailVerified,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an SupabaseAuthProvider");
  }
  return context;
};
