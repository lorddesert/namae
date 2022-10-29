// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeFile, readFileSync, readFile, writeFileSync } from 'fs'

type Data = {
  notes?: Note[],
  errorMsg?: string
}

export type Note = {
  title: string,
  body: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let notes: Note[]
  try {
     const savedNotes = readFileSync('./notes.json')
     const {notes: allNotes} = JSON.parse(savedNotes.toString())

     notes = [...allNotes]
  } catch (e) {
    console.log(e)
    notes = []
  }
    const newNote = JSON.parse(req.body)

    const newNotes: Note[] = [...notes, newNote]

    writeFileSync('./notes.json', JSON.stringify({
      notes: newNotes
    }))

    res.status(200).json({ notes: newNotes })
}