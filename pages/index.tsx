import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CreateNoteForm from '../components/CreateNoteForm'
import Notes from '../components/Notes'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateNoteForm />
      <Notes />
    </>
  )
}
