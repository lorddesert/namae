import { trpc } from '../utils/trpc';
import Button from './Button';
import { notesAtom } from './hooks/getNotes';
import { useEffect } from 'react'
import { useAtom } from 'jotai';
import { TypeNote } from '../pages/api/create-notes';

export default function CreateNoteForm() {
  const noteMutation = trpc.createNote.useMutation()
  const [_, setNotes] = useAtom(notesAtom)

  useEffect(() => {
    console.log('new data: ', noteMutation.data)
    if (!noteMutation.data) return

    const newNotes: TypeNote[] = noteMutation.data

    if (!noteMutation.isLoading)
    //@ts-ignore
      setNotes(newNotes)

  }, [noteMutation.isLoading, noteMutation.data, setNotes])

  async function createNote(e: any) {
    e.preventDefault()

    const form = e.target
    const [titleInput, bodyInput] = form
    const title: string = titleInput.value
    const body: string = bodyInput.value

    noteMutation.mutate({ title, body })

    form.reset()
    form.elements[0].focus()
  }

  return <>
    <form onSubmit={createNote} className=' max-w-[350px] text-slate-200 border border-slate-700 p-5 rounded-md mt-60 mx-auto'>
      <section>
        <label htmlFor='note-title'>
          Note title
          <input type='text' name='note-title' required/>
        </label>
      </section>
      <section>
        <label htmlFor='note-body'>
          Content
          <textarea name='note-body' id='note-body' cols={30} rows={10} required />
        </label>
      </section>
      <Button type="submit" className='w-full' label='Create note' />
    </form>
  </>
}