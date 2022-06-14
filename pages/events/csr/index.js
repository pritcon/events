import { useRouter } from 'next/router'
import { useState } from "react";
import useSWR from 'swr'
import { SITE_NAME, SITE_URL, HOME_OG_IMAGE_URL } from '@lib/constants'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Layout from '@templates/layout'
import PostTitle from '@molecules/post/post-title'
import SearchFilter from '@molecules/components/search-filter'
import FilteredEvents from '@molecules/components/filtered-events'

import { getFilteredEvents, getAllFilterOptions, getFilteredEventsStrapi, getAllFilterOptionsStrapi } from '@lib/api'

export default function Events({ preview, defaultEvents, filterOptions }) {
  const router = useRouter()

  const [filter, setFilter] = useState(null)

  if (!router.isFallback && !defaultEvents) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <div className="c-filter__wrapper l-wrap l-container">
          {/* <article>
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
          </article> */}

          {filterOptions && (
            <SearchFilter filterOptions={filterOptions} setFilter={setFilter}></SearchFilter>
          )}

          {defaultEvents ? (
            <FilteredEvents filter={filter} initialData={defaultEvents} />
          ) : (
            <div>failed to load</div>
          )}


        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {

  return {
    props: {
      preview,
      defaultEvents: await getFilteredEventsStrapi({p:1}),
      filterOptions: await getAllFilterOptionsStrapi(),
    },
    revalidate: 1 // change this
  }
}

