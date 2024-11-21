import { fetchPropertyByID } from '@/lib/bridges';
import CardIdPage from '@/components/CardIdPage';
import { Metadata } from 'next';
// import { ImageResponse } from 'next/og'

export const metadata: Metadata = {
    // metadata--- coverphot | title | price, barrio
}

// export async function GET() {
//     return new ImageResponse(
//         (
//             <div
//                 style={{
//                     fontSize: 128,
//                     background: 'white',
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     textAlign: 'center',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 LHS Propiedades
//             </div>
//         ),
//         {
//             width: 2546,
//             height: 1500,
//         }
//     )
// }

function displayPrice(propertyPrice: number) {
    return `${propertyPrice.toLocaleString('es-ES')}€`;
}

export default async function Page({ params }: { params: { slug: string } }) {

    const property = await fetchPropertyByID(params.slug);

    metadata.title = property && `${property?.title} | LHS `;
    metadata.description = property && `${displayPrice(property.precio)} 📍 ${property?.barrioRef.name}`;
    const coverImageUrl = property?.cover_url[0] ?? '';
    const absoluteImageUrl = coverImageUrl.startsWith('http')
        ? coverImageUrl
        : `https:${coverImageUrl}`;

    metadata.openGraph = {
        title: property?.title && `${property.title} | LHS`,
        description: property?.description && `${displayPrice(property.precio)} 📍 ${property.barrioRef.name}`,
        url: `https://www.lhsconcept.com/propiedades/${params.slug}`,
        images: [
            {
                url: absoluteImageUrl,
                width: 1200,
                height: 630,
                alt: property?.title && `${property.title} - LHS Propiedades`
            }
        ]
    }
    metadata.keywords = property?.title && property.title;
    // metadata.viewport = {
    //     width: 'device-width',
    //     initialScale: 1,
    //     maximumScale: 1,
    // }
    metadata.category = 'Propiedades de Lujo en Madrid';
    metadata.creator = 'Lourdes Hernansanz';
    metadata.publisher = 'Lourdes Hernansanz';
    metadata.authors = [{ name: 'Lourdes Hernansanz' }];
    metadata.twitter = {
        card: 'summary_large_image',
        site: '@lhsconcept',
    }
    return <CardIdPage property={property} />;
}
