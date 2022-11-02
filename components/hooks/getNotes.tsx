import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { atom, useAtom } from "jotai";
import { TypeNote } from "../../pages/api/create-notes";

export type useGetNotesResponse = {
  notes: TypeNote[],
  isLoading: boolean
}

export const notesAtom = atom([])

export function useGetNotes() {
  const [notes, setNotes] = useAtom(notesAtom)
  const { isLoading, data } = trpc.getNotes.useQuery()

  useEffect(() => {

    if (!isLoading)
      setNotes(data?.notes)

  }, [data?.notes, isLoading, setNotes])

  const response: useGetNotesResponse = {
    notes,
    isLoading
  }

  return response
}

