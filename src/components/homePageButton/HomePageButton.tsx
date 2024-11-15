import Link from 'next/link'
import styles from './_homePageButton.module.scss'

export default function HomePageButton() {
  return (
    <Link href='/' className={styles.return_link}>
      Retour à l&apos;accueil
    </Link>
  )
}
