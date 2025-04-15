
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm, LoginFormValues } from "./LoginForm";
import { SignupForm, SignupFormValues } from "./SignupForm";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AuthDisclaimer } from "./AuthDisclaimer";

interface AuthTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogin: (values: LoginFormValues) => void;
  onSignup: (values: SignupFormValues) => void;
  onForgotPassword: () => void;
  isLoading: boolean;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({
  activeTab,
  onTabChange,
  onLogin,
  onSignup,
  onForgotPassword,
  isLoading
}) => {
  return (
    <GlassPanel className="p-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm 
            onSubmit={onLogin} 
            onForgotPassword={onForgotPassword}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm 
            onSubmit={onSignup}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
      
      <AuthDisclaimer />
    </GlassPanel>
  );
};
