import { useRouter } from 'next/router'
import { SITE_NAME, SITE_URL, HOME_OG_IMAGE_URL } from '@lib/constants'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Layout from '@templates/layout'
import ComingUp from '@organisms/sections/coming-up'
import PostTitle from '@molecules/post/post-title'
import PostHeader from '@molecules/post/post-header'
import PostBody from '@molecules/post/post-body'

//import { getAllPostsWithSlug, getPostAndUpcomingEvents } from '@lib/api'

export default function Post({ post, upcomingEvents, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {post.title} | {SITE_NAME}
              </title>
              <meta property="og:image" content={post.image.url} />
            </Head>
            <PostHeader
              title={post.title}
              image={post.image}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
          {upcomingEvents && upcomingEvents.length > 0 && (
            <ComingUp posts={upcomingEvents} />
          )}
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  //const data = await getPostAndUpcomingEvents(params.slug, preview)

  return {
    props: {
      preview,
      post: data?.post ?? null,
      upcomingEvents: data?.upcomingEvents ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = null //await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  }
}
