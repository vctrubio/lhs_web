'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { IconPlano, IconPrice, IconBath, IconBed, IconMeasure, IconRulerCombined, IconLocation } from '@/lib/svgs'; // Ensure these are imported correctly

interface SectionProps {
    title: string;
    number: number;
    icon: React.ReactNode; // Use React.ReactNode to allow any valid JSX
    navigationBar: React.ReactNode;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, number, icon, navigationBar, children }) => {
    return (
        <div className='menu'>
            <div>
                <h2>{title}</h2>
                <div className='gap-1' style={{ display: 'flex', alignItems: 'center' }}>
                    <div>{number && number.toLocaleString('de-DE')} </div>
                    <div>
                        {icon} {/* Render the icon here */}
                    </div>
                </div>
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
        return <SearchBar />;
    }

    return (
        <div className='content'>
            {property && (
                <>
                    <Section title={property.title} icon={<IconPlano />} navigationBar={null}>
                        <div></div>
                    </Section>
                    <Section title="Precio" number={property.precio} icon={<IconPrice />} navigationBar={null}>
                        <div>render price bar with marks</div>
                    </Section>
                    <Section title="Baño" number={property.charRef.banos} icon={<IconBath />} navigationBar={null}>
                        <div>number of bathrooms</div>
                    </Section>
                    <Section title="Dormitorio" number={property.charRef.dormitorios} icon={<IconBed />} navigationBar={null}>
                        <div>number of bedrooms</div>
                    </Section>
                    <Section title="Metros" number={property.charRef.metrosCuadradros} icon={<IconMeasure />} navigationBar={null}>
                        <div>square meters</div>
                    </Section>
                    <Section title="Barrio" icon={<IconLocation/>} navigationBar={null}>
                        <div>{property.barrioRef.name}</div>
                    </Section>
                </>
            )}
        </div>
    );
};
