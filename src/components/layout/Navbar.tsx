import { Link } from 'react-router-dom'
import { WalletConnect } from '@/components/wallet/WalletConnect'

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <Link to="/" className="font-bold">
            DigitalID
          </Link>
          <Link to="/digital-id">Identity</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/dao">DAO</Link>
        </nav>
        <WalletConnect />
      </div>
    </header>
  )
}
