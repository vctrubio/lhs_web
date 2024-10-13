'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { IconPlano, IconPrice, IconBath, IconBed, IconMeasure, IconRulerCombined, IconSearch, IconLocation } from '@/lib/svgs'; // Ensure these are imported correctly
import Slider from '@mui/material/Slider';
import { formatPrice, formatPriceMilToEuro } from '@/lib/utils';
import { useSharedQueryState } from '@/lib/nuqs';
import { useRouter } from 'next/router'; // Import useRouter

interface SliderProps {
    min: number;
    max: number;
    value: number[];
    setValue?: ((value: number[]) => void) | null; // Make setValue optional and allow null
}

interface SectionProps {
    title: string | undefined;
    markValue?: number | null;
    disabled: boolean;
    icon: React.ReactNode; // Use React.ReactNode to allow any valid JSX
    slider?: SliderProps; // Add optional slider prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // New onChange prop
}

export const Section: React.FC<SectionProps> = ({
    title,
    disabled,
    markValue,
    icon,
    slider,
    onChange = () => { },
}) => {
    const marks = slider
        ? [
            { value: slider.min, label: title === 'Precio' ? `${slider.min}M €` : slider.min.toString() },
            { value: slider.max, label: title === 'Precio' ? `${slider.max}M €` : slider.max.toString() },
            ...(markValue !== null && markValue !== undefined
                ? [{ value: markValue, label: title !== 'Precio' && <span style={{ fontWeight: 'bold' }}>{markValue.toString()}</span> }]
                : []),
        ]
        : [];

    const precioValue = title === 'Precio' ? markValue?.toLocaleString('de-DE') : null;
    markValue = title === 'Precio' ? formatPrice(markValue) : markValue;

    return (
        <div className='menu'>
            <div className='px-1'>
                <input
                    value={title}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={disabled ? '' : 'Buscador'}
                />
                <div className='flex items-center'>
                    {precioValue && (
                        <span id='price-color'>
                            {precioValue}
                        </span>
                    )}
                    <div className=''>
                        {icon}
                    </div>
                </div>
            </div>
            {slider && (
                <div className='px-5'>
                    <Slider
                        value={markValue ? markValue : slider.value}
                        onChange={(e, newValue) => slider.setValue(newValue as number[])}
                        min={slider.min}
                        max={slider.max}
                        step={title === 'Precio' ? 0.1 : 1}
                        marks={marks}
                        disableSwap
                        valueLabelDisplay='auto'
                        disabled={disabled}
                        style={{
                            color: 'var(--color-green-dark)',
                            opacity: disabled ? 0.5 : 1,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export const ButtonBottom = ({ lettering, action }: { lettering: string, action?: () => void }) => {
    const handleClick = () => {
        if (lettering === 'arrow-key-back') {
            // router.back(); // Navigate to the previous page
        } else if (action) {
            action(); // Call the action if defined
        }
    };

    return (
        <button onClick={handleClick} className="border border-white rounded-2xl">
            {lettering}
        </button>
    );
};

export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null); // Holds the actual property data
    const [loading, setLoading] = useState(true); // Track loading state
    const disableFlag = true;
    const pathname = usePathname();
    const flagPathname = pathname.split('/').length === 2;

    const {
        priceRange, priceValue,
        bathroomRange, bathroomValue,
        bedroomRange, bedroomValue,
        metersSquareRange,
    } = useSharedQueryState();

    useEffect(() => {
        const ptrFetch = async () => {
            const pathParts = pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const property = await fetchPropertyByID(lastPart);
            console.log("🚀 ~ ptrFetch ~ property:", property)
            setProperty(property);
            setLoading(false);
        };

        ptrFetch();
    }, [pathname]);

    return (
        <div className='content'>
            {!flagPathname ? (
                <>
                    <Section
                        title={loading ? '' : property?.title}
                        icon={loading ? null : <IconPlano />}
                        disabled={disableFlag}
                    />
                    <Section
                        title="Precio"
                        icon={loading ? null : <IconPrice />}
                        disabled={disableFlag}
                        slider={{
                            min: priceRange[0],
                            max: priceRange[1],
                            value: priceValue,
                            setValue: null,
                        }}
                        markValue={(property?.precio)}
                    />
                    <Section
                        title="Dormitorios"
                        markValue={property?.charRef.dormitorios}
                        icon={<IconBed />}
                        disabled={true}
                        slider={{
                            min: bedroomRange[0],
                            max: bedroomRange[1],
                            value: bedroomValue,
                            setValue: null, // Pass null to setValue
                        }}
                    />
                    <Section
                        title="Baños"
                        markValue={property?.charRef.banos}
                        icon={<IconBath />}
                        disabled={true}
                        slider={{
                            min: bathroomRange[0],
                            max: bathroomRange[1],
                            value: bathroomValue,
                            setValue: null, // Pass null to setValue
                        }}
                    />
                    <Section
                        title="Metros"
                        markValue={property?.charRef.metrosCuadradros}
                        icon={<IconMeasure />}
                        disabled={true}
                        slider={{
                            min: metersSquareRange[0],
                            max: metersSquareRange[1],
                            value: [property?.charRef.metrosCuadradros],
                            setValue: null,
                        }}
                    />
                    <ButtonBottom lettering='arrow-key-back' />
                </>
            ) : (
                <SearchBar />
            )}

        </div>
    );
};

/*

Value can also be an array : ie: 
Price 200
IBI 400
Comunidad 230

||
Baños 4
Aseos 1

*/



/*



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