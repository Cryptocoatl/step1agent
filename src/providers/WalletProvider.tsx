import { createContext, useContext, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'

type WalletContextType = {
  isConnected: boolean
  principal: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [principal, setPrincipal] = useState<string | null>(null)

  const connect = async () => {
    const authClient = await AuthClient.create()
    await authClient.login({
      identityProvider: process.env.DFX_NETWORK === 'ic' 
        ? 'https://identity.ic0.app' 
        : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`
    })
    setIsConnected(true)
    setPrincipal(authClient.getIdentity().getPrincipal().toString())
  }

  const disconnect = async () => {
    setIsConnected(false)
    setPrincipal(null)
  }

  return (
    <WalletContext.Provider value={{ isConnected, principal, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
