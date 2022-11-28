import { trpc } from "../../utils/trpc"
import { useRouter } from 'next/router'
import Button from "../../components/Button"

// Components
import Tag from "../../components/Tag"
import Link from 'next/link'

export default function NoteById() {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <>Loading...</>

  if (Array.isArray(id)) return <>Loading...</>

  const { data, isLoading } = trpc.getNoteById.useQuery(id)

  if (!data) return <>Loading...</>

  const { title, body, tags } = data

  return <>

    <article className="max-w-lg grid gap-4 p-2 bg-zinc-900 min-h-[250px] text-slate-200" style={{
      gridTemplateRows: 'auto 1fr auto'
    }}>
      <header>
      <Link href='/' >
        <Button name="go back button" className="mb-2">
          Go back
        </Button>
      </Link>
        {/* We could change this to max-w-md */}
        <h1 className="mb-2 text-xl ">{title}</h1>
        <ul className="flex flex-wrap mt-2">
          {tags.map((tag, i) => <Tag key={`tag-${i}`} text={tag} />)}
        </ul>
      </header>
      <main className="text-sm">
        {body}
      </main>
      <footer className="w-full bg-slate-900">
        Comentarios? :3
      </footer>
    </article>
  </>
}