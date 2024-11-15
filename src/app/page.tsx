'use client'

import ArticleCard from '@/components/articleCard/ArticleCard'
import FilterButton from '@/components/filterButton/FilterButton'
import styles from './_page.module.scss'
import { useAppContext } from '../context/Context'
import useFetchArticles from '@/hooks/useFetchArticles'

export default function Home() {
  const {
    displayedArticles,
    setdisplayedArticles,
    loading,
    error,
    savedArticles,
  } = useAppContext()
  const categories: readonly string[] = [
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Sports',
    'Technology',
  ]
  // Fonction asynchrone pour récupérer les articles
  useFetchArticles()

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
