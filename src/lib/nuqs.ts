import { useState, useEffect } from 'react';
import { fetchEntriesContentful } from './bridges';
import { formatPrice } from './utils';
import { useQueryState } from 'nuqs'
import { Barrio, Property } from '@/types/property'

export const useSharedQueryState = () => {
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [bathroomRange, setBathroomRange] = useState([0, 0]);
    const [bedroomRange, setBedroomRange] = useState([0, 0]);
    const [metersSquareRange, setMetersSquareRange] = useState([0, 0]);

    const [priceValue, setPriceValue] = useState([0, 0]);
    const [precioMinimo, setPrecioMinimo] = useQueryState('precioMin', { defaultValue: '' });
    const [precioMaximo, setPrecioMaximo] = useQueryState('precioMax', { defaultValue: '' });

    const [bathroomValue, setBathroomValue] = useState([0, 0]);
    const [banosMinimo, setBanosMinimo] = useQueryState('banosMin', { defaultValue: '' });
    const [banosMaximo, setBanosMaximo] = useQueryState('banosMax', { defaultValue: '' });

    const [bedroomValue, setBedroomValue] = useState([0, 0]);
    const [dormitoriosMinimo, setDormitoriosMinimo] = useQueryState('dormitoriosMin', { defaultValue: '' });
    const [dormitoriosMaximo, setDormitoriosMaximo] = useQueryState('dormitoriosMax', { defaultValue: '' });

    const [metersSquareValue, setMetersSquareValue] = useState([0, 0]);
    const [metrosCuadradosMinimo, setMetrosCuadradosMinimo] = useQueryState('metrosMin', { defaultValue: '' });
    const [metrosCuadradosMaximo, setMetrosCuadradosMaximo] = useQueryState('metrosMax', { defaultValue: '' });

    const [selectedBarrios, setSelectedBarrios] = useState<Barrio[]>([]);
    const [barrios, setBarrios] = useState<Barrio[]>([]);
    const [includeBarrios, setIncludeBarrios] = useQueryState('barrios', { defaultValue: '' });

    const [flagReformado, setFlagReformado] = useQueryState('reformado', { defaultValue: '' });
    const [flagSinReformar, setFlagSinReformar] = useQueryState('aReformar', { defaultValue: '' });

    const [title, setTitle] = useQueryState('buscador', { defaultValue: '' });

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const amenitiesOptions = ['Atico', 'Garaje', 'Balcones', 'Portero'];

    // Use useQueryState for sortOption to manage it as a query parameter
    const [sortOption, setSortOption] = useQueryState('sort', { defaultValue: '' });

    const [properties, setProperties] = useState<Property[]>([]);

    const sortProperties = (properties: Property[], sortOption: string) => {
        switch (sortOption) {
            case 'priceAsc':
                return properties.sort((a, b) => a.precio - b.precio);
            case 'priceDesc':
                return properties.sort((a, b) => b.precio - a.precio);
            case 'bedroomsAsc':
                return properties.sort((a, b) => a.charRef.dormitorios - b.charRef.dormitorios);
            case 'bedroomsDesc':
                return properties.sort((a, b) => b.charRef.dormitorios - a.charRef.dormitorios);
            case 'bathroomsAsc':
                return properties.sort((a, b) => a.charRef.banos - b.charRef.banos);
            case 'bathroomsDesc':
                return properties.sort((a, b) => b.charRef.banos - a.charRef.banos);
            default:
                return properties; // Default sorting logic
        }
    };

    const handleReset = () => {
        setTitle(null);
        setPrecioMinimo(null);
        setPrecioMaximo(null);
        setBanosMinimo(null);
        setBanosMaximo(null);
        setDormitoriosMinimo(null);
        setDormitoriosMaximo(null);
        setMetrosCuadradosMinimo(null);
        setMetrosCuadradosMaximo(null);
        setIncludeBarrios(null);
        setFlagReformado(null);
        setFlagSinReformar(null);

        // Reset the sort option to null to remove it from the URL
        setSortOption(null);

        // Update the slider values to their initial ranges
        setPriceValue([priceRange[0], priceRange[1]]);
        setBathroomValue([bathroomRange[0], bathroomRange[1]]);
        setBedroomValue([bedroomRange[0], bedroomRange[1]]);
        setMetersSquareValue([metersSquareRange[0], metersSquareRange[1]]);
        setSelectedBarrios(barrios);
        setSelectedAmenities([]);
    };

    useEffect(() => {
        if (priceValue[0] > priceRange[0]) {
            setPrecioMinimo(priceValue[0].toString());
        } else if (priceValue[0] === priceRange[0] && precioMinimo) {
            setPrecioMinimo(null);
        }

        if (priceValue[1] < priceRange[1]) {
            setPrecioMaximo(priceValue[1].toString());
        } else if (priceValue[1] === priceRange[1] && precioMaximo) {
            setPrecioMaximo(null);
        }

        if (bathroomValue[0] > bathroomRange[0]) {
            setBanosMinimo(bathroomValue[0].toString());
        } else if (bathroomValue[0] === bathroomRange[0] && banosMinimo) {
            setBanosMinimo(null);
        }

        if (bathroomValue[1] < bathroomRange[1]) {
            setBanosMaximo(bathroomValue[1].toString());
        } else if (bathroomValue[1] === bathroomRange[1] && banosMaximo) {
            setBanosMaximo(null);
        }

        if (bedroomValue[0] > bedroomRange[0]) {
            setDormitoriosMinimo(bedroomValue[0].toString());
        } else if (bedroomValue[0] === bedroomRange[0] && dormitoriosMinimo) {
            setDormitoriosMinimo(null);
        }

        if (bedroomValue[1] < bedroomRange[1]) {
            setDormitoriosMaximo(bedroomValue[1].toString());
        } else if (bedroomValue[1] === bedroomRange[1] && dormitoriosMaximo) {
            setDormitoriosMaximo(null);
        }

        if (metersSquareValue[0] > metersSquareRange[0]) {
            setMetrosCuadradosMinimo(metersSquareValue[0].toString());
        } else if (metersSquareValue[0] === metersSquareRange[0] && metrosCuadradosMinimo) {
            setMetrosCuadradosMinimo(null);
        }

        if (metersSquareValue[1] < metersSquareRange[1]) {
            setMetrosCuadradosMaximo(metersSquareValue[1].toString());
        } else if (metersSquareValue[1] === metersSquareRange[1] && metrosCuadradosMaximo) {
            setMetrosCuadradosMaximo(null);
        }

        if (selectedBarrios.length > 0 && selectedBarrios.length !== barrios.length) {
            setIncludeBarrios(selectedBarrios.map(barrio => barrio.name).join(''));
        } else if (selectedBarrios.length === 0 || selectedBarrios.length === barrios.length) {
            setIncludeBarrios(null);
        }

        if (flagReformado === '') {
            setFlagReformado(null);
        }

        if (flagSinReformar === '') {
            setFlagSinReformar(null);
        }

        if (title === '') {
            setTitle(null);
        }
    }, [title, priceValue, bathroomValue, bedroomValue, metersSquareValue, selectedBarrios, flagReformado, flagSinReformar]);


    useEffect(() => {
        const fetchData = async () => {
            const { properties } = await fetchEntriesContentful();

            let maxPrice = 0, minPrice = Infinity;
            let maxBathrooms = 0, minBathrooms = Infinity;
            let maxBedrooms = 0, minBedrooms = Infinity;
            let maxMetersSquare = 0, minMetersSquare = Infinity;
            let barrios = new Set<Barrio>();
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

                barrios.add(property.barrioRef);
            });

            setPriceRange([formatPrice(minPrice), formatPrice(maxPrice)]);
            setBathroomRange([minBathrooms, maxBathrooms]);
            setBedroomRange([minBedrooms, maxBedrooms]);
            setMetersSquareRange([minMetersSquare, maxMetersSquare]);

            // Set the range states from the fetched data
            setPriceRange([formatPrice(minPrice), formatPrice(maxPrice)]);
            setBathroomRange([minBathrooms, maxBathrooms]);
            setBedroomRange([minBedrooms, maxBedrooms]);
            setMetersSquareRange([minMetersSquare, maxMetersSquare]);

            // Now conditionally set values based on query parameters
            setPriceValue([
                precioMinimo ? parseInt(precioMinimo) : formatPrice(minPrice),
                precioMaximo ? parseInt(precioMaximo) : formatPrice(maxPrice)
            ]);

            setBathroomValue([
                banosMinimo ? parseInt(banosMinimo) : minBathrooms,
                banosMaximo ? parseInt(banosMaximo) : maxBathrooms
            ]);

            setBedroomValue([
                dormitoriosMinimo ? parseInt(dormitoriosMinimo) : minBedrooms,
                dormitoriosMaximo ? parseInt(dormitoriosMaximo) : maxBedrooms
            ]);

            setMetersSquareValue([
                metrosCuadradosMinimo ? parseInt(metrosCuadradosMinimo) : minMetersSquare,
                metrosCuadradosMaximo ? parseInt(metrosCuadradosMaximo) : maxMetersSquare
            ]);

            // Barrios: if query param exists, set the barrios accordingly
            setBarrios(Array.from(barrios));
            if (includeBarrios) {
                const selected = Array.from(barrios).filter(barrio => includeBarrios.includes(barrio.name));
                setSelectedBarrios(selected);
            } else {
                setSelectedBarrios(Array.from(barrios));
            }

            // Sort properties based on the current sort option
            const sortedProperties = sortProperties(properties, sortOption);
            setProperties(sortedProperties);
        };

        fetchData();
    }, [sortOption]); // Re-run the effect when sortOption changes


    // Calculate hasQueryParams based on active query parameters, including sortOption
    const hasQueryParams = [
        precioMinimo, precioMaximo,
        banosMinimo, banosMaximo,
        dormitoriosMinimo, dormitoriosMaximo,
        metrosCuadradosMinimo, metrosCuadradosMaximo,
        includeBarrios, flagReformado, flagSinReformar, title,
        sortOption && sortOption !== '' // Check if sortOption is not empty
    ].some(param => param !== null && param !== '');

    return {
        title, setTitle,
        priceRange, priceValue, setPriceValue,
        bathroomRange, bathroomValue, setBathroomValue,
        bedroomRange, bedroomValue, setBedroomValue,
        metersSquareRange, metersSquareValue, setMetersSquareValue,
        selectedBarrios, setSelectedBarrios,
        barrios, includeBarrios,
        selectedAmenities, setSelectedAmenities,
        amenitiesOptions,
        precioMinimo, setPrecioMinimo,
        precioMaximo, setPrecioMaximo,
        banosMinimo, setBanosMinimo,
        banosMaximo, setBanosMaximo,
        dormitoriosMinimo, setDormitoriosMinimo,
        dormitoriosMaximo, setDormitoriosMaximo,
        metrosCuadradosMinimo, setMetrosCuadradosMinimo,
        metrosCuadradosMaximo, setMetrosCuadradosMaximo,
        flagReformado, setFlagReformado,
        flagSinReformar, setFlagSinReformar,
        handleReset,
        hasQueryParams, // Return hasQueryParams
        sortOption, setSortOption,
        properties, // Return the sorted properties
    };
};
