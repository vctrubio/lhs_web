'use client'
import React, { useEffect, useState } from "react";
import { PropertyCard } from '@/components/Property';
import { Property } from "@/types/property";
import { getBathrooms } from "@/lib/utils";
import { useSharedQueryState } from '@/lib/nuqs';

//for server side {params, searchParams} as props
export const SNF = ({ entries }: { entries: Property[] }) => {
    const [filterProperties, setFilterProperties] = useState<Property[]>(entries);

    const {
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradosMaximo,
        metrosCuadradosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar,
        sortOption, // Get sortOption from shared state
    } = useSharedQueryState();

    const [cssStateHover, setCssStateHover] = useState(false);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);

    useEffect(() => {
        const isAnyFilterActive = [
            title,
            banosMaximo,
            banosMinimo,
            dormitoriosMaximo,
            dormitoriosMinimo,
            metrosCuadradosMaximo,
            metrosCuadradosMinimo,
            precioMaximo,
            precioMinimo,
            includeBarrios,
            flagReformado,
            flagSinReformar
        ].some(filter => {
            if (typeof filter === 'boolean') {
                return filter;
            }
            return filter !== undefined && filter !== '';
        });

        setCssStateHover(isAnyFilterActive);
    }, [
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradosMaximo,
        metrosCuadradosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar
    ]);

    useEffect(() => {
        let updateProperty = [...entries];

        if (title) {
            updateProperty = updateProperty.filter(house =>
                house.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (banosMinimo) {
            updateProperty = updateProperty.filter(property => getBathrooms(property) >= parseInt(banosMinimo));
        }

        if (banosMaximo) {
            updateProperty = updateProperty.filter(property => getBathrooms(property) <= parseInt(banosMaximo));
        }

        if (dormitoriosMinimo) {
            updateProperty = updateProperty.filter(property => property.charRef.dormitorios >= parseInt(dormitoriosMinimo));
        }

        if (dormitoriosMaximo) {
            updateProperty = updateProperty.filter(property => property.charRef.dormitorios <= parseInt(dormitoriosMaximo));
        }

        if (metrosCuadradosMinimo) {
            updateProperty = updateProperty.filter(property => property.charRef.metrosCuadradros >= parseInt(metrosCuadradosMinimo));
        }

        if (metrosCuadradosMaximo) {
            updateProperty = updateProperty.filter(property => property.charRef.metrosCuadradros <= parseInt(metrosCuadradosMaximo));
        }

        if (precioMinimo) {
            updateProperty = updateProperty.filter(property => property.precio >= parseInt(precioMinimo) * 1000000);
        }

        if (precioMaximo) {
            updateProperty = updateProperty.filter(property => property.precio <= parseInt(precioMaximo) * 1000000);
        }

        if (includeBarrios && includeBarrios.length > 0) {
            updateProperty = updateProperty.filter(property => includeBarrios.includes(property.barrioRef?.name));
        }

        if (flagReformado) {
            updateProperty = updateProperty.filter(property => property.reformado);
        }

        if (flagSinReformar) {
            updateProperty = updateProperty.filter(property => !property.reformado);
        }

        // Sort the filtered properties based on the sortOption
        updateProperty.sort((a, b) => {
            switch (sortOption) {
                case 'priceAsc':
                    return a.precio - b.precio;
                case 'priceDesc':
                    return b.precio - a.precio;
                case 'bedroomsAsc':
                    return a.charRef.dormitorios - b.charRef.dormitorios;
                case 'bedroomsDesc':
                    return b.charRef.dormitorios - a.charRef.dormitorios;
                case 'bathroomsAsc':
                    return getBathrooms(a) - getBathrooms(b);
                case 'bathroomsDesc':
                    return getBathrooms(b) - getBathrooms(a);
                default:
                    return 0; // No sorting
            }
        });

        setFilterProperties(updateProperty);
        setUniqueBoy(updateProperty.length === 1);
    }, [
        title,
        banosMaximo,
        banosMinimo,
        dormitoriosMaximo,
        dormitoriosMinimo,
        metrosCuadradosMaximo,
        metrosCuadradosMinimo,
        precioMaximo,
        precioMinimo,
        includeBarrios,
        flagReformado,
        flagSinReformar,
        sortOption, // Add sortOption to dependencies
        entries
    ]);

    return (
        <>
            <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                {filterProperties.length === 0 ? (
                    <div className="flex justify-center flex-col m-auto">
                        {/* <Logo /> */}
                        <p className="text-center">No encontramos lo que buscas</p>
                        {/* <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button> */}
                    </div>
                ) : (
                    filterProperties.map((entry: Property) => (
                        <PropertyCard property={entry} key={entry.title} cssStateHover={cssStateHover} />
                    ))
                )}
            </div>
        </>
    );
};


/*

    // Count houses per barrio
    const houseCountsByBarrio = barrios.reduce((acc, barrio) => {
        acc[barrio] = entries.filter(entry => entry.barrioRef?.name === barrio).length;
        return acc;
    }, {});


        // // Sorting the filtered houses
        // updatedHouses.sort((a, b) => {
        //     if (sortBy === 'totalRooms') {
        //         const totalRoomsA = a.charRef.dormitorios + a.charRef.banos + a.charRef.aseo;
        //         const totalRoomsB = b.charRef.dormitorios + b.charRef.banos + b.charRef.aseo;
        //         return sortOrder === 'asc' ? totalRoomsA - totalRoomsB : totalRoomsB - totalRoomsA;
        //     }
        //     return sortOrder === 'asc'
        //         ? (a[sortBy as keyof typeof a] as number) - (b[sortBy as keyof typeof b] as number)
        //         : (b[sortBy as keyof typeof b] as number) - (a[sortBy as keyof typeof a] as number);
        // });
*/
