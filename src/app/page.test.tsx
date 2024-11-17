import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from './page'
import { useAppContext } from '@/context/Context'
import useFetchArticles from '@/hooks/useFetchArticles'

// Mock des hooks
jest.mock('@/context/Context', () => ({
  useAppContext: jest.fn(),
}))
jest.mock('@/hooks/useFetchArticles', () => jest.fn())

// Mock des composants enfants
jest.mock('@/components/articleCard/ArticleCard', () => {
  return function MockArticleCard({ title }: { title: string }) {
    return <div data-testid='article-card'>{title}</div>
  }
})

jest.mock('@/components/filterButton/FilterButton', () => {
  return function MockFilterButton({ category }: { category: string }) {
    return <button data-testid='filter-button'>{category}</button>
  }
})

describe('Home', () => {
  beforeEach(() => {
    //chaque test commence avec un état propre et prévisible
    ;(useAppContext as jest.Mock).mockReturnValue({
      // Cela permet de contrôler ce que le composant Home reçoit comme données du contexte.
      displayedArticles: [],
      setdisplayedArticles: jest.fn(),
      loading: false,
      error: null,
      savedArticles: { all: [] },
    })
    // useFetchArticles sera une fonction vide.
    ;(useFetchArticles as jest.Mock).mockImplementation(() => {})
  })

  it('renders the main title and filter buttons for all categories', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: 'Actualités' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getAllByTestId('filter-button')).toHaveLength(6) // 6 catégories
  })

  it('displays error message when there is an error', () => {
    const errorMessage = 'Une erreur est survenue'
    ;(useAppContext as jest.Mock).mockReturnValue({
      ...useAppContext(),
      error: errorMessage,
    })
    render(<Home />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays articles when available', () => {
    const mockArticles = [
      {
        title: 'Article 1',
        urlToImage: 'image1.jpg',
        publishedAt: new Date(),
        nameURL: 'article-1',
      },
      {
        title: 'Article 2',
        urlToImage: 'image2.jpg',
        publishedAt: new Date(),
        nameURL: 'article-2',
      },
    ]
    ;(useAppContext as jest.Mock).mockReturnValue({
      ...useAppContext(),
      displayedArticles: mockArticles,
    })
    render(<Home />)
    expect(screen.getAllByTestId('article-card')).toHaveLength(2)
  })

  it('displays message when no articles are available', () => {
    render(<Home />)
    expect(
      screen.getByText(/Aucun article n'est actuellement disponible/)
    ).toBeInTheDocument()
  })
})
