import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function PostBody({ content }) {
  return (
    <div className="o-post-body">
      {documentToReactComponents(content.json)}
    </div>
  )
}
