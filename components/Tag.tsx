export default function Tag({ text }: { text: string }) {
  return <li>
    <button tabIndex={-1} className={`px-1 text-indigo-500 rounded-sm text-xs text-bold w-fit bg-slate-900 hover:text-indigo-400 hover:underline`}>
      {text}
    </button>
  </li>

}