


import { getFilteredEvents, getFilteredEventsStrapi } from '@lib/api'

export default async function handler(req, res) {
  const {
    query: { filter },
  } = req

  const filterData = !filter || filter?.length < 1 ? {p:1} : filter[0].split('|').reduce((ac, filterSegment) => {
    const filterKeyVal = filterSegment.split('=')
    ac[filterKeyVal[0]] = filterKeyVal[1] ? filterKeyVal[1].split(',') : []
    return ac
  }, {})

  const reponse = await getFilteredEventsStrapi(filterData);

  res.status(200).json(reponse)
}
