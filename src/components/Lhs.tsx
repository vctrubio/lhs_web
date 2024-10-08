'use client'
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import PhotoPerfil from '@/assets/foto_carnet_victor.png';
interface LhsTvBox {
    title: string;
    content: string;
}

interface LHSCardProps {
    tv?: LhsTvBox;
}

const lhsTitle: LhsTvBox = {
    title: 'LHS',
    content: 'Concept of living -- Looking for the best deals in Madrid'
}

export const LHSCard = ({ tv = lhsTitle }: LHSCardProps) => {

    const SearchBox = () => {
        const [inputWidth, setInputWidth] = useState(22); // Minimum width of 18px

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const textLength = e.target.value.length;
            const newWidth = Math.max(24, textLength * 9); // Adjust the width based on character length
            setInputWidth(Math.min(newWidth, 318)); // Set a maximum width of 400px
        };
        
        return (
            <div className="i-search">
                <div className="i-got-it">
                    <FontAwesomeIcon icon={faSearch} style={{ fontSize: '24px', color: 'black', opacity: '0.6' }} />
                    <input
                        type="text"
                        style={{ width: `${inputWidth}px` }}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="i-got-you">
                    {/* <div>
                        res
                    </div> */}
                </div>
            </div>
        );
    };

    const TVBox = () => {
        return (
            <div className='tv-box'>
                <h1>
                    {tv.title}
                </h1>
                <div className='content'>
                    {tv.content.split('--').map((part: any, index: number) => (
                        <div key={index}>{part}</div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="lhs-concept">
            <div className="lhs-twins">
                <SearchBox />
                <TVBox />
            </div>
        </div>
    );
}

export const LuluCard = () => {

    const PhotoBox = () => {
        return (
            <div style={{ overflow: 'hidden', border: '1px solid transparent', borderRadius: '24px' }}>
                <div className='photo-box'>
                    <Image
                        src={PhotoPerfil}
                        alt='Lourdes Hernansanz'
                        width={300}
                    ></Image>
                </div>
            </div>
        )
    }

    return (

        <div className="lhs-concept" style={{height: '300px'}}>
            <div className="lhs-twins">
                <PhotoBox />
                <div className='title-box'>
                    <h1>Lourdes Hernansanz</h1>
                    <h2>Directora</h2>
                    <h3>Madrid | <span>Luxury Real Estate</span> </h3>
                    <h3>+34 616 746 971</h3>
                </div>
            </div>
        </div>
    )

}