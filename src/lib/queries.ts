import { useState, useEffect } from 'react';
import { fetchEntriesContentful } from './bridges'; // assuming this fetches data
import { formatPrice } from './utils';

export const useSharedQueryState = () => {
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [bathroomRange, setBathroomRange] = useState([0, 0]);
    const [bedroomRange, setBedroomRange] = useState([0, 0]);
    const [metersSquareRange, setMetersSquareRange] = useState([0, 0]);

    const [priceValue, setPriceValue] = useState([0, 0]);
    const [bathroomValue, setBathroomValue] = useState([0, 0]);
    const [bedroomValue, setBedroomValue] = useState([0, 0]);
    const [metersSquareValue, setMetersSquareValue] = useState([0, 0]);
    const [selectedBarrios, setSelectedBarrios] = useState<string[]>([]);
    const [barrios, setBarrios] = useState<string[]>([]);
    const [title, setTitle] = useState('');

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const amenitiesOptions = ['Atico', 'Garaje', 'Balcones', 'Portero'];

    const handleReset = () => {
        setTitle('');
        setPriceValue([priceRange[0], priceRange[1]]);
        setBathroomValue([bathroomRange[0], bathroomRange[1]]);
        setBedroomValue([bedroomRange[0], bedroomRange[1]]);
        setMetersSquareValue([metersSquareRange[0], metersSquareRange[1]]);
        setSelectedBarrios(barrios);
        setSelectedAmenities([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { properties} = await fetchEntriesContentful();

            let maxPrice = 0, minPrice = Infinity;
            let maxBathrooms = 0, minBathrooms = Infinity;
            let maxBedrooms = 0, minBedrooms = Infinity;
            let maxMetersSquare = 0, minMetersSquare = Infinity;
            let barrios = new Set<string>();
            properties.forEach(property => {
                const { precio, charRef: { banos, dormitorios, metrosCuadradros } } = property;

                if (precio > maxPrice) maxPrice = precio;
                if (precio < minPrice) minPrice = precio;

                if (banos > maxBathrooms) maxBathrooms = banos;
                if (banos < minBathrooms) minBathrooms = banos;

                if (dormitorios > maxBedrooms) maxBedrooms = dormitorios;
                if (dormitorios < minBedrooms) minBedrooms = dormitorios;

                if (metrosCuadradros > maxMetersSquare) maxMetersSquare = metrosCuadradros;
                if (metrosCuadradros < minMetersSquare) minMetersSquare = metrosCuadradros;

                barrios.add(property.barrioRef?.name);
            });

            setPriceRange([formatPrice(minPrice), formatPrice(maxPrice)]);
            setBathroomRange([minBathrooms, maxBathrooms]);
            setBedroomRange([minBedrooms, maxBedrooms]);
            setMetersSquareRange([minMetersSquare, maxMetersSquare]);
      
            setPriceValue([formatPrice(minPrice), formatPrice(maxPrice)]);
            setBathroomValue([minBathrooms, maxBathrooms]);
            setBedroomValue([minBedrooms, maxBedrooms]);
            setMetersSquareValue([minMetersSquare, maxMetersSquare]);
            setBarrios(Array.from(barrios));
        };

        fetchData();
    }, []);

    return {
        title, setTitle,
        priceRange, priceValue, setPriceValue,
        bathroomRange, bathroomValue, setBathroomValue,
        bedroomRange, bedroomValue, setBedroomValue,
        metersSquareRange, metersSquareValue, setMetersSquareValue,
        selectedBarrios, setSelectedBarrios,
        barrios, setBarrios,
        selectedAmenities, setSelectedAmenities,
        amenitiesOptions,
        handleReset
    };
};
