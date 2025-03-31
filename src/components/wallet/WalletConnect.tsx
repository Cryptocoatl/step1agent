import { useWallet } from '@/providers/WalletProvider'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export function WalletConnect() {
  const { isConnected, principal, connect, disconnect } = useWallet()
  
  const handleClick = async () => {
    try {
      if (isConnected) {
        await disconnect()
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected",
        })
      } else {
        await connect()
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive"
      })
    }
  }

  return (
    <Button onClick={handleClick} variant="default">
      {isConnected 
        ? `Connected: ${principal?.slice(0, 5)}...${principal?.slice(-3)}`
        : 'Connect Wallet'}
    </Button>
  )
}
