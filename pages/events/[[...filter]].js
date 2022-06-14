import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { SITE_NAME, MAX_START_DATE_STRING } from '@lib/constants'
import { parseFilters, stringifyFilters } from '@lib/util'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Layout from '@templates/layout'
import PostTitle from '@molecules/post/post-title'
import SearchFilter from '@molecules/components/search-filter'
import SectionEventListing from '@organisms/sections/event-listing'


import { getFilteredEvents, getAllFilterOptions, getAllFilterOptionsStrapi, getFilteredEventsStrapi } from '@lib/api'

export default function Events({ upcomingEvents, preview, params, filterOptions }) {
  const router = useRouter()

  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeFilters = params?.filter ? parseFilters(params.filter[0]) : {};
  const prevEventsPath = activeFilters.startDate != MAX_START_DATE_STRING ? JSON.parse(JSON.stringify(activeFilters)) : null;

  if (prevEventsPath) {
    prevEventsPath.startDate = [MAX_START_DATE_STRING]
    delete prevEventsPath.p
  }

  const refreshData = (p) => {
    router.push(`/events/${p}`);
    setIsRefreshing(true);
  }

  const handlePage = (direction) => {
    if (direction == 'prev') {
      activeFilters.p = activeFilters.p > 1 ? [~~activeFilters.p[0] - 1] : [1]
      refreshData(stringifyFilters(activeFilters))
    }
    else {
      activeFilters.p = activeFilters.p > 1 ? [~~activeFilters.p[0] + 1] : [2]
      refreshData(stringifyFilters(activeFilters))
    }
  }

  useEffect(() => {
    setIsRefreshing(false);
    console.log('upcoming events');
    console.log(router.isFallback);
    console.log(upcomingEvents);
  }, [upcomingEvents]);

  // console.log('upcoming events');
  // console.log(router.isFallback);
  // console.log(upcomingEvents);

  if (!router.isFallback && !upcomingEvents) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle><span id="loading"></span></PostTitle>
      ) : (
        <>
        <article>
            <Head>
              <title>
                Explore Our Events | {SITE_NAME}
              </title>

            </Head>
        <div className="c-filter__heading l-wrap l-container">
            <h1>Explore Our Events</h1>
        </div>
        <div className="c-filter__wrapper l-wrap l-container">
          <span className="c-filter__label">Search</span>
          {filterOptions && (
            <SearchFilter filterOptions={filterOptions} setFilter={refreshData} params={params}></SearchFilter>
          )}
          </div>

          {isRefreshing ? (

            <div id="loading"></div>

          ) : upcomingEvents?.length > 0 ? (
            <>
              <SectionEventListing events={upcomingEvents} />
              <div className="c-pagination l-container l-wrap" style={{display: 'flex', justifyContent: 'space-between'}}>
                {activeFilters.p && activeFilters.p[0] > 1 && (
                  <button className="o-button--reverse" onClick={()=>{handlePage('prev')}}>Prev</button>
                )}
                {!upcomingEvents[upcomingEvents?.length - 1].lastItem ? (
                  <button onClick={()=>{handlePage('next')}}>Next</button>
                ) : prevEventsPath ? (
                  <button onClick={()=>{refreshData(stringifyFilters(prevEventsPath))}}>View Past Events</button>
                ) : null}
              </div>
            </>
          ) : (

            <div className="l-container l-wrap u-space--double--top">
              <h4 className="u-text-transform--none u-align--center">No Results, please adjust your search filters.</h4>
            </div>

          )}
</article>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  console.log('please check');
  console.log(params);
  const filter = !params.filter || params.filter?.length < 1 ? {p:1} : params.filter[0].split('|').reduce((ac, filterSegment) => {
    const filterKeyVal = filterSegment.split('=')
    ac[filterKeyVal[0]] = filterKeyVal[1] ? filterKeyVal[1].split(',') : []
    return ac
  }, {})
  console.log('params');
  console.log(filter)

  return {
    props: {
      preview,
      params,
      upcomingEvents: await getFilteredEventsStrapi(filter),
      filterOptions: await getAllFilterOptionsStrapi(),
    },
    revalidate: 3600 * 2  // Two Hours Cache
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}
