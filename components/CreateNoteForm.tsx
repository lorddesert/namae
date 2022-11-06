import { trpc } from '../utils/trpc';
import Button from './Button';
import { notesAtom } from './hooks/getNotes';
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import { TypeNote } from '../pages/api/create-notes';
import Tokenfield from './Tokenfield';

export default function CreateNoteForm() {
  const noteMutation = trpc.createNote.useMutation()
  const [_, setNotes] = useAtom(notesAtom)
  const [tags, setTags] = useState([])

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

    noteMutation.mutate({ title, body, tags: [] })

    form.reset()
    form.elements[0].focus()
  }

  return <>
    <form onSubmit={createNote} className=' max-w-[350px] text-slate-200 border border-slate-900 p-5 rounded-md mt-10 mx-auto'>
      <section>
        <label htmlFor='note-title'>
          Note title
          <input type='text' name='note-title' required placeholder='A nice title...' />
        </label>
      </section>
      <section>
        <label htmlFor='note-body'>
          Content
          <textarea placeholder='Dear diary...' name='note-body' id='note-body' cols={30} rows={10} required className='p-1' />
        </label>
      </section>
      <section>
        <label htmlFor='note-tags'>
          <Tokenfield setFormTags={setTags} />
        </label>
      </section>
      <Button type='submit' className='w-full' label='Create note' />
    </form>
  </>
}