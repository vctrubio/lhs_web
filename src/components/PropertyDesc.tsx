'use client'
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding as iconPlano } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';

interface SectionProps {
    title: string;
    number: number;
    icon: IconDefinition;
    navigationBar: React.ReactNode;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, number, icon, navigationBar, children }) => {
    return (
        <div className='menu'>
            <div>
                <h2>{title}</h2>
                {number &&
                    <div>
                        <span>{number.toLocaleString('de-DE')} </span>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                }
            </div>
            <div>{children}</div>
        </div>
    );
};


export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const ptrFetch = async () => {
            const pathParts = pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const property = await fetchPropertyByID(lastPart);
            console.log("🚀 ~ ptrFetch ~ property:", property);
            setProperty(property);
        };

        ptrFetch();
    }, [pathname]);

    if (pathname.split('/').length === 2) {
        return <SearchBar />
    }

    return (
        <div className='content'>
            {property && (
                <>
                    <Section title={property.title} number={0} icon={iconPlano} navigationBar={null}>
                        <div>...</div>
                    </Section>
                    <Section title="Precio" number={property.precio} icon={iconPlano} navigationBar={null}>
                        <div>render price bar with marks</div>
                    </Section>
                    <Section title="Baño" number={property.charRef.banos} icon={iconPlano} navigationBar={null}>
                        <div>number of bathrooms</div>
                    </Section>
                    <Section title="Dormitorio" number={property.charRef.dormitorios} icon={iconPlano} navigationBar={null}>
                        <div>number of bedrooms</div>
                    </Section>
                    <Section title="Metros" number={property.charRef.metrosCuadradros} icon={iconPlano} navigationBar={null}>
                        <div>square meters</div>
                    </Section>
                    <Section title="Barrio" number={0} icon={iconPlano} navigationBar={null}>
                        <div>{property.barrioRef.name}</div>
                    </Section>
                </>
            )}
        </div>
    )
}


// const TestSlider = () => {

//     const [value, setValue] = useState<number[]>([20, 50]);

//     const handleChange = (event: Event, newValue: number | number[]) => {
//         setValue(newValue as number[]);
//     };

//     const marks = [
//         { value: 0, label: '0' },
//         { value: 20, label: '20' },
//         { value: 40, label: '40' },
//         { value: 50, label: '50' },
//     ];


//     return (
//         <div className='px-2 w-full'>
//             <Slider
//                 value={value}
//                 onChange={(e, newValue) => setValue(newValue as number[])}
//                 marks={marks}
//                 min={0}
//                 max={50}
//                 disableSwap
//             />
//         </div>
//     );
// }

