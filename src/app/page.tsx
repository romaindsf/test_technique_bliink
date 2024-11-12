'use client'

import { useState, useEffect } from 'react'
import getHeadlines from './api/headlines' // Import de la fonction qui récupère les articles

// Interface Article
interface Article {
  title: string
  url: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Se déclenche une seule fois lors du montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les articles
    async function fetchArticles() {
      try {
        // Appel de la fonction pour récupérer les articles depuis l'API
        const fetchedArticles = await getHeadlines()

        // Mise à jour de l'état des articles avec les données récupérées
        setArticles(fetchedArticles)
      } catch (err) {
        // En cas d'erreur lors de la récupération des articles, on met à jour l'état d'erreur
        setError('Échec de la récupération des articles')
      } finally {
        // Lorsque la récupération est terminée (qu'il y ait une erreur ou non), on met à jour l'état de chargement
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div>
      <main>
        <h1>Test technique Alternant Frontend React chez BLIINK</h1>
        <h2>Développer un site de news simple</h2>

        {/* Affichage d'un message de chargement si les articles sont en cours de récupération */}
        {loading && <p>Chargement...</p>}

        {/* Affichage d'un message d'erreur si une erreur s'est produite */}
        {error && <p>{error}</p>}

        {/* Affichage des articles récupérés */}
        <ul>
          {articles && // Vérifie que la liste des articles existe
            articles.map((article, index) => (
              <li key={index}>
                {' '}
                <a href={article.url} target='_blank' rel='noopener noreferrer'>
                  {article.title} {/* Affiche le titre de l'article */}
                </a>
              </li>
            ))}
        </ul>
      </main>
      <footer>oeoeoeoeoeoeo</footer>
    </div>
  )
}
