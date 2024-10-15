import { useState, useEffect } from 'react';
import { fetchEntriesContentful } from './bridges';
import { formatPrice } from './utils';
import { parseAsInteger, useQueryState } from 'nuqs'
import {Barrio} from '@/types/property'

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
        setPriceValue([priceRange[0], priceRange[1]]);
        setBathroomValue([bathroomRange[0], bathroomRange[1]]);
        setBedroomValue([bedroomRange[0], bedroomRange[1]]);
        setMetersSquareValue([metersSquareRange[0], metersSquareRange[1]]);
        setSelectedBarrios(barrios);
        setSelectedAmenities([]);
    };

    useEffect(() => {
        if (title === '')
            setTitle(null);

        if (priceValue[0] > priceRange[0])
            setPrecioMinimo(priceValue[0].toString());
        if (priceValue[0] === priceRange[0] && precioMinimo)
            setPrecioMinimo(null);

        if (priceValue[1] < priceRange[1])
            setPrecioMaximo(priceValue[1].toString());
        if (priceValue[1] === priceRange[1] && precioMaximo)
            setPrecioMaximo(null);

        if (bathroomValue[0] > bathroomRange[0])
            setBanosMinimo(bathroomValue[0].toString());
        if (bathroomValue[0] === bathroomRange[0] && banosMinimo)
            setBanosMinimo(null);

        if (bathroomValue[1] < bathroomRange[1])
            setBanosMaximo(bathroomValue[1].toString());
        if (bathroomValue[1] === bathroomRange[1] && banosMaximo)
            setBanosMaximo(null);

        if (bedroomValue[0] > bedroomRange[0])
            setDormitoriosMinimo(bedroomValue[0].toString());
        if (bedroomValue[0] === bedroomRange[0] && dormitoriosMinimo)
            setDormitoriosMinimo(null);

        if (bedroomValue[1] < bedroomRange[1])
            setDormitoriosMaximo(bedroomValue[1].toString());
        if (bedroomValue[1] === bedroomRange[1] && dormitoriosMaximo)
            setDormitoriosMaximo(null);

        if (metersSquareValue[0] > metersSquareRange[0])
            setMetrosCuadradosMinimo(metersSquareValue[0].toString());
        if (metersSquareValue[0] === metersSquareRange[0] && metrosCuadradosMinimo)
            setMetrosCuadradosMinimo(null);

        if (metersSquareValue[1] < metersSquareRange[1])
            setMetrosCuadradosMaximo(metersSquareValue[1].toString());
        if (metersSquareValue[1] === metersSquareRange[1] && metrosCuadradosMaximo)
            setMetrosCuadradosMaximo(null);

        if (selectedBarrios.length > 0 && selectedBarrios.length !== barrios.length)
            setIncludeBarrios(selectedBarrios.join(''));

        if (selectedBarrios.length === 0)
            setIncludeBarrios(null);

        if (selectedBarrios.length === barrios.length)
            setIncludeBarrios(null);

        if (flagReformado === '')
            setFlagReformado(null);

        if (flagSinReformar === '')
            setFlagSinReformar(null);

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

            setPriceValue([formatPrice(minPrice), formatPrice(maxPrice)]);
            setBathroomValue([minBathrooms, maxBathrooms]);
            setBedroomValue([minBedrooms, maxBedrooms]);
            setMetersSquareValue([minMetersSquare, maxMetersSquare]);
            setBarrios(Array.from(barrios));
            setSelectedBarrios(Array.from(barrios));
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
    };
};
