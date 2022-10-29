import Head from 'next/head'
import { Suspense } from 'react'
import Noteapp from '../components/Noteapp'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Suspense fallback={"Loading........."}>
      <Noteapp />
    </Suspense>
    </div>
  )
}
