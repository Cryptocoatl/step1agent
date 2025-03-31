import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AdminPage from './Admin'
import { MemoryRouter } from 'react-router-dom'

describe('AdminPage', () => {
  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
    vi.unstubAllEnvs()
  })

  it('should show admin panel when ADMIN_ICP_ID is set', async () => {
    vi.stubEnv('VITE_ADMIN_ICP_ID', '2748279')
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Admin Panel' })).toBeInTheDocument()
    expect(screen.getByText('You are logged in as admin with ID:')).toBeInTheDocument()
    expect(screen.getByText('2748279')).toBeInTheDocument()
  })

  it('should show access denied when no ADMIN_ICP_ID is set', async () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Admin Panel' })).toBeInTheDocument()
    expect(screen.getByText('Admin access not configured')).toBeInTheDocument()
  })

  it('should use localStorage fallback when available', async () => {
    localStorage.setItem('ADMIN_ICP_ID', '2748279')
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Admin Panel' })).toBeInTheDocument()
    expect(screen.getByText('You are logged in as admin with ID:')).toBeInTheDocument()
    expect(screen.getByText('2748279')).toBeInTheDocument()
  })
})
