export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Wallet Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Assets</h3>
          <p className="text-muted-foreground">
            Connect your wallet to view assets
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Transactions</h3>
          <p className="text-muted-foreground">
            Recent transactions will appear here
          </p>
        </div>
      </div>
    </div>
  )
}
