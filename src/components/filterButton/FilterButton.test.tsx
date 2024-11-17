import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterButton from './FilterButton'
import { useArticlesFetcher } from '@/hooks/useGetCategory'

// Mock the custom hook
jest.mock('@/hooks/useGetCategory', () => ({
  useArticlesFetcher: jest.fn(),
}))

describe('FilterButton', () => {
  const mockFetchCategory = jest.fn()
  const testCategory = 'Test Category'

  beforeEach(() => {
    // On configure useArticlesFetcher pour qu'il retourne un objet
    // avec une propriété fetchCategory qui est notre fonction mock
    ;(useArticlesFetcher as jest.Mock).mockReturnValue({
      fetchCategory: mockFetchCategory,
    })
  })

  it('renders a button with the correct category text', () => {
    render(<FilterButton category={testCategory} />)

    const buttonElement = screen.getByRole('button', { name: testCategory })
    // test si le bouton est rendu avec le texte de catégorie correct.
    expect(buttonElement).toBeInTheDocument()
    // si le bouton a la class css  'filterButton'
    expect(buttonElement).toHaveClass('filterButton')
  })

  it('calls fetchCategory with the correct category when clicked', () => {
    render(<FilterButton category={testCategory} />)

    const buttonElement = screen.getByRole('button', { name: testCategory })
    fireEvent.click(buttonElement)
    //test si la fonction fetchCategory est appelée avec la bonne catégorie au clic
    expect(mockFetchCategory).toHaveBeenCalledWith(testCategory)
  })
})
