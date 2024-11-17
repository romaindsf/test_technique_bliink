// app/layout.test.tsx

import { render } from '@testing-library/react'
import RootLayout from './layout'

describe('RootLayout', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>
    )

    // Vérifie que le texte "Test Children" est présent dans le document
    expect(getByText('Test Children')).toBeInTheDocument()
  })

  it('should have the correct HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>
    )

    // Vérifie que la structure HTML est correcte
    expect(container.querySelector('html')).toHaveAttribute('lang', 'fr')
    expect(container.querySelector('body')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
  })
})
