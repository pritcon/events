import moment from 'moment'

export function parseFilters(paramStr) {

  return paramStr.split('|').reduce((ac, filterSegment) => {
    const filterKeyVal = filterSegment.split('=')
    ac[filterKeyVal[0]] = filterKeyVal[1] ? filterKeyVal[1].split(',') : []
    return ac
  }, {})

}

export function stringifyFilters(paramObj) {

  return Object.entries(paramObj) ? Object.entries(paramObj).reduce((ac, [key, value]) => {
    return `${ac ? ac + "|" : ""}${key}=${value.join(",")}`
    }, "") : ""

}

export function getEventUrl(slug) {
  return `/event/${slug}`
}

export function getFilteredAssets(mediaItems) {
  if (Array.isArray(mediaItems) && mediaItems.length) {
    const videoItems = mediaItems.filter(item=> item && item?.contentType?.includes("video/"))
    return videoItems.length ? [videoItems[0]] : mediaItems
  } else {
     return mediaItems
  }
 
}

export function getDateRange(startTimestamp, endTimestamp, simple=false) {
  const startDate = moment(startTimestamp).utcOffset('+0400')
  const endDate = moment(endTimestamp ?? startTimestamp).utcOffset('+0400')

  switch (true) {
    case simple:
      return `${startDate.format('MMMM YYYY')}`

    case startDate.format('YYYY') !== endDate.format('YYYY'):
    case startDate.format('MM') !== endDate.format('MM'):
      return `${startDate.format('MMMM DD, YYYY')} - ${endDate.format('MMMM DD, YYYY')}`

    case startDate.format('DD') !== endDate.format('DD'):
      return `${startDate.format('MMMM DD')} - ${endDate.format('DD, YYYY')}`

    default:
      return `${startDate.format('MMMM DD, YYYY')}`
  }
}
