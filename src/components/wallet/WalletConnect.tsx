
import { useWallet } from '@/providers/WalletProvider'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/SupabaseAuthProvider'
import { Wallet, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react'
import { Step1Token } from '@/components/ui/Step1Token'

export function WalletConnect() {
  const { isConnected, principal, connect, disconnect, createWallet, isLoading } = useWallet()
  const { user } = useAuth();
  
  const handleConnectICP = async () => {
    try {
      if (isConnected) {
        await disconnect()
      } else {
        await connect()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive"
      })
    }
  }
  
  const handleCreateWallet = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in first to create a wallet",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await createWallet();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create wallet",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">STEP1 Wallet</h2>
        <p className="text-muted-foreground">Connect or create your STEP1 wallet to access the digital identity ecosystem</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border flex flex-col items-center text-center">
          <Step1Token className="mb-4" size="lg" />
          <h3 className="text-xl font-medium mb-2">Create STEP1 Wallet</h3>
          <p className="text-muted-foreground mb-6">
            Get your own STEP1 wallet to hold tokens and interact with the ecosystem
          </p>
          <Button 
            onClick={handleCreateWallet} 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
            disabled={isLoading || isConnected}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            Create STEP1 Wallet
          </Button>
          
          {isConnected && (
            <div className="mt-4 text-sm bg-secondary/50 p-3 rounded-lg">
              <div className="text-emerald-500 flex items-center justify-center mb-1">
                <ShieldCheck className="h-4 w-4 mr-1" /> Wallet Active
              </div>
              <p className="font-mono text-xs overflow-hidden text-ellipsis">
                {principal?.slice(0, 10)}...{principal?.slice(-8)}
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border flex flex-col items-center text-center">
          <Wallet className="h-16 w-16 mb-4 text-indigo-400" />
          <h3 className="text-xl font-medium mb-2">Connect Internet Identity</h3>
          <p className="text-muted-foreground mb-6">
            Connect with Internet Computer's native authentication
          </p>
          <Button 
            onClick={handleConnectICP} 
            variant={isConnected ? "outline" : "default"}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isConnected ? "Disconnect Wallet" : "Connect ICP Wallet"}
          </Button>
          
          {!user && (
            <div className="mt-4 text-sm bg-amber-950/20 p-3 rounded-lg flex items-start">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Sign in first to connect and save your wallet information</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border mt-6">
        <h3 className="text-xl font-medium mb-4">What Can You Do With Your Wallet?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
            <span>Create and verify your digital identity across multiple chains</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
            <span>Participate in governance and voting in DAOs</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
            <span>Earn and hold STEP1 tokens for ecosystem rewards</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
            <span>Access exclusive events and opportunities in the network</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
