import { getCanisterStatus } from './icpService'
import { getActiveUsersCount } from './digitalIdService'

export interface MonitoringData {
  canisters: number
  activeUsers: number
  storageUsage: number
  cpuUsage: number
  memoryUsage: number
}

export async function getMonitoringData(): Promise<MonitoringData> {
  try {
    // TODO: Replace with real monitoring endpoints
    const [canisters, activeUsers] = await Promise.all([
      getCanisterStatus(),
      getActiveUsersCount()
    ])

    return {
      canisters: canisters?.length || 0,
      activeUsers: activeUsers || 0,
      storageUsage: Math.floor(Math.random() * 100),
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100)
    }
  } catch (error) {
    console.error('Monitoring service error:', error)
    throw error
  }
}

const getCanisterStatus = async () => {
  return { status: "running", memory: "10MB", cycles: "1B" };
};

const getActiveUsersCount = async () => {
  return 100;
};
