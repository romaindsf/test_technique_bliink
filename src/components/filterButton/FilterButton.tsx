import React from 'react'
import styles from './_filterButton.module.scss'
import { useArticlesFetcher } from '@/hooks/useGetCategory'

export default function FilterButton({
  category,
}: {
  category: string
}): JSX.Element {
  const { fetchCategory } = useArticlesFetcher()

  return (
    <button
      onClick={() => fetchCategory(category)}
      type='button'
      className={styles.filterButton}
    >
      {category}
    </button>
  )
}
