'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { fetchPropertyByID } from '@/lib/bridges';
import { Property } from '@/types/property';
import { IconPlano, IconPrice, IconBath, IconBed, IconMeasure, IconRulerCombined, IconSearch, IconLocation } from '@/lib/svgs'; // Ensure these are imported correctly
import Slider from '@mui/material/Slider';
import { formatPrice } from '@/lib/utils';

interface SliderProps {
    min: number;
    max: number;
    value: number[];
    setValue: (value: number[]) => void;
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
                ? [{ value: markValue, label: <span style={{ fontWeight: 'bold' }}>{markValue.toString()}</span> }]
                : []),
        ]
        : [];

    return (
        <div className='menu'>
            <div className='px-1'>
                <input
                    value={title}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={disabled ? '' : 'Buscador'}
                />
                {icon}
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

const ButtonBottom = ({ lettering, action }: { lettering: string, action: void | undefined }) => {
    return (
        <button onClick={action} className="border border-white rounded-2xl">{lettering}</button>
    )
}



export const Content = () => {
    const [property, setProperty] = useState<Property | null>(null); // Holds the actual property data
    const [loading, setLoading] = useState(true); // Track loading state
    const disableFlag = true;
    const pathname = usePathname();
    const flagPathname = pathname.split('/').length === 2;


    const [priceValue, setPriceValue] = useState<number[]>([0, 8]); // Default value for slider, adapt it as per your property structure
    const [banoValue, setBanoValue] = useState<number[]>([0, 5]); // Default value for slider, adapt it as per your property structure

    useEffect(() => {
        const ptrFetch = async () => {
            const pathParts = pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const property = await fetchPropertyByID(lastPart);
            // console.log("🚀 ~ ptrFetch ~ property:", property);
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
                            min: priceValue[0],
                            max: priceValue[1],
                            value: priceValue,
                            setValue: setPriceValue,
                        }}
                        markValue={formatPrice(property?.precio)}
                        
                    />  
                    <Section
                        title="Baños"
                        markValue={property?.charRef.banos}
                        icon={<IconBath />}
                        disabled={true}
                        slider={{
                            min: banoValue[0],
                            max: banoValue[1],
                            value: banoValue,
                            setValue: setBanoValue,
                        }}
                    />

                </>
            ) : (
                <SearchBar />
            )}
            {!flagPathname ? (<>
                <ButtonBottom lettering='arrow-key-back' />
            </>) : (<>
                <ButtonBottom lettering='Reset Filters' action={() => console.log('hello clickable')} />
            </>)
            }
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