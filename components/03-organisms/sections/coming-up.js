import Block from '@molecules/blocks/block'

export default function ComingUp({ posts }) {
  return (
    <section className="c-coming-up u-spacing--triple">
      <h2 className="c-coming-up__title">Coming up</h2>
      <div className="c-coming-up__grid">
        {posts.map((post) => (
          <Block
            key={post.slug}
            title={post.title}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
