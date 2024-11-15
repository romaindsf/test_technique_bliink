import { Article, useAppContext } from '@/context/Context'
import { useEffect, useState } from 'react'

// Fusion des articles sauvegardés en un array simple

export default function useArticleLogic() {
  const { savedArticles, setLoading, setError } = useAppContext()
  const [articleList, setArticleList] = useState<Article[]>([])

  useEffect(() => {
    setLoading(true)
    try {
      const mergedArticleList: Article[] = []
      // Plus de catégories qui les séparent
      for (const key in savedArticles) {
        if (savedArticles.hasOwnProperty(key)) {
          mergedArticleList.push(...savedArticles[key])
        }
      }
      setArticleList(mergedArticleList)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? `Erreur lors du chargement des articles. ${error.message}`
          : 'Erreur lors du chargement des articles.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [savedArticles, setError, setLoading])

  return articleList
}
