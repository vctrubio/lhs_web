'use client'; // Ensure this is at the top of the file

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useSharedQueryState } from '@/lib/queries';
import { useRouter } from 'next/navigation'; // Make sure to import from next/navigation for Next.js 13+

const Logo = () => {
    return (
        <div className="logo">
            LHS
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

const Footer = () => {
    const handleWhatsAppClick = () => {
        window.open('https://wa.me/34686516248', '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:lhsconcept@lhsconcept.com';
    };

    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('URL copied to clipboard!');
        });
    };

    return (
        <div className='flexy'>
            <div onClick={handleWhatsAppClick} style={{ cursor: 'pointer', margin: '0 10px' }}>
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </div>
            <div onClick={handleEmailClick} style={{ cursor: 'pointer', margin: '0 10px' }}>
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </div>
            <div onClick={handleShareClick} style={{ cursor: 'pointer', margin: '0 10px' }}>
                <FontAwesomeIcon icon={faShareAlt} size="2x" />
            </div>
        </div>
    );
};

const SearchProperties = () => {
    const {
        title, setTitle,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        buyOrRent, setBuyOrRent,
        reformadoFilter, setReformadoFilter,
        bathrooms, setBathrooms,
        bedrooms, setBedrooms,
        size, setSize,
        handleReset,
    } = useSharedQueryState([]);
    
    
    return (
        <div className="content-browser">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='Buscador'
            />
            <div>
                <input
                    value={minPrice || ''}
                    onChange={(e) => setMinPrice(e.target.value)}
                    type='number'
                    placeholder='Min Price'
                />
                <input
                    value={maxPrice || ''}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    type='number'
                    placeholder='Max Price'
                />
            </div>
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
                <input
                    value={bathrooms || ''}
                    onChange={(e) => setBathrooms(e.target.value)}
                    type='number'
                    placeholder='Bathrooms'
                />
                <input
                    value={bedrooms || ''}
                    onChange={(e) => setBedrooms(e.target.value)}
                    type='number'
                    placeholder='Bedrooms'
                />
                <input
                    value={size || ''}
                    onChange={(e) => setSize(e.target.value)}
                    type='number'
                    placeholder='Metros (m2)'
                />
            </div>
            <button onClick={handleReset}>Reset Filters</button>
        </div>
    );
};

export const SideBar = () => {
    return (
        <div className="sidebar-level">
            <div className="top">
                <Logo />
                <Navigation />
            </div>
            <div className="middle">
                <SearchProperties />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};



/*

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