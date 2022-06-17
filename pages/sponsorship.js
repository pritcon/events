import { SITE_NAME } from '@lib/constants'
import { getSponsorshipPageContentStrapi } from '@lib/api'
import { getFilteredAssets } from '@lib/util'

import Head from 'next/head'
import Layout from '@templates/layout'
import SlickSlider from '@molecules/components/slick-slider'
import SectionHeading from '@atoms/text/section-heading'
import Markdown from '@atoms/text/markdown'
import SectionEventContent from '@organisms/sections/sponsorship-content'
import SectionStats from '@organisms/sections/stats'
import VideoPlayer from '@molecules/components/video-player'

export default function Index({ content }) {
  return (
    <>
      <Layout>
        <div className="c-page-sections u-spacing--sections">
          <section className="l-container l-wrap l-wrap--full">
          <div class="bg-loader"></div>
          <SlickSlider>
              {content?.videoEmbedUrl ? (
                <VideoPlayer url={content.videoEmbedUrl} settings={{playsinline: true, loop: true, controls: false, volume: 0, muted: true, playing: true}} />
              ) : (
                getFilteredAssets(content.imagesCollection.items).map((media, index) => (
                  <div key={index}>
                    { media && media.contentType.includes("video/") ? (
                      <VideoPlayer url={media && media.url} settings={{playsinline: true, loop: true, controls: false, volume: 0, muted: true, playing: true}}/>
                    ) : (
                      <img src={`${media && media.url}?fit=fill&w=1600&h=900`} alt={media && media.title} />
                    )}
                  </div>
                ))
              )}
            </SlickSlider>
          </section>

          <SectionEventContent
            name={content?.displayTitle ?? content?.title}
            body={content?.body}
            buttons={content?.button && Array.isArray(content?.button) && content?.button.length ? [content?.button[0]] : []}
          />
          <section className="c-section-sponsorship o-section l-container l-wrap u-spacing--triple">
            <SectionHeading
              text="Our Impact"
            />
            <SectionStats
              stats={content?.stat}
            />
          </section>
          <section className="c-section-sponsorship-content o-section l-container l-wrap u-spacing--triple">
            <SectionHeading
              text="Opportunities"
            />
            <div bp="grid 6@md">
              {content?.sponsorships?.length > 0 && content?.sponsorships.map(sponsoship => (
                <React.Fragment key={sponsoship.key}>
                  <div className="c-section-sponsorship-content__header">
                    <div className="c-section-sponsorship-content__heading u-flex">
                      <div className="o-heading-icon">
                        {sponsoship?.image?.url && (
                          <img src={sponsoship.image.url} />
                        )}
                      </div>
                      <h2>{sponsoship.title}</h2>
                    </div>
                  </div>
                  <div className="c-section-sponsorship-content__content u-spacing--and-half">
                    <Markdown value={sponsoship.body} />
                    <div className="c-section-sponsorship-content__button u-spacing--right">
                      <a role="button" className="o-button" href={`/events/sponsorship=${sponsoship.key}`}>
                      {sponsoship.title}
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  console.log('checcccc')
  let content = await getSponsorshipPageContentStrapi();
  content = content && Array.isArray(content) && content.length ? content[0] : {}
  console.log('conetne checkkk');
  console.log(content)
  return {
    props: {
      content
    },
  }
}


