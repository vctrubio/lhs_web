'use client'; // Ensure it's a client-side component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchPropertyByID } from '@/lib/bridges';
import Head from 'next/head';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the lightbox styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFire, faConciergeBell, faBox, faElevator, faCouch, faCar, faSun, faDraftingCompass, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { Property, Amentities, PropiedadCharacteristics } from '@/types/property';

import { useRouter } from 'next/navigation'

/* MetaData for SEO */
// const MetaData = ({ property }) => (
//     <Head>
//         <title>{property.title} - Property Details</title>
//         <meta name="description" content={property.description} />
//         <meta property="og:title" content={property.title} />
//         <meta property="og:description" content={property.description} />
//         <meta property="og:image" content={`https:${property.cover_url[0]}`} />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={property.title} />
//         <meta name="twitter:description" content={property.description} />
//         <meta name="twitter:image" content={`https:${property.cover_url[0]}`} />
//     </Head>
// );

const AmentitiesIcons = ({ amentities }: { amentities: Amentities }) => {
    const iconMap = {
        ac: { icon: faSnowflake, label: 'AC' },
        heating: { icon: faFire, label: 'Calefacion' },
        portero: { icon: faConciergeBell, label: 'Portero' },
        furnished: { icon: faCouch, label: 'Furnished' },
        trastero: { icon: faBox, label: 'Trastero' },
        elevator: { icon: faElevator, label: 'Ascensor' },
        parking: { icon: faCar, label: 'Garaje' },
        rooftop: { icon: faSun, label: 'Atico' },
    };
    const parsedAmentities = Object.entries(amentities).filter(([key, value]) => value && key in iconMap);

    return (
        <div className="flex justify-center items-center gap-4">
            {parsedAmentities.map(([key]) => {
                const { icon, label } = iconMap[key as keyof typeof iconMap];
                return (
                    <div key={key} className="flex flex-col items-center">
                        <FontAwesomeIcon icon={icon} title={label} />
                        <span>{label}</span>
                    </div>
                );
            })}

        </div>
    );
};

interface CharacteristicsIconsProps {
    characteristics: PropiedadCharacteristics;
}

const CharacteristicsIcons: React.FC<CharacteristicsIconsProps> = ({ characteristics }) => {
    const { tipoDePropiedad, dormitorios, banos, aseo, patio, balcones, metrosCuadradros } = characteristics;

    return (
        <div className="flex flex-col justify-between">
            {tipoDePropiedad && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Tipo de Propiedad:</span>
                    <span className="ml-2 text-gray-600">{tipoDePropiedad}</span>
                </div>
            )}
            {dormitorios && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Dormitorios:</span>
                    <span className="ml-2 text-gray-600">{dormitorios}</span>
                </div>
            )}
            {banos && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Baños:</span>
                    <span className="ml-2 text-gray-600">{banos}</span>
                </div>
            )}
            {aseo && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Aseos:</span>
                    <span className="ml-2 text-gray-600">{aseo}</span>
                </div>
            )}
            {patio && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Patio:</span>
                    <span className="ml-2 text-gray-600">{patio}</span>
                </div>
            )}
            {balcones && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Balcones:</span>
                    <span className="ml-2 text-gray-600">{balcones}</span>
                </div>
            )}
            {metrosCuadradros && (
                <div className="flex items-center m-2">
                    <span className="text-lg font-semibold">Metros Cuadrados:</span>
                    <span className="ml-2 text-gray-600">{metrosCuadradros}</span>
                </div>
            )}
        </div>
    );
};


const CardIdPage = ({ params }: { params: { [key: string]: string } }) => {
    const [property, setProperty] = useState<Property | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const { slug } = params;


    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const fetchedProperty = await fetchPropertyByID(slug);
                setProperty(fetchedProperty);
            } catch (error) {
                console.error("Error fetching property:", error);
                setProperty(null); // or handle error state
            }
        };
        fetchProperty();
    }, [slug]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const images = property.cover_url.map(photo => ({
        src: photo
    }));

    return (
        <>
            <div className="page-id">
                <div className={`photo-collage ${property.photos_url.length < 5 ? 'few-photos' : ''}`}>
                    {property.photos_url.map((photo, idx) => (
                        <div
                            key={idx}
                            className={`photo-wrapper photo-${idx}`}
                            onClick={() => {
                                setPhotoIndex(idx);
                                setIsOpen(true);
                            }}
                        >
                            <Image
                                src={photo}
                                alt={property.title}
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                                quality={100}
                            />
                        </div>
                    ))}
                </div>

                {isOpen && (
                    <Lightbox
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={images}
                        index={photoIndex}
                    />
                )}

                <div className="page-id-desc">
                    {property.description}
                </div>
            </div>
        </>
    );
};

export default CardIdPage;


/*
lightbox open plano

{property.plano_url && (
                                <Lightbox
                                    open={isPlanoOpen}
                                    close={() => setIsPlanoOpen(false)}
                                    slides={[{ src: property.plano_url }]}

                                />
                            )}


precios

 <div className='pro-flex'>
                        <div className="property-prices">
                            <div>
                                <span className="text-2xl font-semibold">
                                    {property.precio.toLocaleString()} <span>€</span>
                                </span>
                            </div>
                            <div>
                                {
                                    property.precioIbi !== 0 &&
                                    <div>
                                        IBI: ${property.precioIbi.toLocaleString()}
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    property.precioComunidad !== 0 ? (
                                        <div>
                                            Comunidad: ${property.precioComunidad.toLocaleString()}
                                        </div>
                                    ) : <div></div>
                                }
                            </div>

                        </div>

                    </div>

                    */

/*

             <span>
                                {
                                    property.reformado ? 'Reformado' : 'Para reformar'
                                }
                            </span>
                            
                <div className="property-characteristics">
                            <div>
                                {property.charRef && <CharacteristicsIcons characteristics={property.charRef} />}
                            </div>
                            <div>
                                {property.amentitiesRef && <AmentitiesIcons amentities={property.amentitiesRef} />}
                            </div>
                        </div>

*/