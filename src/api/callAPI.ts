const url = 'https://newsapi.org/v2/top-headlines'
const country = 'us'
const apiKey = 'c5765a965b0d465ca4d532d91a1633bd'

// Fonction asynchrone pour récupérer les titres phares depuis l'API NewsAPI:

export async function callTopHeadlines() {
  try {
    // Envoi de la requête GET vers l'API pour récupérer les gros titres
    const response = await fetch(`${url}?country=${country}&apiKey=${apiKey}`)

    // Vérification du status de la requête
    if (!response.ok) {
      // Si la réponse a échoué:
      throw new Error(`Erreur : ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    // Vérification que le champ 'articles' existe dans la réponse
    if (!data.articles || data.articles.length === 0) {
      throw new Error('Aucun article trouvé dans la réponse')
    }

    // Si tout est bon, on retourne les articles
    return data.articles
  } catch (error: unknown) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération des articles :', error)
    throw new Error(
      'Échec de la récupération des articles. Veuillez réessayer plus tard.'
    )
  }
}

// Fonction asynchrone pour récupérer les articles
// appartenant a la catégorie ciblée :
export async function callSelectedCategory(category: string) {
  try {
    // la requête contient le paramètre category
    const response = await fetch(
      `${url}?country=${country}&category=${category}&apiKey=c5765a965b0d465ca4d532d91a1633bd`
    )
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.articles) {
      throw new Error('Aucun article trouvé dans la réponse')
    }

    return data.articles
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des articles :', error)
    throw new Error(
      'Échec de la récupération des articles. Veuillez réessayer plus tard.'
    )
  }
}
