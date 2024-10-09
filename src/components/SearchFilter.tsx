'use client'
import React, { useEffect, useState } from "react";
import { PropertyCard } from '@/components/Property';
import { Property } from "@/types/property";
import { getRooms } from "@/lib/utils";
import { Logo } from "@/lib/utils";
import { useSharedQueryState } from '@/lib/queries';
import { SearchProperties } from "./sidebar";

//for server side {params, searchParams} as props
export const SNF = ({ entries }: { entries: Property[] }) => {
    const [filteredHouses, setFilteredHouses] = useState<Property[]>(entries);

    const {
        title, minPrice, maxPrice,
        buyOrRent, sortOrder, sortBy,
        bedrooms, bathrooms,
        reformadoFilter, selectedBarrios,
        size,
        handleReset
    } = useSharedQueryState();

    const [cssStateHover, setCssStateHover] = useState(false);
    const [cssUniqueBoy, setUniqueBoy] = useState(false);

    useEffect(() => {
        if (title.length > 0 || sortBy !== 'precio' || reformadoFilter !== 'all')
            setCssStateHover(true);
        else
            setCssStateHover(false);
    }, [title, sortBy, reformadoFilter])


    useEffect(() => {
        let updatedHouses = [...entries];

        if (title) {
            updatedHouses = updatedHouses.filter(house =>
                house.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (buyOrRent && buyOrRent !== 'all') {
            updatedHouses = updatedHouses.filter(house =>
                buyOrRent === 'buy' ? house.buyOrRent : !house.buyOrRent
            );
        }

        if (minPrice) {
            updatedHouses = updatedHouses.filter(house => house.precio >= parseInt(minPrice));
        }

        if (maxPrice) {
            updatedHouses = updatedHouses.filter(house => house.precio <= parseInt(maxPrice));
        }

        if (selectedBarrios && selectedBarrios.length > 0) {
            updatedHouses = updatedHouses.filter(house =>
                selectedBarrios.includes(house.barrioRef?.name)
            );
        }

        if (reformadoFilter === 'reformado') {
            updatedHouses = updatedHouses.filter(house => house.reformado === true);
        } else if (reformadoFilter === 'sinReformar') {
            updatedHouses = updatedHouses.filter(house => house.reformado === false);
        }

        if (bedrooms) {
            updatedHouses = updatedHouses.filter(house => house.charRef.dormitorios >= parseInt(bedrooms));
        }

        if (bathrooms) {
            updatedHouses = updatedHouses.filter(house => (house.charRef.banos + house.charRef.aseo) >= parseInt(bathrooms));
        }

        if (size) {
            updatedHouses = updatedHouses.filter(house => house.charRef.metrosCuadradros >= parseInt(size));
        }


        setFilteredHouses(updatedHouses);
        setUniqueBoy(updatedHouses.length === 1);
    }, [title, minPrice, maxPrice, buyOrRent, sortOrder, sortBy, selectedBarrios, reformadoFilter, bedrooms, bathrooms, size, entries]);


    return (
        <>
            <div className="property-container" last-man-standing={cssUniqueBoy ? 'on' : ''}>
                {filteredHouses.length === 0 ? (
                    <div className="flex justify-center flex-col m-auto">
                        <Logo />
                        <p className="text-center">No encontramos lo que buscas</p>
                        <button onClick={handleReset} className="border border-white rounded-2xl">Reset Filters</button>
                    </div>
                ) : (
                    filteredHouses.map((entry: Property) => (
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

{/* <LeftBar
                setSearchQuery={setSearchQuery}
                setSortOrder={setSortOrder}
                setSortBy={setSortBy}
                setFilter={setFilter}
                handleReset={handleReset}
                allBarrios={allBarrios}
                selectedBarrios={selectedBarrios}
                setSelectedBarrios={setSelectedBarrios}
                searchQuery={searchQuery}
                filter={filter}
                sortBy={sortBy}
                sortOrder={sortOrder}
                houseCountsByBarrio={houseCountsByBarrio} // Pass the house counts
                reformadoFilter={reformadoFilter} // Pass reformado filter
                setReformadoFilter={setReformadoFilter} // Function to update the reformado filter
            /> */}