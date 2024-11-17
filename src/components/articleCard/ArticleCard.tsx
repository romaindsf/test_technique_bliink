import styles from './_articleCard.module.scss'
import Link from 'next/link'
interface ArticleCardProps {
  urlToImage: string
  title: string
  publishedAt?: Date
  nameURL: string
}

export default function ArticleCard({
  nameURL,
  urlToImage,
  title,
  publishedAt,
}: ArticleCardProps) {
  return (
    <Link href={nameURL}>
      <article className={styles.articleCard}>
        {/* ne peut pas utiliser <Image />, doit vérifier chaque hôte autorisés pour charger des images externes */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlToImage}
          alt={`Image de couverture de l'article : ${title}`}
        />
        <div className={styles.articleCard__info}>
          {publishedAt && <p>{new Date(publishedAt).toLocaleDateString()}</p>}
          <h2>{title}</h2>
        </div>
      </article>
    </Link>
  )
}
