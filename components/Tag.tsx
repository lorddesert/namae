export default function Tag({ text }: { text: string }) {
  return <li>
    <button className={`px-1 text-indigo-500 rounded-sm text-xs text-bold w-fit bg-slate-900`}>
      {text}
    </button>
  </li>

}