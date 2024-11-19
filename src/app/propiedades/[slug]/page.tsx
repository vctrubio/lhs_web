import { fetchPropertyByID } from '@/lib/bridges';
import CardIdPage from '@/components/CardIdPage';
import { Metadata } from 'next';
import { ImageResponse } from 'next/og'

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

export default async function Page({ params }: { params: { slug: string } }) {

    const property = await fetchPropertyByID(params.slug);

    console.log('checking params....', property);
    metadata.title = property && `LHS | ${property?.title}`; // Updated to use f-string format
    metadata.description = property && `${property?.precio}, ${property?.barrioRef.name}`;
    // metadata.images = property?.cover_url[0] ?? '';
    metadata.openGraph = {
        title: metadata.title ?? '',
        description: metadata.description ?? '',
        images: property?.cover_url[0] ?? '',
        url: `https://www.lhsconcept.com/propiedades/${params.slug}`,
    }
    metadata.keywords = property?.title ?? 'LHS Propiedades Selectas';
    // metadata.viewport = {
    //     width: 'device-width',
    //     initialScale: 1,
    //     maximumScale: 1,
    // }
    metadata.category = 'Propiedades de Lujo en Madrid';
    metadata.creator = 'Lourdes Hernansanz';
    metadata.publisher = 'Lourdes Hernansanz';
    metadata.twitter = {
        card: 'summary_large_image',
        site: '@lhsconcept',
    }
    return <CardIdPage property={property} />;
}
