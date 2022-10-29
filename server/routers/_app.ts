import { readFileSync } from 'fs';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  getNotes: publicProcedure
    .query(() => {
      const data = JSON.parse(readFileSync('./notes.json').toString())

      return {
        notes: data
      };
    }),

});

// export type definition of API
export type AppRouter = typeof appRouter;