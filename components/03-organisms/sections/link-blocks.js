import BlockLink from '@molecules/blocks/block-link'

export default function LinkBlocks({ posts }) {
  return (
    <section className="c-link-blocks">
      {posts.map((post) => (
        <BlockLink
          key={post.key}
          title={post.title}
          link={post.link}
        />
      ))}
    </section>
  )
}
