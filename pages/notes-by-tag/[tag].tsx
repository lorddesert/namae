import { trpc } from "../../utils/trpc"
import { useRouter } from 'next/router'
import Note from "../../components/Note"
export default function NotesByTag() {
  const router = useRouter()
  const { tag } = router.query


  if (!tag) return <>Loading...</>

  let selectedTag = tag

  if (Array.isArray(tag))
    selectedTag = tag[0]

  const { data, isLoading } = trpc.getNotesByTag.useQuery(selectedTag)

  if (!data) return <>Loading...</>

  return <>

    <main className="max-w-lg flex flex-col items-center gap-4 p-2 bg-zinc-900 min-w-[45vw] text-slate-200" style={{
      gridTemplateRows: 'auto 1fr auto'
    }}>
      {data.map(note => <Note hideButtons className="flex-1 min-w-full border border-solid aspect-auto border-zinc-800" key={note.id} {...note} />)}
    </main>
  </>
}