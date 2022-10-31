import { TypeNote } from "../pages/api/create-notes";

export default function Note({ title, body }: TypeNote) {
  return <article className=" text-slate-800 border rounded-md border-slate-700 p-2 m-2">
    <h4>{title}</h4>
    <p>{body}</p>
  </article>
}