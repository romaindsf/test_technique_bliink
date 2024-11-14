'use client'

import { useEffect } from 'react'
import { callTopHeadlines } from '../api/callAPI' // Import de la fonction qui récupère les articles
import ArticleCard from '@/components/articleCard/ArticleCard'
import FilterButton from '@/components/filterButton/FilterButton'
import styles from './_page.module.scss'
import { useAppContext } from '../context/Context'
import { handleArticleData } from '@/utils/handleArticleData'
import { log } from 'console'

export default function Home() {
  const {
    displayedArticles,
    setdisplayedArticles,
    loading,
    setLoading,
    error,
    setError,
    savedArticles,
    setSavedArticles,
  } = useAppContext()
  const categories: readonly string[] = [
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Sports',
    'Technology',
  ]

  useEffect(() => {
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
          setdisplayedArticles([]) // On peut définir un tableau vide si aucun article valide
        }
        // Sauvegarde les articles dans propriétés 'all'
        setSavedArticles((prevState) => ({
          ...prevState,
          all: updatedList,
        }))
        console.log('au chargement')
      } catch (err) {
        //gestion des erreurs
        console.error(err)
        setError('Échec de la récupération des articles')
      } finally {
        setLoading(false)
      }
    }

    // Si les articles n'ont pas été chargés auparavant
    if (!savedArticles['all']) {
      fetchArticles() // Lancer la récupération des articles
    }
    console.log(savedArticles)
  }, [
    savedArticles,
    setdisplayedArticles,
    setSavedArticles,
    setError,
    setLoading,
  ])

  return (
    <div>
      <main>
        <h1>Actualités</h1>

        {/* les boutons permettant de   filtrer les articles par catégorie */}
        <div className={styles.filterBar}>
          {/* bouton All, retour aux articles initialement affichés */}
          <button
            type='button'
            onClick={() => setdisplayedArticles(savedArticles['all'])}
          >
            All
          </button>
          {categories.map((category) => (
            <FilterButton //Boutons généré selon l'array categories
              key={category}
              category={category}
            />
          ))}
        </div>
        {
          // Message d'erreur si une erreur s'est produite lors de la récupération des données
          error && <p>{error}</p>
        }

        {/* Liste des articles */}
        <ul className={styles.grid}>
          {displayedArticles && displayedArticles.length > 0
            ? displayedArticles.map((article, index) => (
                <li key={index}>
                  <ArticleCard
                    urlToImage={article.urlToImage}
                    title={article.title}
                    publishedAt={article.publishedAt}
                    nameURL={article.nameURL}
                  />
                </li>
              ))
            : !loading && ( //Si le chargement est terminé mais que displayedArticle est vide :
                <li>
                  Aucun article n&apos;est actuellement disponible. Veuillez
                  réessayer plus tard.
                </li>
              )}
        </ul>
      </main>
    </div>
  )
}
