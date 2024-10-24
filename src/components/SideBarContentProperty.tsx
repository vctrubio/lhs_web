'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { useSharedQueryState } from '@/lib/nuqs';
import { SideBarPropComponent } from '@/types/glasses';

export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const disableFlag = true;
    const pathname = usePathname();
    const flagPathname = pathname?.split('/').length === 2;

    const {
        priceRange, priceValue,
        bathroomRange, bathroomValue,
        bedroomRange, bedroomValue,
        metersSquareRange, metersSquareValue,
        sortOption, setSortOption,
    } = useSharedQueryState();

    useEffect(() => {
        const ptrFetch = async () => {
            if (pathname) {
                const pathParts = pathname.split('/');
                const lastPart = pathParts[pathParts.length - 1];
                const property = await fetchPropertyByID(lastPart);
                console.log("🚀 ~ ptrFetch ~ property:", property)
                setProperty(property);
                setLoading(false);
            }
        };

        ptrFetch();
    }, [pathname]);

    const filterSections = [
        {
            component: new SideBarPropComponent({
                title: loading ? '' : property?.title || '',
                disabled: disableFlag,
                markValue: null,
                componentKey: 'title',
                onChange: () => {}, // Add onChange if needed
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
        {
            component: new SideBarPropComponent({
                title: "Precio",
                slider: {
                    min: priceRange[0],
                    max: priceRange[1],
                    value: priceValue,
                    setValue: null,
                    step: 1,
                },
                disabled: disableFlag,
                markValue: property?.precio || null,
                componentKey: 'price',
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
        {
            component: new SideBarPropComponent({
                title: "Dormitorios",
                slider: {
                    min: bedroomRange[0],
                    max: bedroomRange[1],
                    value: bedroomValue,
                    setValue: null,
                    step: 1,
                },
                disabled: true,
                markValue: property?.charRef.dormitorios || null,
                componentKey: 'bedrooms',
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
        {
            component: new SideBarPropComponent({
                title: "Baños",
                slider: {
                    min: bathroomRange[0],
                    max: bathroomRange[1],
                    value: bathroomValue,
                    setValue: null,
                    step: 1,
                },
                disabled: true,
                markValue: property?.charRef.banos || null,
                componentKey: 'bathrooms',
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
        {
            component: new SideBarPropComponent({
                title: "Metros",
                slider: {
                    min: metersSquareRange[0],
                    max: metersSquareRange[1],
                    value: metersSquareValue,
                    setValue: null,
                    step: 1,
                },
                disabled: true,
                markValue: property?.charRef.metrosCuadradros || null,
                componentKey: 'meters',
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
        {
            component: new SideBarPropComponent({
                title: "Barrio",
                barrio: {
                    barrios: property?.barrioRef || [],
                    selectedBarrios: null,
                    setSelectedBarrios: null,
                },
                disabled: true,
                markValue: null,
                componentKey: 'neighborhood',
                hasQueryParams: false, // Add hasQueryParams
                sortOption, // Pass sortOption
                setSortOption, // Pass setSortOption
            })
        },
    ];

    return (
        <div className='content'>
            {!flagPathname ? (
                filterSections.map((section) => (
                    <React.Fragment key={section.component.props.componentKey}>
                        {section.component.render()}
                    </React.Fragment>
                ))
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


      <div className='flex flex-col' style={{ fontSize: 14 }}>
                            <div>Precio de Comunidad: 18000 </div>
                            <div>Precio IBI: 2100 </div>
                        </div>


*/
