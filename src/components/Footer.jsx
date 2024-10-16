import {
    IconWhatsapp, IconPlano, IconRepeat, IconRepeatClassic, IconRepeatRound,
    IconSearch, IconDownload, IconUpload,
    IconSendRight,
    IconSendUp,
    IconMail,
    IconDropdown,
    IconPrice,
    IconRulerMeters,
    IconMeasure,
    IconRulerCombined,
    IconBath,
    IconBed,
    IconBathTop,
    IconFindUs,
    IconShare
} from '@/lib/svgs'

const Svgs = () => {
    return (
        <div style={{ border: '1px solid black' }}>
            <div>
                <IconPlano />
            </div>
            <div>
                <IconWhatsapp />
            </div>
            <div>
                <IconRepeat />
            </div>
            <div>
                <IconRepeatClassic />
            </div>
            <div>
                <IconRepeatRound />
            </div>
            <div>
                <IconSearch />
            </div>
            <div>
                <IconDownload />
            </div>
            <div className='border'>
                <IconUpload />
            </div>
            <div className='border'>
                <IconSendRight />
            </div>
            <div className='border'>
                <IconSendUp />
            </div>
            <div>
                <IconMail />
            </div>
            <div>
                <IconDropdown />
            </div>
            <div>
                <IconPrice />
            </div>
            <div>
                <IconRulerMeters />
            </div>

            <div>
                <IconBath />
            </div>
            <div>
                <IconBathTop />
            </div>
            <div>
                <IconBed />
            </div>
        </div>
    );
}

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
            <div className='text-center'>
                {/* //placeholder */}
                Encuentranos en Google
            </div>
            <div className='footer-bar'>
                <IconWhatsapp onClick={handleWhatsAppClick} />
                <IconMail onClick={handleEmailClick} />
                <IconFindUs onClick={handleShareClick} />
                {/* <IconShare onClick={handleShareClick} /> */}
            </div>
        </div>
    );
};