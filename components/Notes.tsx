import { TypeNote } from "../pages/api/create-notes"
import Note from "./Note"
import { useGetNotes } from "./hooks/getNotes"


export default function Notes() {
  const {notes, isLoading} = useGetNotes()
  
  if (isLoading) return <h1>Loading...</h1>

  if (!notes.length) return <h1>No notes found</h1>

  return <>
    <ul className="grid grid-cols-3 ">
      {notes.map(({ id, title, body }: TypeNote) => <li key={`note-${id}`}>
        <Note {...{ id, title, body }} />
      </li>)}
    </ul>
  </>
}
