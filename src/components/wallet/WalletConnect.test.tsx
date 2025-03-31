import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WalletConnect } from './WalletConnect'
import { useWallet } from '@/providers/WalletProvider'

vi.mock('@/providers/WalletProvider', () => ({
  useWallet: vi.fn()
}))

describe('WalletConnect Component', () => {
  it('renders connect button when not connected', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: false,
      principal: null,
      connect: vi.fn(),
      disconnect: vi.fn()
    })

    render(<WalletConnect />)
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
  })

  it('calls connect when button is clicked', () => {
    const mockConnect = vi.fn()
    vi.mocked(useWallet).mockReturnValue({
      isConnected: false,
      principal: null,
      connect: mockConnect,
      disconnect: vi.fn()
    })

    render(<WalletConnect />)
    fireEvent.click(screen.getByRole('button', { name: /connect wallet/i }))
    expect(mockConnect).toHaveBeenCalled()
  })

  it('shows principal when connected', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: true,
      principal: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
      connect: vi.fn(),
      disconnect: vi.fn()
    })

    render(<WalletConnect />)
    expect(screen.getByRole('button', { name: /ryjl3...cai/i })).toBeInTheDocument()
  })
})
