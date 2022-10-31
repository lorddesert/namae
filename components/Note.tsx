import { TypeNote } from "../pages/api/create-notes";

export default function Note({ title, body }: TypeNote) {
  return <article className="">
    <h4>{title}</h4>
    <p>{body}</p>
  </article>
}