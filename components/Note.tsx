import { TypeNote } from "../pages/api/create-notes";

function Tag() {
  return <li>
    <button className={`px-1 text-indigo-500 rounded-sm text-xs text-bold w-fit`}>
      Tag
    </button>
  </li>

}

export default function Note({ title, body }: TypeNote) {
  return <article className="p-2 m-2 min-w-[200px] max-w-[250px] border rounded-md aspect-video text-slate-200 border-slate-700">
    <header className="w-full mb-4">
      <h4 className="text-2xl ">{title}</h4>
      <section>
        <ul className="flex flex-wrap gap-1">
          {Array(4).fill(null).map((_, i) => <Tag key={`item-${i}`} />)}
        </ul>
      </section>
    </header>
    <p className="text-lg ">{body}</p>
  </article>
}