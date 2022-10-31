import { Note } from "../pages/api/create-notes"
import { trpc } from "../utils/trpc"

export default function Notes() {

  const allNotes = trpc.getNotes.useQuery()
  const notes: Note[] = allNotes.data?.notes
  
  if (!notes) return <h1>Loading...</h1>

  return <>
    <ul>
      {notes.map((note, i: number) => <li key={`note-${i}`}>
        <h4>{note.title}</h4>
        <p>{note.body}</p>
      </li>)}
    </ul>
  </>
}
