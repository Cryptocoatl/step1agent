import React, { useState, useEffect } from 'react';
import { getAuthState, logout } from '../../services/icpService'; // Corrected import path
import { cn } from '@/lib/utils'; // Import cn utility
import { Button } from '@/components/ui/button'; // Import Button for styling

interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
}

// Define props interface to accept className and expanded
interface DigitalIDCardProps {
  className?: string;
  expanded?: boolean; // Add optional expanded prop
}

const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ className, expanded }) => { // Destructure className and expanded
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, principal: null });

  useEffect(() => {
    const fetchAuthState = async () => {
      const state = await getAuthState();
      setAuthState({
        isAuthenticated: state.isAuthenticated,
        // Assuming getAuthState returns principal, adjust if needed based on icpService implementation
        principal: state.isAuthenticated ? state.identity?.getPrincipal().toText() : null
      });
    };
    fetchAuthState();
  }, []);

  const handleLogout = async () => {
    await logout();
    // Re-fetch auth state after logout
    const state = await getAuthState();
    setAuthState({
      isAuthenticated: state.isAuthenticated,
      principal: null // Principal is null after logout
    });
  };

  return (
    // Apply className to the root div using cn utility and add base styles
    <div className={cn(
      "p-6 bg-gradient-to-br from-purple-600/20 to-blue-500/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl text-white", 
      className // Merge incoming className
    )}>
      <h2 className="text-2xl font-bold mb-5 text-center">Digital ID Card</h2>
      {authState.isAuthenticated ? (
        <div className="space-y-4 text-center">
          <div>
            <p className="text-sm text-purple-200/80 mb-1">Authenticated Principal:</p>
            <p className="text-xs font-mono break-all bg-black/20 px-2 py-1 rounded">
              {authState.principal}
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm"
            className="w-full bg-red-500/20 border-red-400/50 hover:bg-red-500/40 text-red-100"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <p className="text-center text-purple-200/80 italic">Not authenticated</p>
      )}
    </div>
  );
};

export default DigitalIDCard;
