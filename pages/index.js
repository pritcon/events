import { SITE_NAME } from '@lib/constants'
import { getRecentEventsStrapi, getHomePageContentStrapi } from '@lib/api'
import { useEffect } from 'react'


import Head from 'next/head'
import Layout from '@templates/layout'
import CondeNastLogo from '@atoms/images/cn-logo'
import Markdown from '@atoms/text/markdown'
import Hero from '@organisms/sections/hero'
import SectionHeading from '@atoms/text/section-heading'
import SectionEventContent from '@organisms/sections/event-content'
import SectionEventListing from '@organisms/sections/event-listing'
import LinkBlocks from '@organisms/sections/link-blocks'
import ComingUp from '@organisms/sections/coming-up'
import Contact from '@organisms/sections/contact'

import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '@lib/graphqlQuery';

export default function Index({ events, content }) {
  const heroPost = events[0];
  const comingUp = events.slice(1);

  function aniText(params) {
    let displayIndex = 0
    let elems = [...document.querySelectorAll('.c-rotating-text__item')]
    let delay = 2000

    if (elems) {
      setInterval(() => {
        elems?.forEach((el) => {
          el.classList.remove('animation')
        })

        // Move to the next item in dialog

        // If display index goes out of index range, start again
        if (displayIndex >= elems?.length) {
          displayIndex = 0
        }

        elems[displayIndex].classList.add('animation')
        displayIndex++
      }, delay)
    }
  }

  //function videoStart() {
    //when video starts start the text animation too.
    //aniText()
  //}


  //useEffect(() => {
    //videoStart()
  //}, []);

  useEffect(() => {

    // show full header after video section
    var header = document.getElementById('Header');
    var element = document.getElementById('showHeader');
    var elementHeight = element.clientHeight;

    document.addEventListener('scroll', show);

    // check if element is in view
    function inView() {
      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY || window.pageYOffset;
      var scrollPosition = scrollY + windowHeight;
      var elementPosition = element.getBoundingClientRect().bottom + scrollY + elementHeight;

      if (scrollPosition > elementPosition) {
        return true;
      }
      return false;
    }

    // when element if view show header
    function show() {
      if (inView()) {
          header.classList.add('c-header--color');
          header.classList.remove('c-header--transparent');
          }

          else {
            header.classList.add('c-header--transparent');
            header.classList.remove('c-header--color');
      }
    }
  }, []);


  return (
    <>
      <Layout bodyClass="l-home">
        

        <div className="c-page-sections l-home">

          <div className="o-curtain">
            <div id="showHeader" className="o-curtain__item o-video-bg">
              <div className="o-curtain__inner">
                <div className="c-section-video">
                  <div className="c-section-video__background u-hide-until--l">
                    <video autoPlay loop muted playsInline>
                      <source type="video/mp4" src="/cn-intro.mp4" />
                    </video>
                  </div>
                  <div className="c-section-video__background u-hide-after--l">
                    <video autoPlay loop muted playsInline>
                      <source type="video/mp4" src="/cn-intro-m-small.mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>


            <div className="o-curtain__item o-white-bg">
              <div className="o-curtain__inner">
                <section className="c-section-signpost-content o-section l-container l-wrap u-spacing--sections--less">
                  <div className="c-section-signpost-content__button u-spacing">
                    <ul className="c-section-signpost-content__nav">
                      <li className="u-hover--sparkle">
                        <a href="/events">
                          <div>
                            <span className="c-section-signpost-content__text">
                              Explore Our Events
                            </span>

                            <span className="o-arrow">
                              <svg width="103" height="46" viewBox="0 0 103 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 20.6505H101M101 20.6505L84.5188 1M101 20.6505L84.5188 45" stroke="black" strokeWidth="2"/>
                              </svg>
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="/sponsorship">
                          <div>
                            <span className="o-arrow u-reverse">
                              <svg width="103" height="46" viewBox="0 0 103 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 20.6505H101M101 20.6505L84.5188 1M101 20.6505L84.5188 45" stroke="black" strokeWidth="2"/>
                              </svg>
                            </span>
                            <span className="c-section-signpost-content__text">
                              Partner With Us
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
            <div className="o-curtain__item o-black-bg">
              <div className="o-curtain__inner">
                <section className="c-section-signpost-content c-section-signpost-content--intro o-section l-container l-wrap u-spacing--sections">
                  <div className="u-spacing--triple">
                    {content?.body && (
                      <Markdown value={content.body} />
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {events?.length > 0 && (
            <>
              <div className="u-spacing--sections">
                <div></div>
                <div className="l-container l-wrap o-section-heading o-section-heading--l">
                  Coming up
                </div>
              </div>
              <SectionEventListing
                events={events}
              />
            </>
          )}

        </div>
        <div class="u-align--center u-spacing--double--m">
          <a role="button" class="o-button" href="/events" target="_blank" rel="noopener noreferrer">Explore Our Events</a>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const events = await getRecentEventsStrapi();
  // console.log('all events');
  // console.log(events);
  // const events = await getRecentEvents();

  const contents = await getHomePageContentStrapi();
  const content =  Array.isArray(contents) && contents.length ? contents[0] : null
  console.log('home page content');
  console.log(content);
  return {
    props: {
      events,
      content
    },
  }
}

