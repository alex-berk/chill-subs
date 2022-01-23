import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer';
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lit Mag Finder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <div className={styles.logo}>
          chill subs
        </div>
      </Link>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Find the right home for your writing
        </h1>

        <p className={styles.description}>
          (without wasting too much energy, losing your shit and hating yourself for being unproductive)
        </p>

        <div className={styles.buttons}>
          <Link href="/browse">
            <button className={styles.searchBtn}>
              <Image src="/search.svg" alt="Search icon" width={24} height={24} />
              Browse magazines
            </button>
          </Link>
          <button className={styles.aboutBtn}>About the project</button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
