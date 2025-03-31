import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
})

global.window = dom.window
global.document = dom.window.document
global.navigator = dom.window.navigator

afterEach(() => {
  cleanup()
})
