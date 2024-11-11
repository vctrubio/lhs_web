
import { fetchPropertyByID } from '@/lib/bridges';
import CardIdPage from '@/components/CardIdPage';

export default async function Page({ params }: { params: { slug: string } }) {
    const property = await fetchPropertyByID(params.slug);
    return <CardIdPage property={property} />;
}
