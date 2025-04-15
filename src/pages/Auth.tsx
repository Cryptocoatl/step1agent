
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { resendVerificationEmail } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { EmailVerificationSent } from "@/components/auth/EmailVerificationSent";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { EmailVerificationStatus } from "@/components/auth/EmailVerificationStatus";
import { LoginFormValues } from "@/components/auth/LoginForm";
import { SignupFormValues } from "@/components/auth/SignupForm";
import { ResetPasswordFormValues } from "@/components/auth/ResetPasswordForm";

const Auth = () => {
  const { user, signIn, signUp, resetPassword, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showReset, setShowReset] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenFromHash = async () => {
      const hash = window.location.hash;
      
      if (hash && hash.includes("access_token")) {
        setIsProcessingAuth(true);
        
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        
        if (accessToken && refreshToken) {
          try {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (error) throw error;
            
            window.history.replaceState({}, document.title, window.location.pathname + "?verified=true");
            
            setIsVerified(true);
            toast({
              title: "Email verified successfully",
              description: "You can now access all STEP1 features",
            });
          } catch (error: any) {
            console.error("Error setting session:", error);
            toast({
              title: "Verification failed",
              description: error.message,
              variant: "destructive"
            });
          } finally {
            setIsProcessingAuth(false);
          }
        }
      }
    };

    handleTokenFromHash();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get('verified');
    
    if (verified === 'true' && !isProcessingAuth) {
      setIsVerified(true);
      toast({
        title: "Email verified successfully",
        description: "You can now access all STEP1 features",
      });
      
      if (user) {
        setTimeout(() => {
          navigate('/digital-id');
        }, 1500);
      }
    }
  }, [location, user, navigate, isProcessingAuth]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const result = await signIn(values.email, values.password);
      if (!result.error && result.data) {
        toast({
          title: "Login successful",
          description: "Welcome to STEP1!"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    try {
      const result = await signUp(values.email, values.password);
      if (!result.error && result.data) {
        setEmailVerificationSent(true);
        setVerificationEmail(values.email);
        toast({
          title: "Account created",
          description: "Please check your email to verify your account."
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    try {
      await resetPassword(values.email);
      setShowReset(false);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the reset link."
      });
    } catch (error) {
      console.error("Reset error:", error);
    }
  };

  const handleResendVerification = async () => {
    if (!verificationEmail) return;
    
    try {
      await resendVerificationEmail(verificationEmail);
      toast({
        title: "Verification email resent",
        description: "Please check your inbox or spam folder."
      });
    } catch (error) {
      console.error("Failed to resend verification:", error);
    }
  };

  // Redirect authenticated users to digital-id if not verifying or already on digital-id page
  if (user && !isVerified && !isProcessingAuth) {
    return <Navigate to="/digital-id" replace />;
  }

  return (
    <AuthLayout>
      <EmailVerificationStatus 
        isProcessingAuth={isProcessingAuth}
        isVerified={isVerified} 
        hasUser={!!user}
      />
      
      {emailVerificationSent ? (
        <GlassPanel className="p-6">
          <EmailVerificationSent 
            email={verificationEmail}
            onBackToLogin={() => {
              setEmailVerificationSent(false);
              setActiveTab("login");
            }}
            onResendVerification={handleResendVerification}
          />
        </GlassPanel>
      ) : showReset ? (
        <GlassPanel className="p-6">
          <ResetPasswordForm 
            onSubmit={handleResetPassword}
            onBackToLogin={() => setShowReset(false)}
            isLoading={isLoading}
          />
        </GlassPanel>
      ) : (
        <AuthTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onForgotPassword={() => setShowReset(true)}
          isLoading={isLoading}
        />
      )}
    </AuthLayout>
  );
};

export default Auth;
