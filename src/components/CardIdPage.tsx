'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Property } from '@/types/property';

const CardIdPage = ({ property }: { property: Property | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    if (!property) {
        return <div></div>;
    }

    const images = property.photos_url.map(photo => ({
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
                                fill
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                                quality={100}
                                title={`${property.title} -  ${idx + 1}`}
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

// ... (rest of the file remains unchanged)
