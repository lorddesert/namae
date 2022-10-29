import { useState } from "react"
import { trpc } from '../utils/trpc';
import { Note } from "../pages/api/create-notes";

export default function Noteapp() {
  const allNotes = trpc.getNotes.useQuery()
  const [notes, setNotes] = useState(allNotes.data?.notes)

  async function createNote(e: any) {
    e.preventDefault()
    const [titleInput, bodyInput] = e.target
    const title: string = titleInput.value
    const body: string = bodyInput.value

    // setNotes(response)
  }

  if (!allNotes.data || !notes) return <h1>Loading...</h1>
  return <>
    <form onSubmit={createNote}>
      <section>
        <label htmlFor="note-title">
          Note title
          <input type="text" name="note-title" />
        </label>
      </section>
      <section>
        <label htmlFor="note-body">
          Content
          <textarea name="note-body" id="note-body" cols={30} rows={10} />
        </label>
      </section>
      <button type="submit">Create note</button>
    </form>

    <ul>
      {notes.map((note: Note, i: number) => <li key={`note-${i}`}>
        <h4>{note.title}</h4>
        <p>{note.body}</p>
      </li>)}
    </ul>
  </>
}