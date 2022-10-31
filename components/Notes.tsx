import { TypeNote } from "../pages/api/create-notes"
import { trpc } from "../utils/trpc"
import Note from "./Note"

export default function Notes() {

  const allNotes = trpc.getNotes.useQuery()
  const notes: TypeNote[] = allNotes.data?.notes

  if (!notes) return <h1>Loading...</h1>

  return <>
    <ul className="grid grid-cols-3 ">
      {notes.map(({ id, title, body }) => <li key={`note-${id}`}>
        <Note {...{ id, title, body }} />
      </li>)}
    </ul>
  </>
}
