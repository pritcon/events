import useSWR, { useSWRInfinite } from "swr";
import SectionEventListing from '@organisms/sections/event-listing'

export default function FilteredEvents ({filter, initialData}) {

  // Bypass API.
  if (!filter && initialData) {
    return <>
      <SectionEventListing events={initialData} />
    </>
  }

  // Get Data from API.
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/events/${filter}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  console.log('eeeee');
  console.log(data);
  return <>
    <SectionEventListing events={data} />
  </>
}