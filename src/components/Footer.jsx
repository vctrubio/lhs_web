import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    IconWhatsapp,
    IconMail,
    IconFindUs,
    IconInstagram,
} from '@/lib/svgs';

const whatsappNumber = '+34 616 746 971';
const email = 'lhsconcept@lhsconcept.com';
const findUsText = 'Encuentranos en Google';
const instagramHandle = 'lhsconcept';

export const Footer = () => {
    const [targetText, setTargetText] = useState('');

    const iconTexts = {
        whatsapp: String(whatsappNumber),
        email: String(email),
        findus: findUsText,
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

    const handleFindUsClick = () => {
        console.log('Find Us icon clicked');
        window.open('https://maps.app.goo.gl/x4h97NBSPtJitp3n7', '_blank');
    };

    const handleInstagramClick = () => {
        console.log('Instagram icon clicked');
        window.open(`https://www.instagram.com/${instagramHandle}`, '_blank');
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

    return (
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
                    onClick={handleFindUsClick}
                    onMouseEnter={() => handleMouseEnter('findus')}
                >
                    <IconFindUs />
                </div>
            </div>
        </div>
    );
};
