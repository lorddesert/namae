
export default function Noteapp() {

  async function createNote(e: any) {
    e.preventDefault()
    const [titleInput, bodyInput] = e.target
    const title = titleInput.value
    const body = bodyInput.value

    const newNoteData = JSON.stringify({
      title,
      body
    })

    const response = await fetch('/api/createNote', {
      method: "POST",
      body: newNoteData
    })

    const data = await response.json()

    console.log(data)

    // await fetch('/api/getNotes')
  }

  return <form onSubmit={createNote}>
    <section>
      <label htmlFor="note-title">
        Note title
        <input type="text" name="note-title" />
      </label>
    </section>
    <section>
      <label htmlFor="note-body">
        Content
        <textarea name="note-body" id="note-body" cols={30} rows={10} />
      </label>
    </section>
    <button type="submit">Create note</button>
  </form>

}