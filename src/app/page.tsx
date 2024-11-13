'use client'

import { useState, useEffect } from 'react'
import callTopHeadlines from '../api/callAPI' // Import de la fonction qui récupère les articles
import ArticleCard from '@/components/articleCard/ArticleCard'
import FilterButton from '@/components/filterButton/FilterButton'
import styles from '../styles/_page.module.scss'

// Interface Article
export interface Article {
  title: string
  urlToImage: string
  publishedAt: string
  author: string
  content: string
  description: string
  source: {
    id: string
    name: string
  }
  url: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [allCategory, setAllCategory] = useState<Article[]>([])
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
        // Appel de la fonction pour récupérer les articles depuis l'API
        const fetchedArticles = await callTopHeadlines()

        // Filtrer les articles, toutes les conditions doivent être vraies pour que l'article soit conservé
        const filteredArticles = fetchedArticles.filter(
          (article: { title: string; content: string; urlToImage: string }) =>
            article.title &&
            article.title !== '[Removed]' &&
            article.content &&
            article.content !== '[Removed]' &&
            article.urlToImage !== null
        )

        // Mise à jour des states
        setArticles(filteredArticles)
        setAllCategory(filteredArticles) //pour bouton filtre 'All'
      } catch (err) {
        //gérer les erreurs
        console.error(err)
        setError('Échec de la récupération des articles')
      } finally {
        setLoading(false) // Une fois les articles récupérés, on met fin au chargement
      }
    }

    fetchArticles()
  }, [])
  return (
    <div>
      <main>
        <h1>Actualités</h1>

        {/* les boutons permettant de   filtrer les articles par catégorie*/}
        <div className={styles.filterBar}>
          {/* bouton All, retour aux articles initialement affichés*/}
          <button onClick={() => setArticles(allCategory)}>All</button>
          {categories.map(
            (
              category //categories est déclaré après  les states
            ) => (
              <FilterButton //Boutons généré selon l'array categories
                key={category}
                setArticles={setArticles}
                setError={setError}
                setLoading={setLoading}
                category={category}
              />
            )
          )}
        </div>
        {
          // Message d'erreur si une erreur s'est produite lors de la récupération des données
          error && <p>{error}</p>
        }

        {/* Liste des articles */}
        <ul className={styles.grid}>
          {articles && articles.length > 0
            ? // Si les articles existent et contient des articles:
              articles.map((article, index) => (
                <li key={index}>
                  <ArticleCard
                    urlToImage={article.urlToImage}
                    title={article.title}
                    publishedAt={article.publishedAt}
                  />
                </li>
              ))
            : !loading && ( //Si le chargement est terminé mais que article est vide :
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
