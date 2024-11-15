import { Article } from '@/context/Context'
import { useMemo } from 'react'

// Hook pour sélectionner un article à partir de l'URL.

export default function useSelectedArticle(
  nameURL: string | undefined,
  articleList: Article[]
) {
  return useMemo(() => {
    if (!nameURL) return null
    try {
      // Décodage de l'URL
      const decodedNameURL = decodeURIComponent(nameURL)
      return (
        // Recherche de l'article correspondant à l'URL décodée
        articleList.find(
          (article) => decodeURIComponent(article.nameURL) === decodedNameURL
        ) || null
      )
    } catch (error) {
      console.error("Erreur lors du décodage de l'URL:", error)
      return null
    }
  }, [nameURL, articleList])
}
