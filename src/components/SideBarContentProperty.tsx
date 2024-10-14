'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { useSharedQueryState } from '@/lib/nuqs';
import SideBarPropComponent from '@/types/glasses';

export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null); // Holds the actual property data
    const [loading, setLoading] = useState(true); // Track loading state
    const disableFlag = true;
    const pathname = usePathname();
    const flagPathname = pathname.split('/').length === 2;

    const {
        priceRange, priceValue,
        bathroomRange, bathroomValue,
        bedroomRange, bedroomValue,
        metersSquareRange, metersSquareValue,
    } = useSharedQueryState();

    useEffect(() => {
        const ptrFetch = async () => {
            const pathParts = pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const property = await fetchPropertyByID(lastPart);
            console.log("🚀 ~ ptrFetch ~ property:", property)
            setProperty(property);
            setLoading(false);
        };

        ptrFetch();
    }, [pathname]);

    const filterSections = [
        new SideBarPropComponent({
            title: loading ? '' : property?.title,
            disabled: disableFlag,
        }),

        new SideBarPropComponent({
            title: "Precio",
            slider: {
                min: priceRange[0],
                max: priceRange[1],
                value: priceValue,
                setValue: null, 
            },
            disabled: disableFlag,
            markValue: property?.precio,
        }),

        new SideBarPropComponent({
            title: "Dormitorios",
            slider: {
                min: bedroomRange[0],
                max: bedroomRange[1],
                value: bedroomValue,
                setValue: null, // Read-only slider
            },
            disabled: true,
            markValue: property?.charRef.dormitorios,
        }),

        new SideBarPropComponent({
            title: "Baños",
            slider: {
                min: bathroomRange[0],
                max: bathroomRange[1],
                value: bathroomValue,
                setValue: null, // Read-only slider
            },
            disabled: true,
            markValue: property?.charRef.banos,
        }),
        new SideBarPropComponent({
            title: "Metros",
            slider: {
                min: metersSquareRange[0],
                max: metersSquareRange[1],
                value: metersSquareValue,
                setValue: null,
            },
            disabled: true,
            markValue: property?.charRef.metrosCuadradros,
        }),
    ];

    return (
        <div className='content'>
            {!flagPathname ? (
                filterSections.map((section) => section.render())
            ) : (
                <SearchBar />
            )}

        </div>
    );
};

/*

Value can also be an array : ie: 
Price 200
IBI 400
Comunidad 230

||
Baños 4
Aseos 1

*/



/*



                    <Section title="Baños" number={property.charRef.banos} icon={<IconBath />}>
                    </Section>
                    <Section title="Dormitorios" number={property.charRef.dormitorios} icon={<IconBed />}>
                    </Section>
                    <Section title="Metros" number={property.charRef.metrosCuadradros} icon={<IconMeasure />}>
                    </Section>
                    <Section title="Barrio" icon={<IconLocation />}>
                    </Section>

                     <div>{property.barrioRef.name}</div> 


      <div className='flex flex-col' style={{ fontSize: 14 }}>
                            <div>Precio de Comunidad: 18000 </div>
                            <div>Precio IBI: 2100 </div>
                        </div>


        <div className='gap-1' style={{ display: 'flex', alignItems: 'center' }}>
                    <div>{number && number.toLocaleString('de-DE')} </div>
                    <div>
                        {icon} {/* Render the icon here

*/