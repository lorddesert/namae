import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { z } from 'zod';
import { TypeNote } from '../../pages/api/create-notes';
import { publicProcedure, router } from '../trpc';

function getNotesJSON() {
  const data: TypeNote[] = JSON.parse(readFileSync('./notes.json').toString())

  return data
}

function getTagsJSON() {
  const data: string[] = JSON.parse(readFileSync('./tags.json').toString())

  return data
}

export const appRouter = router({
  getNotes: publicProcedure
    .query(() => {
      const data = getNotesJSON()

      return {
        notes: data
      };
    }),
  getNotesByTag: publicProcedure
    .input(z.string())
    .query((req) => {
      const { input: selectedTag } = req
      const notes = getNotesJSON()

      console.log(selectedTag)

      const filteredNotes = notes.filter(note => note.tags.includes(selectedTag))

      return filteredNotes
    }),
  getNoteById: publicProcedure
    .input(z.string())
    .query((req) => {
      const notes = getNotesJSON()
      const { input } = req
      const selectedNote = notes.find(note => note.id === input)

      return selectedNote
    }),
  createNote: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1),
        body: z.string().trim().min(1),
        tags: z.array(
          z.string()
        )
      })
    )
    .mutation((req) => {
      const { input } = req
      const { title, body, tags: noteTags } = input
      const notes = getNotesJSON()
      const allTags = getTagsJSON()
      const newTags: string[] = []

      noteTags.forEach(tag => {
        if (!allTags.includes(tag))
          newTags.push(tag)
      })

      newTags.concat(allTags)

      const newNote: TypeNote = {
        id: randomUUID(),
        title,
        body,
        tags: newTags
      }

      const response = [...notes, newNote]

      writeFileSync('./notes.json', JSON.stringify(response))
      writeFileSync('./tags.json', JSON.stringify(newTags))

      return response
    }),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation((req) => {
      const { input } = req
      const { id } = input
      const notes = getNotesJSON()

      const filteredNotes = notes.filter(note => note.id !== id)

      writeFileSync('./notes.json', JSON.stringify(filteredNotes))

      return filteredNotes
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;