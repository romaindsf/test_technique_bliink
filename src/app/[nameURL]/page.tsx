'use client'

import { Article, useAppContext } from '@/context/Context'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ArticlePage() {
  const { savedArticles } = useAppContext()
  const { nameURL } = useParams()
  const [articleList, setArticleList] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  useEffect(() => {
    const mergedArray: Article[] = []
    for (const key in savedArticles) {
      if (savedArticles.hasOwnProperty(key)) {
        // Combine the articles corresponding to each key
        mergedArray.push(...savedArticles[key])
      }
    }
    // Update the article list state with the merged array
    setArticleList(mergedArray)
  }, [savedArticles]) // Dependency on savedArticles so it runs when it changes

  useEffect(() => {
    if (nameURL) {
      const articleFound = articleList.find(
        (article) => article.nameURL === nameURL
      )
      setSelectedArticle(articleFound || null) // Mise à jour de l'article sélectionné
    }
  }, [nameURL, articleList])

  useEffect(() => {
    console.log(nameURL)
    console.log(articleList)
    console.log(selectedArticle)

    // Additional logic based on nameURL can be added here
  }, [articleList, nameURL, selectedArticle]) // This effect runs when nameURL changes
  return (
    <>
      <h1>Nom de l&apos;article: {selectedArticle?.title} </h1>
      <Link href='/'>retour acceuil</Link>
    </>
  )
}
