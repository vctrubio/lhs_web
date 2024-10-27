import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { usePathname } from 'next/navigation';
import ShareModal from './ShareModal';
import DefaultShareModal from './DefaultShareModal';

import {
    IconWhatsapp,
    IconMail,
    IconFindUs,
    IconInstagram,
    IconShare,
} from '@/lib/svgs';

const whatsappNumber = '+34 616 746 971';
const email = 'lhsconcept@lhsconcept.com';
const findUsText = 'Encuentranos en Google';
const shareText = 'Compartir';
const instagramHandle = 'lhsconcept';

export const Footer = () => {
    const [targetText, setTargetText] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [propertyInfo, setPropertyInfo] = useState(null);
    const pathname = usePathname();
    const isRootUrl = pathname === '/';
    const [isDefaultShareModalOpen, setIsDefaultShareModalOpen] = useState(false);

    const iconTexts = {
        whatsapp: String(whatsappNumber),
        email: String(email),
        findus: isRootUrl ? findUsText : shareText,
        instagram: `@${instagramHandle}`,
    };

    const handleWhatsAppClick = () => {
        console.log('WhatsApp icon clicked');
        window.open(`https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`, '_blank');
    };

    const handleEmailClick = () => {
        console.log('Email icon clicked');
        window.location.href = `mailto:${email}`;
    };

    const handleInstagramClick = () => {
        console.log('Instagram icon clicked');
        window.open(`https://www.instagram.com/${instagramHandle}`, '_blank');
    };

    const handleFindUsOrShareClick = () => {
        if (isRootUrl) {
            console.log('Find Us icon clicked');
            window.open('https://maps.app.goo.gl/x4h97NBSPtJitp3n7', '_blank');
        } else {
            console.log('Share icon clicked');
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(console.error);
            } else {
                setIsDefaultShareModalOpen(true);
            }
        }
    };

    useEffect(() => {
        if (targetText) {
            const timeout = setTimeout(() => {
                setTimeout(() => setTargetText(''), 300);
            }, 3000); 
            return () => clearTimeout(timeout);
        }
    }, [targetText]);

    const handleMouseEnter = (iconKey) => {
        if (targetText === iconTexts[iconKey]) return;
        setTargetText('');
        setTimeout(() => {
            setTargetText(iconTexts[iconKey]);
        }, 300);
    };

    useEffect(() => {
        const fetchPropertyInfo = async () => {
            if (!isRootUrl) {
                const propertyId = pathname.split('/').pop(); // Assuming URL structure like /properties/[id]
                try {
                    const response = await fetch(`/api/properties/${propertyId}`);
                    const data = await response.json();
                    setPropertyInfo({
                        title: data.title,
                        price: data.precio ? `${data.precio}€` : 'Precio no disponible',
                        bedrooms: data.charRef.dormitorios,
                        bathrooms: data.charRef.banos + data.charRef.aseo,
                        size: data.charRef.metrosCuadradros ? `${data.charRef.metrosCuadradros} m²` : 'Tamaño no disponible',
                        description: data.description || 'No hay descripción disponible',
                    });
                } catch (error) {
                    console.error('Error fetching property info:', error);
                }
            }
        };

        fetchPropertyInfo();
    }, [pathname]);

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            }).catch(console.error);
        } else {
            setIsShareModalOpen(true);
        }
    };

    return (
        <>
            <div className='flex flex-col'>
                <div className='footer-placeholder'>
                    <TransitionGroup>
                        {targetText && (
                            <CSSTransition
                                key={targetText}
                                classNames="animate-text"
                            >
                                <div>{targetText}</div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <div className='footer-bar'>
                    <div
                        onClick={handleWhatsAppClick}
                        onMouseEnter={() => handleMouseEnter('whatsapp')}
                    >
                        <IconWhatsapp />
                    </div>
                    <div
                        onClick={handleEmailClick}
                        onMouseEnter={() => handleMouseEnter('email')}
                    >
                        <IconMail />
                    </div>
                    <div
                        onClick={handleInstagramClick}
                        onMouseEnter={() => handleMouseEnter('instagram')}
                        className="footer-icon"
                    >
                        <IconInstagram/>
                    </div>
                    <div
                        onClick={handleFindUsOrShareClick}
                        onMouseEnter={() => handleMouseEnter('findus')}
                        className="icon-transition-wrapper"
                    >
                        <CSSTransition
                            in={isRootUrl}
                            timeout={300}
                            classNames="icon-transition"
                            unmountOnExit
                        >
                            <div className="icon-absolute">
                                <IconFindUs />
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={!isRootUrl}
                            timeout={300}
                            classNames="icon-transition"
                            unmountOnExit
                        >
                            <div className="icon-absolute">
                                <IconShare />
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                url={typeof window !== 'undefined' ? window.location.href : ''}
                propertyInfo={propertyInfo}
            />
            <DefaultShareModal
                isOpen={isDefaultShareModalOpen}
                onClose={() => setIsDefaultShareModalOpen(false)}
                url={typeof window !== 'undefined' ? window.location.href : ''}
            />
        </>
    );
};
