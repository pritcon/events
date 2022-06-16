import { gql } from '@apollo/client';

export const EventsModel = `
        title
        slug
        eventName {
         name
        }
        displayTitle
        startDate
        endDate
        approximateDate
        pastStartDate
        pastEndDate
        brand {
          title
          key
        }
        location {
          title
          continent
          country
          city
          state
        }
        sponsorshipTypeOne  {
          title
          key
          image {
            name
            url
          }
          body
          link
        }
        sponsorshipTypeTwo {
          title
          key
          image {
            name
            url
          }
          body
          link
        }
        sponsorshipTypeThree  {
          title
          key
          image {
            name
            url
          }
          body
          link
        }
        body
        images {
          name
          url
        }
        quote {
          title
          key
          quote
          citation
        }
        videoEmbedURL
        sectionImage {
          name
          url
        }
        speakers  {
          title
          firstName
          lastName
          positionTitle
          headshot {
            name
            url
          }
          body
          key
        }
        sponsors {
          title
          key
          image {
            name
            url
          }
          sponsorship{
            title
            key
            image {
              name
              url
            }
          	body
            link
          }
        }
        currentSpeakers
        currentSponsors
        becomeAPartnerLink
        metaTitle
        metaImage {
          name
          url
          width
          height
        }
        metaDescription
        hideFromSearch
        buttons {
          title
          buttonText
          buttonUrl
          newWindow
          key
        }
        impact {
    			title
    			key
          value
          description
        }
        impactSecond {
    			title
    			key
          value
          description
        }
        socialLinks {
          type
          url
        }
        market {
          title
          country
          city
          state
          continent
        }        
`

export const LandingPageModel = `
        title
        slug
        displayTitle
        videoEmbedUrl
        body
        images {
          name
          url
          width
          height
        }
        metaTitle
        metaImage {
          name
          url
          width
          height
        }
        metaDescription
        button {
          title
          buttonUrl
          buttonText
          newWindow
          key
        }
        linkBlocks {
          title
          link
          key
        }
        stat {
          title
          value
          key
          description
        }
        sponsorships {
        title
        image {
          name
          url
          width
          height
        }
        body
        link
        key
        }
`

export const filterOptionModel = `
              eventBrand {
                brand {
                  title
                  key
                }
              }
              eventCategory {
                category {
                  title
                  key
                }
              }
                
              eventMarket {
                market {
                  country
                }
              }
              eventSponsorship {
                sponsorship {
                  title
                  key
                }
              }
`


export const GET_ALL_EVENTS = gql`
  query getAllEvents($limit: Int!) {
    eventsEvents(limit: $limit) {
        ${EventsModel} 
      }
  }
`;
