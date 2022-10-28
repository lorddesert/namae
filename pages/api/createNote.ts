// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  newNotes: Note[]
}

type Note = {
  title: string,
  body: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const noteData = JSON.parse(req.body)
  const notes = localStorage.getItem('notes')
  const parsedNotes: Note[] = JSON.parse(notes ?? '[]')
  const newNotes: Note[] = [...parsedNotes, noteData]


 localStorage.setItem('notes', JSON.stringify(newNotes))
 res.status(200).json({ newNotes })
}
