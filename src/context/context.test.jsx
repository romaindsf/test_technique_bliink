import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider, useAppContext } from './context'

// Composant de test pour utiliser le contexte
const TestComponent = () => {
  const {
    displayedArticles,
    setdisplayedArticles,
    loading,
    setLoading,
    error,
    setError,
  } = useAppContext()

  return (
    <div>
      <h1>Test Context</h1>
      <p>Loading: {loading ? 'true' : 'false'}</p>
      <p>Error: {error}</p>
      <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
      <button onClick={() => setError('An error occurred')}>Set Error</button>
      <button
        onClick={() =>
          setdisplayedArticles([
            {
              title: 'Test Article',
              urlToImage: '',
              publishedAt: new Date(),
              author: '',
              content: '',
              description: '',
              source: { id: null, name: '' },
              url: '',
              nameURL: '',
            },
          ])
        }
      >
        Add Article
      </button>
      <div data-testid='articles'>
        {displayedArticles.map((article, index) => (
          <div key={index}>{article.title}</div>
        ))}
      </div>
    </div>
  )
}

describe('AppContext', () => {
  test('doit initialiser le contexte avec les valeurs par défaut', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    expect(screen.getByText(/Loading:/)).toHaveTextContent('true')
  })

  test("doit changer l'état de loading", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    const toggleButton = screen.getByText('Toggle Loading')
    fireEvent.click(toggleButton)

    expect(screen.getByText(/Loading:/)).toHaveTextContent('false')
  })

  test('doit définir une erreur', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    const errorButton = screen.getByText('Set Error')
    fireEvent.click(errorButton)

    expect(screen.getByText(/Error:/)).toHaveTextContent('An error occurred')
  })

  test('doit ajouter un article à displayedArticles', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    const addArticleButton = screen.getByText('Add Article')
    fireEvent.click(addArticleButton)

    expect(screen.getByTestId('articles')).toHaveTextContent('Test Article')
  })
})
