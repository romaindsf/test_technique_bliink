import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticlePage from './page'
import { useParams } from 'next/navigation'
import useArticleLogic from '@/hooks/useCombinedArticleList'
import useSelectedArticle from '@/hooks/useSelectedArticle'

// Mock des hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}))

jest.mock('@/hooks/useCombinedArticleList', () => jest.fn())
jest.mock('@/hooks/useSelectedArticle', () => jest.fn())

interface Article {
  title: string
  urlToImage: string
  publishedAt: Date
  nameURL: string
}

// Mock du composant ArticleDetails
jest.mock('@/components/articleDetails/ArticleDetails', () => {
  return function MockArticleDetails({ article }: { article: Article }) {
    return <div data-testid='article-details'>{JSON.stringify(article)}</div>
  }
})

describe('ArticlePage', () => {
  beforeEach(() => {
    // Mock des paramètres de l'URL
    ;(useParams as jest.Mock).mockReturnValue({ nameURL: 'test-article' })

    // Mock de la logique des articles
    const mockArticles: Article[] = [
      {
        title: 'Test Article',
        urlToImage: 'image.jpg',
        publishedAt: new Date(),
        nameURL: 'test-article',
      },
      {
        title: 'Another Article',
        urlToImage: 'image2.jpg',
        publishedAt: new Date(),
        nameURL: 'another-article',
      },
    ]

    // Retourne les articles mockés
    ;(useArticleLogic as jest.Mock).mockReturnValue(mockArticles)

    // Retourne le premier article pour le test
    ;(useSelectedArticle as jest.Mock).mockReturnValue(mockArticles[0])
  })

  it('renders ArticleDetails with the selected article', () => {
    render(<ArticlePage />)

    // Vérifie que le composant ArticleDetails est rendu avec les bonnes données
    expect(screen.getByTestId('article-details')).toBeInTheDocument()
    expect(screen.getByTestId('article-details')).toHaveTextContent(
      'Test Article'
    )
  })
})
