// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeFile, readFileSync, readFile, writeFileSync } from 'fs'

type Data = {
  notes?: TypeNote[],
  errorMsg?: string
}

export type TypeNote = {
  id: string,
  title: string,
  body: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let notes: TypeNote[]
  try {
     const savedNotes = readFileSync('./notes.json')
     const {notes: allNotes} = JSON.parse(savedNotes.toString())

     notes = [...allNotes]
  } catch (e) {
    console.log(e)
    notes = []
  }
    const newNote = JSON.parse(req.body)

    const newNotes: TypeNote[] = [...notes, newNote]

    writeFileSync('./notes.json', JSON.stringify({
      notes: newNotes
    }))

    res.status(200).json({ notes: newNotes })
}