
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Mail, Key, LogIn, UserPlus, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { resendVerificationEmail } from "@/services/authService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email")
});

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

  // Handle access token from URL hash
  useEffect(() => {
    const handleTokenFromHash = async () => {
      const hash = window.location.hash;
      
      if (hash && hash.includes("access_token")) {
        setIsProcessingAuth(true);
        
        // Extract tokens from hash
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        
        if (accessToken && refreshToken) {
          try {
            // Set the session with the tokens from URL
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });

            if (error) throw error;
            
            // Clear the hash from URL to avoid token exposure
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

  // Check for verification success from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get('verified');
    
    if (verified === 'true' && !isProcessingAuth) {
      setIsVerified(true);
      toast({
        title: "Email verified successfully",
        description: "You can now access all STEP1 features",
      });
      
      // Redirect to digital ID after a short delay
      if (user) {
        setTimeout(() => {
          navigate('/digital-id');
        }, 1500);
      }
    }
  }, [location, user, navigate, isProcessingAuth]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: ""
    }
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await signUp(values.email, values.password);
      setEmailVerificationSent(true);
      setVerificationEmail(values.email);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const onResetSubmit = async (values: z.infer<typeof resetSchema>) => {
    try {
      await resetPassword(values.email);
      setShowReset(false);
    } catch (error) {
      console.error("Reset error:", error);
    }
  };

  const handleResendVerification = async () => {
    if (!verificationEmail) return;
    
    try {
      await resendVerificationEmail(verificationEmail);
    } catch (error) {
      console.error("Failed to resend verification:", error);
    }
  };

  // Redirect if user is already logged in and we're not in the verification success state
  if (user && !isVerified && !isProcessingAuth) {
    return <Navigate to="/digital-id" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <SpaceBackground />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <AnimatedCard animation="fade" className="mb-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gradient">Welcome to STEP1</h1>
                <p className="text-muted-foreground mt-2">
                  Your journey into the future of digital identity begins here
                </p>
              </div>
              
              {isProcessingAuth && (
                <Alert className="mb-8 bg-primary/10 border-primary/30">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <AlertTitle>Processing verification</AlertTitle>
                  <AlertDescription>
                    Please wait while we verify your email...
                  </AlertDescription>
                </Alert>
              )}
              
              {isVerified && user && (
                <Alert className="mb-8 border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <AlertTitle>Email Verified Successfully!</AlertTitle>
                  <AlertDescription>
                    Your email has been verified. Redirecting you to set up your Digital ID...
                  </AlertDescription>
                </Alert>
              )}
              
              <GlassPanel className="p-6">
                {emailVerificationSent ? (
                  <div className="text-center py-6">
                    <div className="flex justify-center mb-4">
                      <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <h2 className="text-xl font-medium mb-3">Verification Email Sent</h2>
                    <p className="text-muted-foreground mb-6">
                      We've sent a verification email to <strong>{verificationEmail}</strong>.
                      Please check your inbox and click the verification link.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        onClick={() => {
                          setEmailVerificationSent(false);
                          setActiveTab("login"); 
                          loginForm.setValue('email', verificationEmail);
                        }}
                        variant="outline" 
                        className="w-full"
                      >
                        Return to Login
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Didn't receive the email? Check your spam folder or{" "}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-sm"
                          onClick={handleResendVerification}
                        >
                          click here to resend
                        </Button>
                      </p>
                    </div>
                  </div>
                ) : showReset ? (
                  <div>
                    <h2 className="text-xl font-medium mb-4">Reset Password</h2>
                    <Form {...resetForm}>
                      <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                        <FormField
                          control={resetForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    placeholder="you@example.com" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-between items-center pt-2">
                          <Button 
                            type="button"
                            variant="ghost"
                            onClick={() => setShowReset(false)}
                          >
                            Back to Login
                          </Button>
                          <Button 
                            type="submit"
                            className="button-animated"
                            disabled={isLoading}
                          >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                ) : (
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="you@example.com" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-right">
                            <Button 
                              type="button" 
                              variant="link" 
                              onClick={() => setShowReset(true)}
                              className="p-0 h-auto text-sm"
                            >
                              Forgot password?
                            </Button>
                          </div>
                          
                          <Button 
                            type="submit"
                            className="w-full button-animated"
                            disabled={isLoading}
                          >
                            <LogIn className="mr-2 h-4 w-4" />
                            {isLoading ? "Signing in..." : "Sign In"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="signup">
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="you@example.com" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="pl-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit"
                            className="w-full button-animated"
                            disabled={isLoading}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            {isLoading ? "Creating account..." : "Create Account"}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                )}
                
                <div className="p-4 mt-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="mr-2 h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      By creating an account, we'll automatically create your ICP smart wallet and 
                      STEP1 digital identity. You'll earn your first STEP1 tokens and begin your 
                      journey into the decentralized world.
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </AnimatedCard>
            
            <div className="text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
