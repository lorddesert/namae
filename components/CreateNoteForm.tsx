// import { trpc } from '../utils/trpc';
// import { Note } from '../pages/api/create-notes';
import Button from './Button';

export default function Noteapp() {

  async function createNote(e: any) {
    e.preventDefault()

    const [titleInput, bodyInput] = e.target.form
    const title: string = titleInput.value
    const body: string = bodyInput.value

    console.log(title, body)
    // setNotes(response)
  }

  return <>
    <form onSubmit={createNote} className=' border border-gray-500 p-5 rounded-md mt-60'>
      <section>
        <label htmlFor='note-title'>
          Note title
          <input type='text' name='note-title' />
        </label>
      </section>
      <section>
        <label htmlFor='note-body'>
          Content
          <textarea name='note-body' id='note-body' cols={30} rows={10} />
        </label>
      </section>
      <Button className='w-full' label='Create note' onClick={createNote} />
    </form>
  </>
}