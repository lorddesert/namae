import { trpc } from '../utils/trpc';
import { notesAtom } from './hooks/getNotes';
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import { TypeNote } from '../pages/api/create-notes';

// Components
import Button from './Button';
import Tokenfield from './Tokenfield';

export default function CreateNoteForm() {
  // State
  const noteMutation = trpc.createNote.useMutation()
  const [_, setNotes] = useAtom(notesAtom)
  const [tags, setTags] = useState([])

  // Effects
  useEffect(() => {
    if (!noteMutation.data) return

    const newNotes: TypeNote[] = noteMutation.data

    if (!noteMutation.isLoading)
      //@ts-ignore
      setNotes(newNotes)

  }, [noteMutation.isLoading, noteMutation.data, setNotes])

  useEffect(() => {
    const form = document.querySelector('#create-note-form')
    if (!form) return


    form.addEventListener('keydown', watchForEnter)
    return () => {
      form.removeEventListener('keydown', watchForEnter)
    }
  }, [])

  // Actions
  async function createNote(e: any) {
    e.preventDefault()
    e.stopPropagation()

    const form = e.target
    const [titleInput, bodyInput] = form
    const title: string = titleInput.value
    const body: string = bodyInput.value
    noteMutation.mutate({ title, body, tags })

    setTags([])
    form.reset()
    form.elements[0].focus()
  }

  function watchForEnter(event: any) {
    const addTagBtn: HTMLButtonElement | null = document.querySelector('button[name=add-tag-btn]')
    if (event.target.name === 'tag-input' && event.key === 'Enter') {
      if (!addTagBtn) return
      event.preventDefault()
      addTagBtn.click()
    }
  }

  return <>
    <form id='create-note-form' onSubmit={createNote} className=' max-w-[350px] text-slate-200 border border-slate-900 p-5 rounded-md mt-5 mx-auto'>
      <section>
        <label htmlFor='note-title'>
          Note title
          <input type='text' name='note-title' required placeholder='A nice title...' />
        </label>
      </section>
      <section>
        <label htmlFor='note-body'>
          Content
          <textarea placeholder='Dear diary...' name='note-body' id='note-body' cols={3} rows={5} required className='p-1' />
        </label>
      </section>
      <Tokenfield tags={tags} setTags={setTags} />
      <Button name='Create note button' type='submit' className='w-full' label='Create note' />
    </form>
  </>
}