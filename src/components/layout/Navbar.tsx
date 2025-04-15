
import { Link } from 'react-router-dom'
import { WalletConnect } from '@/components/wallet/WalletConnect'

const routes = [
  { name: "Home", path: "/" },
  { name: "Digital ID", path: "/digital-id" },
  { name: "Wallet", path: "/wallet" },
  { name: "DAO", path: "/dao" },
  { name: "Learn", path: "/learn" },
  { name: "Whitepaper", path: "/whitepaper" },
  { name: "Step1 Agent", path: "/step1-agent" },
];

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
          <Link to="/learn">Learn</Link>
          <Link to="/whitepaper">Whitepaper</Link>
          <Link to="/step1-agent">Step1 Agent</Link>
        </nav>
        <WalletConnect />
      </div>
    </header>
  )
}
