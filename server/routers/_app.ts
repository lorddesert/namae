import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { z } from 'zod';
import { TypeNote } from '../../pages/api/create-notes';
import { publicProcedure, router } from '../trpc';
// import { observable } from '@trpc/server/observable';
// import { EventEmitter } from 'events'

// const ee = new EventEmitter()


export const appRouter = router({
  getNotes: publicProcedure
    .query(() => {
      const data = JSON.parse(readFileSync('./notes.json').toString())

      return {
        notes: data
      };
    }),
  createNote: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1),
        body: z.string().trim().min(1)
      })
    )
    .mutation((req) => {
      const { input } = req
      const { title, body } = input
      const notes = JSON.parse(readFileSync('./notes.json').toString())

      const newNote: TypeNote = {
        id: randomUUID(),
        title,
        body
      }

      const response = [...notes, newNote]

      writeFileSync('./notes.json', JSON.stringify(response))

      return response
    }),

});

// export type definition of API
export type AppRouter = typeof appRouter;