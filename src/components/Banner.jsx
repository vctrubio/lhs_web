'use client';

import React from 'react';
import { usePropertyContext } from '@/lib/context';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Banner = () => {
    const { listings, loading, error } = usePropertyContext();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const bannerListing = listings[0]; // Assuming listings is an array of arrays

    return (
        <div style={{ width: '100%', height: '600px'}}>
            {bannerListing && (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                >
                    {bannerListing.map((listing, index) => (
                        <SwiperSlide key={index}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Link href={`/propiedades/${listing.url}`} passHref>
                                    <div style={{ width: '800px', height: '600px', position: 'relative', margin: '0 auto' }}>
                                        <Image
                                            src={listing.photo}
                                            alt={listing.url}
                                            layout="fill" // Fill the parent container
                                            objectFit="cover" // Ensure the image covers the area without distortion
                                            style={{ borderRadius: '12px' }} // Optional: Add border radius for aesthetics
                                        />
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Banner;
