import React from 'react'
import { Article } from '@/app/page'
import { callSelectedCategory } from '../../api/callAPI'
import styles from './_filterButton.module.scss'

interface FilterButtonProps {
  category: string
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FilterButton({
  category,
  setArticles,
  setError,
  setLoading,
}: FilterButtonProps) {
  async function handleClickCategory() {
    setLoading(true)
    setError(null)

    try {
      const fetchedArticles = await callSelectedCategory(category)

      const filteredArticles = fetchedArticles.filter(
        (article: Article) =>
          article.title &&
          article.title !== '[Removed]' &&
          article.content &&
          article.content !== '[Removed]' &&
          article.urlToImage !== null
      )

      setArticles(filteredArticles)
    } catch (err) {
      console.error(err)
      setError('Échec de la récupération des articles')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClickCategory} className={styles.filterButton}>
      {category}
    </button>
  )
}
