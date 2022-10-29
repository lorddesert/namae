// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeFile, readFileSync, readFile, writeFileSync } from 'fs'

type Data = {
  notes?: Note[],
  errorMsg?: string
}

type Note = {
  title: string,
  body: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = readFileSync('./notes.json')
    const notes = JSON.parse(data.toString())

    res.status(200).json(notes)
  } catch (error) {
    console.log(error)

    res.status(400).send({errorMsg: 'Something went worng, please try again later'})
  }
}