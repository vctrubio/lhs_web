'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { SearchBar } from './SearchBar';
import { Content } from './SideBarContentProperty';
import Link from 'next/link';
import { Footer } from '@/components/Footer'
import { Logo } from '@/lib/utils';

const LogoLink = () => {
    return (
        <div className='w-full'>
            <Link href="/">
                <Logo />
            </Link>
        </div>
    );
};

const Navigation = () => {
    const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelected('Propiedades');
    }, []);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navigation">
            <div onClick={toggleDropdown} className="selected-option">
                {selected}
            </div>
            {isOpen && (
                <div className="dropdown">
                    <div onClick={() => handleSelect('Eventos')}>Eventos</div>
                    <div onClick={() => handleSelect('Propiedades')}>Propiedades</div>
                    <div onClick={() => handleSelect('Lifestyle')}>Lifestyle</div>
                </div>
            )}
        </div>
    );
};


export const SideBar = () => {
    return (
        <div className="sidebar-level">
            <div className="top">
                <LogoLink />
                {/* <Navigation /> */}
            </div>
            <div className="middle">
                <Content />
            </div>
            <Footer />
        </div>
    );
};



/*
   <div>
                <select
                    value={buyOrRent}
                    onChange={(e) => setBuyOrRent(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="rent">Rent</option>
                    <option value="buy">Buy</option>
                </select>
            </div>
            <div>
                <select
                    value={reformadoFilter}
                    onChange={(e) => setReformadoFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="reformado">Reformado</option>
                    <option value="sinReformar">Sin reformar</option>
                </select>
            </div>
            
     <div>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="precio">Precio</option>
                    <option value="size">Metrosd</option>
                    <option value="totalRooms">Habitaciones</option>
                </select>
            </div>
            
   <div>
                <label>
                    <input
                        type="checkbox"
                        checked={balcones}
                        onChange={(e) => setBalcones(e.target.checked)}
                    />
                    Balcones
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={parking}
                        onChange={(e) => setParking(e.target.checked)}
                    />
                    Parking
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={portero}
                        onChange={(e) => setPortero(e.target.checked)}
                    />
                    Portero
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={rooftop}
                        onChange={(e) => setRooftop(e.target.checked)}
                    />
                    Rooftop
                </label>
            </div>

            */