import { TypeNote } from "../pages/api/create-notes";
import Button from "./Button";
import { trpc } from "../utils/trpc";
import { notesAtom } from "./hooks/getNotes";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Tags from "./Tags";

export default function Note({ id, title, body, tags }: TypeNote) {
  const noteMutation = trpc.deleteNote.useMutation()

  const [_, setNotes] = useAtom(notesAtom)

  function deleteNote() {
    noteMutation.mutate({ id })
  }
  useEffect(() => {
    console.log('new data: ', noteMutation.data)
    if (!noteMutation.data) return

    const newNotes: TypeNote[] = noteMutation.data

    if (!noteMutation.isLoading)
      //@ts-ignore
      setNotes(newNotes)

  }, [noteMutation.isLoading, noteMutation.data, setNotes])

  return <article className="p-2 m-2 mx-1 pt-1 min-w-[200px] max-w-[250px] border rounded-md aspect-video text-slate-200 border-slate-900 flex flex-col gap-2">
    <header className="w-full capitalize">
      <h4 className="text-2xl ">{title}</h4>
      <Tags tags={tags} />
    </header>
    <main>
      <p className="text-lg ">{body}</p>
    </main>
    <footer className="flex">
      <Button
        label="Delete"
        className="flex-1 p-1 text-sm border-none bg-rose-800 text-slate-200 hover:bg-rose-600 focus:bg-rose-600"
        onClick={deleteNote}
      />
    </footer>
  </article>
}