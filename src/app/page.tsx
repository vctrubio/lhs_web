import { fetchEntriesContentful } from '@/lib/bridges'
import { Property } from '@/types/property';
import { SNF } from '@/components/SearchFilter'

export default async function MainPage() {
  const { properties }: { properties: Property[] } = await fetchEntriesContentful();

  return (
    // <div className="main">
    <SNF entries={properties} />
    // </div>
  );
}



/*
make mobile responsive


LAYOUT -- ipad and up -- 
Logo
navigation
Filter bars
Content on the side


LAYOUT -- IPHONE  -- 
LOGO with burger bar dropdown
searchbar and sort
click to go dropwdown filter ...
Content

*/