import { TypeNote } from "../pages/api/create-notes"
import { trpc } from "../utils/trpc"
import Note from "./Note"

export default function Notes() {

  const allNotes = trpc.getNotes.useQuery()
  const notes: TypeNote[] = allNotes.data?.notes
  
  if (!notes) return <h1>Loading...</h1>

  return <>
    <ul>
      {notes.map(({ title, body }, i: number) => <li key={`note-${i}`}>
        <Note {...{title, body}} />      </li>)}
    </ul>
  </>
}
