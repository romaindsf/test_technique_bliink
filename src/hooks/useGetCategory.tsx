import { useCallback } from 'react'
import { useAppContext } from '@/context/Context'
import { callSelectedCategory } from '../api/callAPI'
import { handleArticleData } from '@/utils/handleArticleData'

// Hook personnalisé pour gérer la récupération des articles
export function useArticlesFetcher() {
  // Contexte de l'application
  const {
    setdisplayedArticles,
    setLoading,
    setError,
    savedArticles,
    setSavedArticles,
  } = useAppContext()

  // useCallback pour optimisation des performances
  const fetchCategory = useCallback(
    async (category: string) => {
      // Articles de la catégorie sont-ils déjà en cache ?
      if (savedArticles[category]) {
        setdisplayedArticles(savedArticles[category])
        return
      }
      setLoading(true)
      try {
        // Appel à l'API pour récupérer les articles de la catégorie sélectionnée
        const fetchedArticles = await callSelectedCategory(category)

        // Elimination des articles incomplets ou supprimés
        // et ajout de la propriété nameURL
        const UpdatedList = handleArticleData(fetchedArticles)
        // Si le tableau filtré n'est pas vide, on met à jour l'état avec ces articles
        if (UpdatedList.length > 0) {
          setdisplayedArticles(UpdatedList)
        } else {
          setdisplayedArticles([]) // On peut définir un tableau vide si aucun article valide
        }

        // Mise en cache des articles récupérés
        setSavedArticles((prevState) => ({
          ...prevState,
          [category]: UpdatedList,
        }))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Gestion des erreurs
        setError('Échec de la récupération des articles')
      } finally {
        setLoading(false)
      }
    },
    [
      savedArticles,
      setdisplayedArticles,
      setLoading,
      setError,
      setSavedArticles,
    ]
  )
  return { fetchCategory }
}
