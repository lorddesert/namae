import { TypeNote } from "../pages/api/create-notes"
import Note from "./Note"
import { useGetNotes } from "./hooks/getNotes"
import Image from "next/image"

export default function Notes() {
  const {notes, isLoading} = useGetNotes()
  
  if (isLoading) return <h1>Loading...</h1>

  if (!notes.length) return <div className="flex items-center justify-center w-full gap-4 text-center">
  <h3>No notes found</h3>
  <Image src='/neko.svg' alt="not found neko" width={50} height={50}  />
  </div>

  return <>
    <ul className="grid grid-cols-3 ">
      {notes.map(({ id, ...note }: TypeNote) => <li key={`note-${id}`}>
        <Note {...{ id, ...note }} />
      </li>)}
    </ul>
  </>
}
