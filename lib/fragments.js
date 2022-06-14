
const AssetFields =
`fragment AssetFields on Asset {
  sys {
    id
  }
  url
	width
	height
  title
  contentType
}`

const MarketFields =
`fragment MarketFields on Market {
  sys {
    id
  }
  title
  key
  continent
  country
  state
  city
}`

const PartnerFields =
`fragment PartnerFields on Partner {
  sys {
    id
  }
  title
  sponsorship {
    title
  }
  imageCollection {
    items {
      ...AssetFields
    }
  }
}
`

const SponsorshipFields =
`fragment SponsorshipFields on Sponsorship {
  sys {
    id
  }
  title
  key
  body
  image {
    ...AssetFields
  }
}
`

const PersonFields =
`fragment PersonFields on Person {
  sys {
    id
  }
  title
  firstName
  lastName
  positionTitle
  headshot {
    ...AssetFields
  }
  body
  key
}
`

const ButtonFields =
`fragment ButtonFields on Button {
  sys {
    id
  }
  title
  buttonText
  buttonUrl
  newWindow
  key
}
`

const QuoteFields =
`fragment QuoteFields on Quote {
  sys {
    id
  }
  title
  key
  quote
  citation
}
`

const StatFields =
`fragment StatFields on Stat {
  sys {
    id
  }
  title
  key
  value
  description
}
`

const SocialLinkFields =
`fragment SocialLinkFields on SocialLink {
  sys {
    id
  }
  url
  type
}
`

const EventListingFields =
`fragment EventListingFields on Event {
  slug
  title
  displayTitle
  startDate
  endDate
  approximateDate
  market {
    title
  }
  brand {
    title
  }
  metaImage {
    ...AssetFields
  }
}
`

const EventFields =
`fragment EventFields on Event {
  sys {
    id
  }
  slug
  title
  displayTitle
  startDate
  endDate
  approximateDate
  pastStartDate
  pastEndDate
  type
  body
  metaImage {
    ...AssetFields
  }
  imagesCollection(limit: 20) {
    items {
      ...AssetFields
    }
  }
  impactCollection(limit: 10) {
    items {
      ...StatFields
    }
  }
  impactSecondCollection(limit: 10) {
    items {
      ...StatFields
    }
  }
  buttonsCollection(limit: 10) {
    items {
      ...ButtonFields
    }
  }
  brand {
    title
  }
  categoryOne {
    title
  }
  categoryTwo {
    title
  }
  categoryThree {
    title
  }
  categoryFour {
    title
  }
  categoryFive {
    title
  }
  sponsorshipTypeOne {
    title
  }
  sponsorshipTypeTwo {
    title
  }
  sponsorshipTypeThree {
    title
  }
  eventName {
    name
  }
  becomeAPartnerLink
  socialLinksCollection(limit: 5) {
    items {
      ...SocialLinkFields
    }
  }
  market {
    ...MarketFields
  }
  partnersCollection(limit: 10) {
    items {
      ...PartnerFields
    }
  }
  speakersCollection(limit: 10) {
    items {
      ...PersonFields
    }
  }
  sectionImage {
    ...AssetFields
  }
  videoEmbedUrl
  quote {
    ...QuoteFields
  }
}
`

const LandingPageFields =
`fragment LandingPageFields on LandingPage {
  sys {
    id
  }
  slug
  title
  displayTitle
  body
  metaImage {
    ...AssetFields
  }
  imagesCollection(limit: 20) {
    items {
      ...AssetFields
    }
  }
  statsCollection(limit: 10) {
    items {
      ...StatFields
    }
  }
  sponsorshipsCollection(limit: 10) {
    items {
      ...SponsorshipFields
    }
  }
  button {
    ...ButtonFields
  }
  videoEmbedUrl
}
`

// Add all fragments here.
const fragments = {
  AssetFields,
  MarketFields,
  PartnerFields,
  EventFields,
  PersonFields,
  ButtonFields,
  StatFields,
  QuoteFields,
  SocialLinkFields,
  EventListingFields,
  LandingPageFields,
  SponsorshipFields,
}

// Main wrapper function to add fragments.
export default function addFragments(query) {

  const frags = getFrags(query)

  frags.forEach(frag => {
    query = `${query}
              ${fragments[frag]}
            `
  })

  return query
}

// Get fragments in query.
function getFrags(query) {
  return [...query.matchAll(/\.\.\.([^\s]*)/g)].reduce((ac, f) => {
    if (!ac.includes(f[1])) {
      ac.push(f[1])
      // Do recursion.
      getFrags(fragments[f[1]]).forEach(subFrag => {
        if (!ac.includes(subFrag)) ac.push(subFrag)
      })
    }
    return ac
  }, [])
}