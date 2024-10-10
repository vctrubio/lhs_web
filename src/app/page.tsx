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
create left side bar
make mobile responsive
show properties all page
show property by id page


*/