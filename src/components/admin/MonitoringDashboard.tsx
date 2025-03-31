import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { getMonitoringData } from '@/services/monitoringService'

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState({
    canisters: 0,
    activeUsers: 0,
    storageUsage: 0,
    cpuUsage: 0,
    memoryUsage: 0
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonitoringData()
        setMetrics(data)
      } catch (error) {
        toast({
          title: 'Monitoring Error',
          description: 'Failed to fetch monitoring data',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [toast])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Canister Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.canisters}</div>
          <p className="text-sm text-muted-foreground">Active canisters</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm mb-1">CPU Usage</p>
            <Progress value={metrics.cpuUsage} />
          </div>
          <div>
            <p className="text-sm mb-1">Memory Usage</p>
            <Progress value={metrics.memoryUsage} />
          </div>
          <div>
            <p className="text-sm mb-1">Storage Usage</p>
            <Progress value={metrics.storageUsage} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
