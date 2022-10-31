import { readFileSync, writeFileSync } from 'fs';
import { z } from 'zod';
import { TypeNote } from '../../pages/api/create-notes';
import { publicProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events'

const ee = new EventEmitter()


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
        title: z.string(),
        body: z.string()
      })
    )
    .mutation((req) => {
      const { input } = req
      const { title, body } = input
      const notes = JSON.parse(readFileSync('./notes.json').toString())

      const newNote: TypeNote = {
        id: globalThis.crypto.randomUUID(),
        title,
        body
      }

      const response = [...notes, newNote]

      writeFileSync('./notes.json', JSON.stringify(response))

      return response
    }),
  onAdd: publicProcedure.subscription(() => {
    return observable((emit) => {
      const onAdd = (data: TypeNote) => {
        emit.next(data)
      }

      ee.on('add', onAdd)


      return () => {
        ee.off('add', onAdd)
      }
    })
  })

});

// export type definition of API
export type AppRouter = typeof appRouter;