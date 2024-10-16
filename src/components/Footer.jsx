import {
    IconWhatsapp, 
    IconMail,
    IconFindUs,
    IconShare
} from '@/lib/svgs'


export const Footer = () => {
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
        <div className='flex flex-col'>
            <div className='footer-placeholder'>
                Encuentranos en Google
            </div>
            <div className='footer-bar'>
                <IconWhatsapp onClick={handleWhatsAppClick} />
                <IconMail onClick={handleEmailClick} />
                <IconFindUs onClick={handleShareClick} />
            </div>
        </div>
    );
};

// {/* <IconShare onClick={handleShareClick} /> */}