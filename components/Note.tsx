import { TypeNote } from "../pages/api/create-notes";
import Button from "./Button";
import { trpc } from "../utils/trpc";
import { notesAtom } from "./hooks/getNotes";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Tags from "./Tags";
import Link from "next/link";

interface Note extends TypeNote {
  className?: string,
  hideButtons?: boolean
}

export default function Note({ hideButtons = false, id, title, body, tags, className }: Note) {
  const noteMutation = trpc.deleteNote.useMutation()

  const [_, setNotes] = useAtom(notesAtom)

  function deleteNote() {
    noteMutation.mutate({ id })
  }
  useEffect(() => {
    if (!noteMutation.data) return

    const newNotes: TypeNote[] = noteMutation.data

    if (!noteMutation.isLoading)
      //@ts-ignore
      setNotes(newNotes)

  }, [noteMutation.isLoading, noteMutation.data, setNotes])

  return <article className={` ${className} p-2 m-2 mx-1 pt-1 min-w-[200px] max-w-[250px] border rounded-md aspect-video text-slate-200 border-slate-900 flex flex-col gap-3`}>
    <header className="w-full capitalize">
      <h4 className="text-lg ">{title}</h4>
      <Tags tags={tags} />
    </header>
    <main>
      <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">{body}</p>
    </main>
    {!hideButtons &&
      <footer className="flex flex-col gap-2">
        <Link href={`/notes/${id}`} className="w-full">
          <Button name="go-to-details" label="Details" className="w-full text-sm" />
        </Link>

        <Button
          name="delete-note-button"
          label="Delete"
          className="flex-1 p-1 text-sm border-none bg-rose-800 text-slate-200 hover:bg-rose-600 focus:bg-rose-600"
          onClick={deleteNote}
        />
      </footer>
    }
  </article>
}