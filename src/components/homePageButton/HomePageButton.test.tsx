import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePageButton from './HomePageButton'

describe('HomePageButton', () => {
  it('renders a link to the home page with correct text', () => {
    render(<HomePageButton />)

    const linkElement = screen.getByRole('link', {
      name: /retour à l'accueil/i,
    })
    // test si le composant rend un lien accessible avec le texte "Retour à l'accueil"
    expect(linkElement).toBeInTheDocument()
    // si le lien a l'attribut href correct pointant vers la page d'accueil ('/').
    expect(linkElement).toHaveAttribute('href', '/')
    // si le lien a la classe CSS 'return_link' appliquée.
    expect(linkElement).toHaveClass('return_link')
  })
})
