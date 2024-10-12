'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { IconPlano, IconPrice, IconBath, IconBed, IconMeasure, IconRulerCombined, IconSearch, IconLocation } from '@/lib/svgs'; // Ensure these are imported correctly
import Slider from '@mui/material/Slider';

interface SectionProps {
    title: string | undefined;
    number?: number | null; // Make number optional
    disabled: boolean;
    icon: React.ReactNode; // Use React.ReactNode to allow any valid JSX
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // New onChange prop
}


export const Section: React.FC<SectionProps> = ({
    title,
    disabled,
    number = null,
    icon,
    onChange = () => { } // Default to a no-op function
}) => {
    return (
        <div className='menu'>
            <div>
                <input
                    value={title}
                    onChange={onChange} // Use the onChange prop here
                    disabled={disabled}
                    placeholder={disabled ? '' : 'Buscador'}  // Optional placeholder
                />
                {icon}
            </div>
            {number &&
                <div>
                    <Slider
                        value={number}
                        disabled={disabled}
                        valueLabelDisplay="auto"
                        style={{ color: 'var(--color-green-dark)' }}
                    />
                </div>
            }
        </div>
    );
};

export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null); // Holds the actual property data
    const [loading, setLoading] = useState(true); // Track loading state
    const pathname = usePathname();
    const flagPathname = pathname.split('/').length === 2;

    useEffect(() => {
        const ptrFetch = async () => {
            const pathParts = pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const property = await fetchPropertyByID(lastPart);
            console.log("🚀 ~ ptrFetch ~ property:", property);
            setProperty(property);
            setLoading(false); // Set loading to false when data is fetched
        };

        // Call the data-fetching function
        ptrFetch();
    }, [pathname]);

    return (
        <div className='content'>
            {!flagPathname ? (
                <>
                    <Section
                        title={loading ? '' : property?.title}
                        icon={loading ? null : <IconPlano />}
                        disabled={loading} // Disable inputs while loading
                    />
                </>
            ) : (
                <SearchBar />
            )}
            <div>
                <button className="border border-white rounded-2xl">BTN DESC</button>
            </div>
        </div>
    );
};

/*

                    <Section title="Precio" number={property.precio} icon={<IconPrice />}>
                    </Section>
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