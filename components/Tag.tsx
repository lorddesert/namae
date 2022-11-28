import Link from "next/link"
export default function Tag({ text }: { text: string }) {
  return <li>
    <Link href={`/notes-by-tag/${text}`} tabIndex={-1}>
      <button tabIndex={-1} className={`px-1 text-indigo-500 rounded-sm text-xs text-bold w-fit bg-slate-900 hover:text-indigo-400 hover:underline`}>
        {text}
      </button>
    </Link>
  </li>

}