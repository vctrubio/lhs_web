import { createClient, Entry } from 'contentful';
import { Property, Barrio, BannerListings } from '@/types/property';
import { ImageToUrl, extractImageUrls } from './utils';
import { List } from 'postcss/lib/list';
import { title } from 'process';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});

export async function fetchPropertyByID(url: string): Promise<Property | null> {
    console.log('calling fetchbyID')

    try {
        const entries = await client.getEntries();

        const filteredEntry = entries.items.find((entry: Entry<any>) => {
            return entry.sys.contentType.sys.id === 'propiedad' && entry.fields.url === url;
        });

        if (!filteredEntry) {
            console.log(`No property found for URL: ${url}`);
            return null;
        }

        return parsePropertyFromContentful({ entry: filteredEntry });
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        return null;
    }
}


function parsePropertyFromContentful({ entry }): Property {

    function getRoomPhotoUrl(entries: any[]): string[] {
        const urls = entries.map(entry => {
            const photos = entry.fields.photos
            const it = photos ? extractImageUrls(photos) : []
            return it
        }
        )
        return urls.flat()
    }

    const updatedAt = entry.sys.updatedAt
    const { barrioRef, amentetiesRef, characteristics, habitacionesPaginas, ibi, maintenanceCostmMnthly, photos, plano, title, description, buyOrRent, reformado, precio, url } = entry.fields;

    return {
        title: title,
        url: url,
        description: description,
        buyOrRent: buyOrRent,
        reformado: reformado,
        precio: precio,
        precioIbi: ibi ? ibi : 0,
        precioComunidad: maintenanceCostmMnthly ? maintenanceCostmMnthly : 0,
        plano_url: plano ? ImageToUrl(plano) : null,
        cover_url: photos ? extractImageUrls(photos) : null,
        barrioRef: barrioRef ? barrioRef.fields : null,
        amentitiesRef: amentetiesRef ? amentetiesRef.fields : null,
        charRef: characteristics ? characteristics.fields : null,
        roomsRef: entry.fields.habitacionesPaginas ? entry.fields.habitacionesPaginas.map((h: any) => ({
            title: h.fields.title,
            description: h.fields.description,
            photos: h.fields.photos ? h.fields.photos.map((photo: any) => photo.fields.file.url) : []
        })) : null,

        photos_url: [
            ...(habitacionesPaginas ? getRoomPhotoUrl(habitacionesPaginas) : []),
            ...(photos ? extractImageUrls(photos) : [])
        ],

        updatedAt: updatedAt,
        canva_id: null,
    } as Property;
}

function parseBarrioFromContentful({ entry }): Barrio {
    const { name, rating, description, location, longDescription } = entry.fields;

    return {
        name: name,
        rating: rating,
        description: description,
        longDescription: longDescription,
        location: location
    } as Barrio;
}

function parseBannerListingsFromContentful({ entry }): BannerListings {
    return entry.fields.listings.map(listing => ({
        title: entry.fields.title,
        photo: `https:${listing.fields.photos[0].fields.file.url}`,
        url: listing.fields.url
    })) as BannerListings;
}

export async function fetchEntriesContentful(): Promise<{ properties: Property[], barrios: Barrio[], listings: BannerListings[] }> {
    const entries = await client.getEntries();

    const barrios: Barrio[] = [];
    const properties: Property[] = [];
    const listings: BannerListings[] = [];

    entries.items.map((entry: Entry<any>) => {
        if (entry.sys.contentType.sys.id === 'barrio') {
            barrios.push(parseBarrioFromContentful({ entry }))
        }
        if (entry.sys.contentType.sys.id === 'propiedad') {
            properties.push(parsePropertyFromContentful({ entry }))
        }
        if (entry.sys.contentType.sys.id === 'homePageBanner') {
            listings.push(parseBannerListingsFromContentful({ entry }))
        }

    });

    return { properties, barrios, listings }

}