'use client'
import React, { useEffect, useState } from "react";
import { PropertyCard } from '@/components/Property';
import { Property } from "@/types/property";
import { getBathrooms, getRooms } from "@/lib/utils";
import { Logo } from "@/lib/utils";
import { useSharedQueryState } from '@/lib/nuqs';
import { SearchBar } from "./SearchBar";

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
        handleReset
    } = useSharedQueryState();

    const [cssStateHover, setCssStateHover] = useState(false);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);

    useEffect(() => {
        if (title.length > 0)
            setCssStateHover(true);
        else
            setCssStateHover(false);
    }, [title])



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
            updateProperty = updateProperty.filter(property => {
                return property.precio >= parseInt(precioMinimo) * 1000000;
            });
        }

        if (precioMaximo) {
            updateProperty = updateProperty.filter(property => {
                return property.precio <= parseInt(precioMaximo) * 1000000;
            });
        }

        if (includeBarrios) {
            updateProperty = updateProperty.filter(property => {
                return includeBarrios.includes(property.barrioRef?.name);
            });
        }

        if (flagReformado) {
            updateProperty = updateProperty.filter(property => {
                return !property.reformado;
            });
        }

        if (flagSinReformar) {
            updateProperty = updateProperty.filter(property => {
                return property.reformado;
            });
        }

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
    ]);


    return (
        <>
            <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                {filterProperties.length === 0 ? (
                    <div className="flex justify-center flex-col m-auto">
                        <Logo />
                        <p className="text-center">No encontramos lo que buscas</p>
                        <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button>
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
