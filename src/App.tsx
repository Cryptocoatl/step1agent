import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { WalletProvider } from '@/providers/WalletProvider'
import { Toaster } from '@/components/ui/sonner'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/Home'
import DigitalIDPage from '@/pages/DigitalID'
import WalletPage from '@/pages/Wallet'
import DAOPage from '@/pages/DAO'
import AdminPage from '@/pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'digital-id', element: <DigitalIDPage /> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'dao', element: <DAOPage /> },
      { path: 'admin', element: <AdminPage /> }
    ]
  }
])

function App() {
  return (
    <WalletProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </WalletProvider>
  )
}

export default App
