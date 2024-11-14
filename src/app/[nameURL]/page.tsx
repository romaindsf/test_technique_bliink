'use client'

import { Article, useAppContext } from '@/context/Context'
import Link from 'next/link'
import styles from './_articlePage.module.scss'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ArticlePage() {
  // Récupère les articles sauvegardés depuis le contexte
  const { savedArticles } = useAppContext()
  // Récupère le paramètre 'nameURL' de l'URL
  const { nameURL } = useParams<{ nameURL: string }>()
  // Liste d'articles fusionnée et article sélectionné
  const [articleList, setArticleList] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Effectue la fusion des articles sauvegardés pour mettre à jour la liste
  useEffect(() => {
    const mergedArticleList: Article[] = []
    // ArticleList est un tableau simple de tous les articles
    // Plus de catégories qui les séparent
    for (const key in savedArticles) {
      if (savedArticles.hasOwnProperty(key)) {
        mergedArticleList.push(...savedArticles[key])
      }
    }
    setArticleList(mergedArticleList)
  }, [savedArticles])

  // Recherche de l'article correspondant à 'nameURL' dans la liste d'articles
  useEffect(() => {
    if (nameURL) {
      // Décoder le 'nameURL' pour résoudre les problèmes d'encodage (ex : apostrophes)
      // const decodedNameURL = decodeURIComponent(nameURL)
      const articleFound = articleList.find(
        (article) =>
          decodeURIComponent(article.nameURL) === decodeURIComponent(nameURL)
      )
      setSelectedArticle(articleFound || null)
    }
  }, [nameURL, articleList]) // Ce useEffect s'exécute lorsque 'nameURL' ou 'articleList' changent

  // useEffect(() => {
  //   console.log(nameURL)
  //   console.log(articleList)
  //   console.log(selectedArticle)
  // }, [articleList, nameURL, selectedArticle])

  return (
    <>
      <h1 className={styles.article_container__title}>
        {selectedArticle?.title}
      </h1>
      <div className={styles.article_container}>
        {selectedArticle?.publishedAt && (
          <div>
            <p>
              {' '}
              <strong>Publié le:</strong>{' '}
              {new Date(selectedArticle.publishedAt).toLocaleDateString()}
            </p>
            <p>{selectedArticle?.description}</p>
          </div>
        )}
        {selectedArticle?.urlToImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.article_container__img}
            src={selectedArticle.urlToImage}
            alt={selectedArticle.title}
          />
        )}

        <p>{selectedArticle?.content}</p>
        <p>
          {' '}
          <strong>Source:</strong> {selectedArticle?.source?.name}
        </p>
        <div className={styles.article_container__link__div}>
          <a
            className={styles.article_container__linksrc}
            href={selectedArticle?.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Lire l&apos;article complet
          </a>
          <Link href='/' className={styles.return_link}>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </>
  )
}
