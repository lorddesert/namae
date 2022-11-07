import { trpc } from "../../utils/trpc"
import { useRouter } from 'next/router'
import Tag from "../../components/Tag"
export default function NoteById() {
  const router = useRouter()
  const { id } = router.query
  if (!id) return <>Loading...</>

  if (Array.isArray(id)) return <>Loading...</>

  const { data, isLoading } = trpc.getNoteById.useQuery(id)

  if (!data) return <>Loading...</>

  const { title, body, tags } = data

  return <>
    <pre>
      {
        JSON.stringify(data)
      }
    </pre>

    <article>
      <header>
        <h1>{title}</h1>
        <ul>
          {tags.map((tag, i) => <Tag key={`tag-${i}`} text={tag} />)}
        </ul>
      </header>
      <main>
        {body}
      </main>
      <footer>
        Comentarios? :3
      </footer>
    </article>
  </>
}