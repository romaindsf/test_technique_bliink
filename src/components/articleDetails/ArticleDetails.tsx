import styles from './_articleDetails.module.scss'
import { Article } from '@/context/Context'
import HomePageButton from '../homePageButton/HomePageButton'

export default function ArticleDetails({
  article,
}: {
  article: Article | null
}) {
  return (
    <>
      <h1 className={styles.article_container__title}>
        {article?.title ?? 'Article indisponible'}
      </h1>
      <div className={styles.article_container}>
        {article?.publishedAt && (
          <div>
            <p>
              {' '}
              <strong>Publié le:</strong>{' '}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p>{article?.description}</p>
          </div>
        )}
        {article?.urlToImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.article_container__img}
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <p>{article?.content}</p>
        <p>
          <strong>Source:</strong> {article?.source?.name}
        </p>
        <div className={styles.article_container__link__div}>
          <a
            className={styles.article_container__linksrc}
            href={article?.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Lire l&apos;article complet
          </a>
          <HomePageButton />
        </div>
      </div>
    </>
  )
}
