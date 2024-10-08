export interface PropiedadCharacteristics {
    // title: string;
    tipoDePropiedad: string;
    dormitorios: number;
    banos: number;
    aseo: number;
    patio: number;
    balcones: number;
    metrosCuadradros: number;
}

interface PropiedadHabitacion {
    title: string;
    propiedadDe: string;
    description: string;
    photos: string[]; // Array of URLs or image file paths
}

export interface Barrio {
    name: string;
    rating: number;
    description: string;
    longDescription: string;
}

export interface Amentities {
    // title: string;
    AC: boolean;
    Heating: boolean;
    Rooftop: boolean;
    Furnished: boolean;
    Portero: boolean;
    Trastero: boolean;
    Elevator: boolean;
    Parking: boolean;
}

export interface Property {
    title: string;
    url: string; 
    description: string;
    buyOrRent: boolean;
    reformado: boolean;
    precio: number;
    precioIbi: number;
    precioComunidad: number;
    plano_url: string;
    cover_url: string[];
    photos_url: string[];

    barrioRef: Barrio;
    amentitiesRef: Amentities;
    charRef: PropiedadCharacteristics;
    roomsRef: PropiedadHabitacion[];
    updatedAt: string;
    canva_id: string | null;
}

export interface PropertyCardProps {
    property: Property;
}

export interface BannerListings{
    title: string;
    photo: string;
    url: string;
}