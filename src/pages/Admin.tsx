import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function AdminPage() {
  const [icpId, setIcpId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    // Check admin status from environment variable
    const adminId = import.meta.env.VITE_ADMIN_ICP_ID
    const storedId = localStorage.getItem('ADMIN_ICP_ID')
    
    if (adminId) {
      setIcpId(adminId)
      setIsAdmin(true)
      localStorage.setItem('ADMIN_ICP_ID', adminId)
    } else if (storedId) {
      setIcpId(storedId)
      setIsAdmin(true)
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4" role="heading" aria-label="Admin Panel" data-testid="admin-panel-title">Admin Panel</h1>
      
      {isAdmin ? (
        <div>
          <p className="mb-4">You are logged in as admin with ID: {icpId}</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-red-500">Admin access not configured</p>
          <p className="mt-2">Please set ADMIN_ICP_ID in your environment variables</p>
        </div>
      )}
    </div>
  )
}
