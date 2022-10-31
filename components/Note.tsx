import { TypeNote } from "../pages/api/create-notes";

export default function Note({ title, body }: TypeNote) {
  return <article className=" text-slate-200 border rounded-md border-slate-700 p-2 m-2">
    <h4 className=" text-2xl mb-4">{title}</h4>
    <p className=" text-lg">{body}</p>
  </article>
}