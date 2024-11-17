import React from 'react'
import { render, screen } from '@testing-library/react'
import ArticleCard from './ArticleCard'

// Mock de next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('ArticleCard', () => {
  // Données de test pour l'article
  const mockArticleProps = {
    urlToImage: 'https://example.com/image.jpg',
    title: 'Test Article Title',
    publishedAt: new Date('2023-11-17T12:00:00Z'),
    nameURL: '/article/test-article',
  }

  it('renders article card correctly', () => {
    // Rendu du composant ArticleCard avec les props mockées
    render(<ArticleCard {...mockArticleProps} />)

    const image = screen.getByRole('img') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockArticleProps.urlToImage)
    expect(image).toHaveAttribute(
      'alt',
      `Image de couverture de l'article : ${mockArticleProps.title}`
    )
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(mockArticleProps.title)
    const publishDate = screen.getByText(
      mockArticleProps.publishedAt.toLocaleDateString()
    )
    expect(publishDate).toBeInTheDocument()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', mockArticleProps.nameURL)
  })

  it('does not render publish date if not provided', () => {
    // Rendu du composant sans date de publication
    const propsWithoutDate = { ...mockArticleProps, publishedAt: undefined }
    render(<ArticleCard {...propsWithoutDate} />)

    // Vérification que la date n'est pas affichée
    expect(
      screen.queryByText(mockArticleProps.publishedAt.toLocaleDateString())
    ).not.toBeInTheDocument()
  })
})
