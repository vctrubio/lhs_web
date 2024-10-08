import { useQueryState } from 'nuqs';
import {fetchEntriesContentful} from './bridges';

export const useSharedQueryState = () => {
    const [title, setTitle] = useQueryState('title', { defaultValue: '' });
    const [minPrice, setMinPrice] = useQueryState('minPrice');
    const [maxPrice, setMaxPrice] = useQueryState('maxPrice');
    const [buyOrRent, setBuyOrRent] = useQueryState('buy', { defaultValue: 'all' });
    const [reformadoFilter, setReformadoFilter] = useQueryState('reformado', { defaultValue: 'all' });
    const [sortOrder, setSortOrder] = useQueryState('sortOrder', { defaultValue: 'desc' });
    const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: 'precio' });
    const [bedrooms, setBedrooms] = useQueryState('bedrooms');
    const [bathrooms, setBathrooms] = useQueryState('bathrooms');
    const [size, setSize] = useQueryState('metros');
    const [balcones, setBalcones] = useQueryState('balcones', { defaultValue: false });
    const [parking, setParking] = useQueryState('parking', { defaultValue: false });
    const [portero, setPortero] = useQueryState('portero', { defaultValue: false });
    const [rooftop, setRooftop] = useQueryState('rooftop', { defaultValue: false });

    const barrios = ["Serrano", "Goya", "Velazquez"];    

    const [selectedBarrios, setSelectedBarrios] = useQueryState('barrios', { defaultValue: '' });

    const handleReset = () => {
        setTitle(null);
        setMinPrice(null);
        setMaxPrice(null);
        setBuyOrRent(null);
        setReformadoFilter(null);
        setBedrooms(null);
        setBathrooms(null);
        setSize(null);
    };


    return { 
        title, setTitle, 
        minPrice, setMinPrice, 
        maxPrice, setMaxPrice, 
        buyOrRent, setBuyOrRent, 
        sortOrder, setSortOrder, 
        sortBy, setSortBy, 
        reformadoFilter, setReformadoFilter, 
        selectedBarrios, setSelectedBarrios, 
        bathrooms, setBathrooms,
        bedrooms, setBedrooms,
        size, setSize,
        barrios,
        balcones, setBalcones,
        parking, setParking,
        portero, setPortero,
        rooftop, setRooftop,
        handleReset 
    };
};