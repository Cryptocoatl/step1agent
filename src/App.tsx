
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DigitalID from "./pages/DigitalID";
import WalletDashboard from "./pages/WalletDashboard";
import DAOGovernance from "./pages/DAOGovernance";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Add dark class to enable space theme by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/digital-id" element={<DigitalID />} />
            <Route path="/wallets" element={<WalletDashboard />} />
            <Route path="/governance" element={<DAOGovernance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
