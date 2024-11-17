import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticleDetails from './ArticleDetails'
import { Article } from '@/context/Context'

// Mock du composant HomePageButton
jest.mock('../homePageButton/HomePageButton', () => {
  return function DummyHomePageButton() {
    return <div data-testid='home-page-button'>Mocked HomePageButton</div>
  }
})
// // Exemple d'article pour les tests
describe('ArticleDetails', () => {
  const mockArticle: Article = {
    title: 'Test Article',
    publishedAt: new Date(),
    description: 'This is a test description',
    urlToImage: 'https://example.com/image.jpg',
    content: 'This is the test content',
    source: {
      name: 'Test Source',
      id: '',
    },
    url: 'https://example.com/article',
    author: '',
    nameURL: '',
  }

  it('renders article details correctly when article is provided', () => {
    // Rendu du composant avec l'article mock
    render(<ArticleDetails article={mockArticle} />)

    expect(
      screen.getByRole('heading', { name: mockArticle.title })
    ).toBeInTheDocument()
    expect(screen.getByText(/Publié le:/)).toBeInTheDocument()
    expect(
      screen.getByText(new Date(mockArticle.publishedAt).toLocaleDateString())
    ).toBeInTheDocument()
    expect(screen.getByText(mockArticle.description)).toBeInTheDocument()
    //img :
    const image = screen.getByRole('img') as HTMLImageElement
    expect(image).toHaveAttribute('src', mockArticle.urlToImage)
    expect(image).toHaveAttribute('alt', mockArticle.title)

    expect(screen.getByText(mockArticle.content)).toBeInTheDocument()
    expect(screen.getByText(/Source:/)).toBeInTheDocument()
    expect(screen.getByText(mockArticle.source.name)).toBeInTheDocument()

    const fullArticleLink = screen.getByText("Lire l'article complet")
    expect(fullArticleLink).toHaveAttribute(
      'href',
      'https://example.com/article'
    )
    expect(fullArticleLink).toHaveAttribute('target', '_blank')
    // si le bouton de retour à l'accueil est présent
    expect(screen.getByTestId('home-page-button')).toBeInTheDocument()
  })
  // si erreur, le message d'article indisponible est affiché
  it('renders "Article indisponible" when no article is provided', () => {
    render(<ArticleDetails article={null} />)

    expect(screen.getByText('Article indisponible')).toBeInTheDocument()
    expect(screen.queryByText(/Publié le:/)).not.toBeInTheDocument()
  })
})
