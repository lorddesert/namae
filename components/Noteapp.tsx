import CreteNoteForm from './CreateNoteForm'
import Notes from './Notes';

export default function Noteapp() {

  async function createNote(e: any) {
    e.preventDefault()

    const [titleInput, bodyInput] = e.target.form
    const title: string = titleInput.value
    const body: string = bodyInput.value

    console.log(title, body)
  }

  return <>
    <CreteNoteForm />
    <Notes />
  </>
}