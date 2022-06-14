import moment from 'moment'
import { useRouter } from 'next/router'
import { SITE_NAME, SITE_URL, HOME_OG_IMAGE_URL } from '@lib/constants'
import Head from 'next/head'
import ErrorPage from 'next/error'
import PostTitle from '@molecules/post/post-title'
import Layout from '@templates/layout'
import SlickSlider from '@molecules/components/slick-slider'
import VideoPlayer from '@molecules/components/video-player'
import SecondaryNav from '@molecules/navigation/secondary-nav'
import SectionHeading from '@atoms/text/section-heading'
import SectionEventContent from '@organisms/sections/event-content'
import SectionStats from '@organisms/sections/stats'
import SectionSpeakers from '@organisms/sections/speakers'
import SectionDiscoverMore from '@organisms/sections/discover-more'
import SectionOtherEvents from '@organisms/sections/other-events'
import Instagram from '@atoms/images/instagram'
import Facebook from '@atoms/images/facebook'
import Twitter from '@atoms/images/twitter'
import Youtube from '@atoms/images/youtube'

import { getEventAndArchivedStrapi, getAllEventsStrapi, getEventAndArchived } from '@lib/api'
import { getDateRange, getFilteredAssets } from '@lib/util'

import React from 'react'

export default function Event({ event, relatedEvents, otherEvents, preview }) {
  const router = useRouter()

  if (!router.isFallback && !event) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} bodyClass="l-event">
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {event?.displayTitle ?? event?.title} | {SITE_NAME}
              </title>
              {event?.metaImage?.url && (
                <meta property="og:image" content={event.metaImage.url} />
              )}
            </Head>

              <SecondaryNav
                title={event?.title}
                brand={event?.brand?.title}
                speaker={event?.speakers?.length > 0}
                partner={event?.sponsors?.length > 0}
              />



            <div className="c-page-sections u-spacing--sections">

              <section id="hero" className="c-section-event-hero l-container l-wrap l-wrap--full">
                <SlickSlider>
                  {getFilteredAssets(event.images).map((media, index) => (
                    <div key={index}>
                      { media?.contentType?.includes("video/") ? (
                        <VideoPlayer url={media.url} settings={{playsinline: true, loop: true, controls: false, volume: 0, muted: true, playing: true}}/>
                      ) : (
                        <img src={`${media.url}?fit=fill&w=1600&h=900`} alt={media.title} />
                      )}
                    </div>
                  ))}
                </SlickSlider>


              </section>
              <div class="u-position--relative u-spacing--sections">

                <a name="summary"></a>
                <SectionEventContent
                  name={event?.displayTitle ?? event?.title }
                  body={event?.body}
                  type={event?.type}
                  buttons={event?.buttons ?? []}
                  eyebrow={event?.brand?.title}
                  date={event?.pastStartDate && moment().isBefore(moment(event?.startDate)) ? getDateRange(event?.pastStartDate, event?.pastEndDate) : getDateRange(event?.startDate, event?.endDate)}
                  location={event?.market?.title}
                  upcoming={event?.pastStartDate && moment().isBefore(moment(event?.startDate)) ? getDateRange(event?.startDate, event?.endDate, event.approximateDate) : null}
                />

                {event?.impact?.length > 0 && (
                  <SectionStats
                    stats={event?.impact ?? []}
                  />
                )}

                {event?.speakers?.length > 0 && (
                  <SectionSpeakers
                    speakers={event?.speakers ?? []}
                  />
                )}

                {(event?.sectionImage || event?.videoEmbedUrl) && (
                  <section className="c-section-image o-section l-container l-wrap l-wrap--full">
                    {event?.videoEmbedUrl ? (
                      <VideoPlayer url={event.videoEmbedUrl} />
                    ) : event?.sectionImage ? getFilteredAssets([event.sectionImage]).map((media, index) => (
                      <div key={index}>
                        { media?.contentTyp?.includes("video/") ? (
                          <VideoPlayer url={media.url} settings={{playsinline: true, loop: true, controls: false, volume: 0, muted: true, playing: true}}/>
                        ) : (
                          <img src={`${media.url}?fit=fill&w=1600&h=900`}
                            alt={media.title} />
                        )}
                      </div>
                    )) : "" }
                  </section>
                )}

                {(event?.quote?.quote || event?.socialLinks?.length > 0) && (
                  <section className="c-section-blockquote o-section l-container l-wrap u-spacing--double">
                    {event?.quote?.quote && (
                      <div className="o-blockquote">
                        <div className="o-blockquote__text">
                          {event.quote.quote}
                        </div>
                        <cite className="o-blockquote__cite o-heading--s">
                          &mdash;{event.quote.citation}
                        </cite>
                      </div>
                    )}
                    {event?.socialLinks && (
                      <div className="c-social">
                        {event.socialLinks.map(socialLink => (
                          <a key={socialLink?.sys?.id} href={socialLink?.url} className="c-social__link">
                            {socialLink?.type === "Facebook" ? (
                              <Facebook/>
                            ) : socialLink?.type === "Instagram" ? (
                              <Instagram/>
                            ) : socialLink?.type === "Twitter" ? (
                              <Twitter/>
                            ) : socialLink?.type === "Youtube" ? (
                              <Youtube/>
                            ) : "" }
                          </a>
                        ))}
                      </div>
                    )}
                  </section>
                )}
                <a name="partners"></a>
                {event?.sponsors?.length > 0 && (
                  <section className="c-section-sponsors o-section l-container l-wrap u-spacing--double">

                    <SectionHeading
                      text="Sponsors"
                      button={{
                        url: event?.becomeAPartnerLink ?? "/sponsorship",
                        text: "Become A Sponsor"
                      }}
                    />
                    <div className="c-sponsors u-spacing--double">
                      {event?.sponsors?.filter(partner => partner && partner.image?.length > 0).map((partner, index) => (
                        <div className="c-sponsors__item" bp="grid" id={"p" + index} key={index}>
                          <div className="c-sponsors__item--heading u-spacing--half" bp="4@lg">
                            <h3>{partner.title}</h3>
                            <p><em>{partner.sponsorship?.title}</em></p>
                          </div>
                          <div bp="8@lg">
                            {partner.image && (
                              <SlickSlider>
                                {partner.image.map((image, index2) => (
                                  <div key={index2}>
                                    <img src={image.url} alt={image.title} />
                                  </div>
                                ))}
                              </SlickSlider>
                            )}
                          </div>
                        </div>
                      ))}
                      <nav className="c-sponsors__nav">
                        <ul className="c-sponsors__nav-list">
                        {event?.sponsors?.filter(partner => partner).map((partner, index) => (
                          <React.Fragment key={index}>
                            <li>{partner.title}</li>
                            <li className="o-pipe" aria-hidden="true"></li>
                          </React.Fragment>
                        ))}
                        </ul>
                      </nav>
                    </div>
                  </section>
                )}

                {event?.impact?.length > 0 && (
                  <SectionStats
                    stats={event?.impactSecond ?? []}
                  />
                )}

                {otherEvents?.length > 0 && (
                  <SectionOtherEvents
                    events={otherEvents}
                  />
                )}

                {relatedEvents?.length > 0 && (
                  <SectionDiscoverMore
                    events={relatedEvents}
                  />
                )}
              </div>
            </div>
          </article>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getEventAndArchivedStrapi(params.slug)
  return {
    props: {
      preview,
      event: data?.event ?? null,
      relatedEvents: data?.related ?? null,
      otherEvents: data?.others ?? null,
    },
    revalidate: 3600 * 2  // Two Hours Cache
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllEventsStrapi();
  console.log('allPosts');
  console.log(allPosts);
  return {
    paths: allPosts?.map(({ slug }) => `/event/${slug}`) ?? [],
    fallback: true,
  }
}
