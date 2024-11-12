// Fonction asynchrone pour récupérer les gros titres depuis l'API NewsAPI
export default async function getHeadlines() {
  try {
    // Envoi de la requête GET vers l'API pour récupérer les gros titres
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=76eb36c3d0214c588752b68097e38125&pageSize=20'
    )

    // Vérification si la réponse est réussie (code HTTP 200-299)
    if (!response.ok) {
      // Si la réponse a échoué, on génère une erreur avec le code et le message d'erreur
      throw new Error(`Erreur : ${response.status} - ${response.statusText}`)
    }

    // Conversion de la réponse en format JSON
    const data = await response.json()

    // Vérification que le champ 'articles' existe dans la réponse
    if (!data.articles) {
      // Si aucun article n'est présent, on génère une erreur
      throw new Error('Aucun article trouvé dans la réponse')
    }

    // Si tout est bon, on retourne les articles
    return data.articles
  } catch (error: unknown) {
    // Gestion des erreurs: On attrape toutes les erreurs possibles

    // Si il y a erreur, on l'affiche dans la console pour le débogage
    console.error('Erreur lors de la récupération des articles :', error)

    // On lance une nouvelle erreur avec un message générique pour l'utilisateur final
    // On lui indique qu'une erreur est survenue et qu'il peut réessayer plus tard
    throw new Error(
      'Échec de la récupération des gros titres. Veuillez réessayer plus tard.'
    )
  }
}
