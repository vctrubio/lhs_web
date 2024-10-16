import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    IconWhatsapp,
    IconMail,
    IconFindUs,
} from '@/lib/svgs';

const whatsappNumber = '+34 686 516 248';
const email = 'lhsconcept@lhsconcept.com';
const findUsText = 'Encuentranos en Google';

export const Footer = () => {
    const [targetText, setTargetText] = useState('');

    const iconTexts = {
        whatsapp: String(whatsappNumber),
        email: String(email),
        findus: findUsText,
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
        window.open('https://www.google.com/maps/search/?api=1&query=lhsconcept', '_blank');
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
                    onClick={handleFindUsClick}
                    onMouseEnter={() => handleMouseEnter('findus')}
                >
                    <IconFindUs />
                </div>
            </div>
        </div>
    );
};
