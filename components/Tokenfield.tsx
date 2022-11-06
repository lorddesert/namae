'use client'
import { useState } from "react"
import Button from "./Button"
import Tags from "./Tags"

export default function Tokenfield({ setFormTags }: { setFormTags: any }) {
  const [tags, setTags] = useState([])

  function addTag(e: any) {
    e.preventDefault()
    const newTag = document.querySelector('input[name="tag-input"]').value
    const newTags = [...tags, newTag]
    console.log(newTag)

    setTags(newTags)
  }
  return <section className="py-2" >
    <label htmlFor="note-tags">
      Add tags
      <input type="text" name="tag-input" id="note-tags" />
    </label>
    <Button label="Add ✖️" onClick={addTag} className="bg-zinc-800 border-zinc-800 hover:bg-zinc-700 hover:border-zinc-700 focus:bg-zinc-700 focus:border-zinc-700" />

    <ul className="flex flex-wrap gap-1">
      <Tags tags={tags} />
    </ul>
  </section>
}