
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

// Mock child components
vi.mock('@/components/wallet/WalletConnect', () => ({
  WalletConnect: () => <button>Connect Wallet</button>
}))

describe('Navbar Component', () => {
  it('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    await waitFor(() => {
      const nav = screen.getByRole('banner') // Header element has banner role
      expect(nav).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /digital id/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /wallet/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /dao/i })).toBeInTheDocument()
    })
  })

  it('renders wallet connect component', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
    })
  })
})
