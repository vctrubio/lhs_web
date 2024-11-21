import { fetchPropertyByID } from '@/lib/bridges';
import CardIdPage from '@/components/CardIdPage';
import { Metadata } from 'next';

function displayPrice(propertyPrice: number) {
    return `${propertyPrice.toLocaleString('es-ES')}€`;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const property = await fetchPropertyByID(params.slug);

    const metadata: Metadata = {
        title: property ? `${property?.title} | LHS` : 'LHS Concept',
        description: property ? `${displayPrice(property.precio)} 📍 ${property?.barrioRef.name}` : 'Propiedades de Lujo en Madrid',
        openGraph: {
            title: property?.title && `${property?.title} | LHS`,
            description: property?.description && `${displayPrice(property.precio)} 📍 ${property?.barrioRef.name}`,
            url: `https://www.lhsconcept.com/propiedades/${params.slug}`,
            images: [
                {
                    url: property?.cover_url[0] ?? '/logo-main.jpeg',
                    width: 1200,
                    height: 630,
                    alt: property?.title ? `${property.title} - LHS Propiedades` : 'LHS Propiedades',
                }
            ]
        },
        keywords: property?.title ? property.title : 'LHS Concept',
        category: 'Propiedades de Lujo en Madrid',
        creator: 'Lourdes Hernansanz',
        publisher: 'Lourdes Hernansanz',
        authors: [{ name: 'Lourdes Hernansanz' }],
        twitter: {
            card: 'summary_large_image',
            site: '@lhsconcept',
        }
    };

    return metadata;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const property = await fetchPropertyByID(params.slug);

    return <CardIdPage property={property} />;
}
