import Tag from "./Tag"

export default function Tags({ tags }: { tags: string[] }) {
  console.log(tags)
  return <section>
    <ul className="flex flex-wrap gap-1">
      {tags.map((text, i) => <Tag key={`item-${i}`} text={text} />)}
    </ul>
  </section>
}