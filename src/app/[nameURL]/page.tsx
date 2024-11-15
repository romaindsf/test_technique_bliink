'use client'

import ArticleDetails from '@/components/articleDetails/ArticleDetails'
import useArticleLogic from '@/hooks/useCombinedArticleList'
import useSelectedArticle from '@/hooks/useSelectedArticle'
import { useParams } from 'next/navigation'

export default function ArticlePage() {
  // Récupère le paramètre 'nameURL' de l'URL
  const { nameURL } = useParams<{ nameURL: string }>()
  // Liste d'articles listé dans un array simple:
  const articleList = useArticleLogic()
  //sélection de l'article en question à partir de l'URL.
  const selectedArticle = useSelectedArticle(nameURL, articleList)

  return <ArticleDetails article={selectedArticle} />
}
