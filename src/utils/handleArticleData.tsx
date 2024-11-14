import { Article } from '@/context/Context'

export function handleArticleData(articles: Article[]): Article[] {
  // Empêcher l'affichage des articles incomplets ou supprimés
  return articles
    .filter(
      (article) =>
        article.title &&
        article.title !== '[Removed]' &&
        article.content &&
        article.content !== '[Removed]' &&
        article.urlToImage !== null
    )
    .map((article) => {
      // Génère la propriété 'nameURL' en basant sur le titre
      return {
        ...article, // Conserve toutes les propriétés de l'article
        nameURL: encodeURIComponent(
          //règle les problèmes d'encodage de l'URL
          article.title.toLowerCase().replace(/['\s]+/g, '-')
        ), // Ajoute 'nameURL'
      }
    })
}
