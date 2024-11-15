import { callTopHeadlines } from '@/api/callAPI'
import { useAppContext } from '@/context/Context'
import { handleArticleData } from '@/utils/handleArticleData'
import { useEffect } from 'react'

export default function useFetchArticles() {
  const {
    setLoading,
    setError,
    setdisplayedArticles,
    setSavedArticles,
    savedArticles,
  } = useAppContext()
  useEffect(() => {
    if (savedArticles['all']) return // Si les articles sont déjà chargés, on ne fait rien
    // Fonction asynchrone pour récupérer les articles
    async function fetchArticles() {
      try {
        setLoading(true)
        const fetchedArticles = await callTopHeadlines()
        // Elimination des articles incomplets ou supprimés
        const updatedList = handleArticleData(fetchedArticles)
        // Si le tableau filtré n'est pas vide, on met à jour l'état avec ces articles
        if (updatedList.length > 0) {
          setdisplayedArticles(updatedList)
        } else {
          setdisplayedArticles([]) // Tableau vide si aucun article valide
        }
        // Sauvegarde les articles dans propriétés 'all'
        setSavedArticles((prevState) => ({
          ...prevState,
          all: updatedList,
        }))
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? `Échec de la récupération des articles, ${error.message}`
            : 'Échec de la récupération des articles'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [
    savedArticles,
    setLoading,
    setError,
    setdisplayedArticles,
    setSavedArticles,
  ])
}
