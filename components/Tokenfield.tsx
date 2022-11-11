'use client'
import { useState } from "react"
import Button from "./Button"
import Tags from "./Tags"

export default function Tokenfield({ tags, setTags }: { tags: string[], setTags: any }) {

  function addTag(e: any) {
    e.preventDefault()
    const tagInput = document.querySelector('input[name="tag-input"]')
    // @ts-ignore
    const newTag: string = tagInput.value

    if (!newTag.trim()) return

    const newTags = [...tags, newTag]

    // @ts-ignore
    setTags(newTags)

    // @ts-ignore
    tagInput.value = ""
    // @ts-ignore
    tagInput.focus()
  }
  return <section className="py-2" >
    <label htmlFor="note-tags" style={{ gap: 0 }}>

      Add tags
      <span className="mt-1 text-xs italic text-slate-400">You can press Enter to create a tag!</span>
      <div className="flex items-center gap-3 mt-1">
        <input placeholder="BLAZING!" className="flex-1 placeholder:italic" type="text" name="tag-input" id="note-tags" />
        <Button
          name='add-tag-btn'
          label="Add ✖️"
          onClick={addTag}
          className="h-full bg-zinc-800 border-zinc-800 hover:bg-zinc-700 hover:border-zinc-700 focus:bg-zinc-700 focus:border-zinc-700" 
        />

      </div>
    </label>

    <ul className="flex flex-wrap gap-1">
      <Tags tags={tags} />
    </ul>
  </section>
}