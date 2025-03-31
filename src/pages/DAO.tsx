import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DAOPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">DAO Governance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>STEP1 Tokenomics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Token: STEP1</h4>
                <h4 className="font-medium">Network: ICP</h4>
                <h4 className="font-medium">Total Supply: 111,111,111 (Fixed)</h4>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Distribution:</h4>
                <ul className="space-y-2">
                  <li>Treasury DAO: 30% (33,333,333)</li>
                  <li>Airdrops & Community: 20% (22,222,222)</li>
                  <li>Mission Rewards: 15% (16,666,666)</li>
                  <li>Initial Liquidity: 10% (11,111,111)</li>
                  <li>Founders & Advisors: 10% (11,111,111)</li>
                  <li>Strategic Partners: 5% (5,555,555)</li>
                  <li>Ecosystem Reserve: 10% (11,111,111)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governance Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-muted-foreground">
                  Connect your wallet to view and vote on proposals
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
