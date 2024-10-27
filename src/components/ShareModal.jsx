import React, { useState } from 'react';
import Modal from 'react-modal';
import { IconWhatsapp, IconMail, IconInstagram, IconShare } from '@/lib/svgs';

const ShareModal = ({ isOpen, onClose, url, propertyInfo }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const getShareText = () => {
        if (!propertyInfo) return url;

        const { title, price, bedrooms, bathrooms, size, description } = propertyInfo;
        const shortDescription = description.split('.')[0]; 

        return `${title}\n\nPrecio: ${price}\nDormitorios: ${bedrooms}\nBaños: ${bathrooms}\nTamaño: ${size} m²\n\n${shortDescription}\n\n${url}`;
    };

    const shareText = getShareText();

    const shareViaWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    };

    const shareViaEmail = () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(propertyInfo?.title || 'Check out this property')}&body=${encodeURIComponent(shareText)}`;
    };

    const shareViaInstagram = () => {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Property details copied to clipboard. You can now paste it into Instagram.');
        });
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopySuccess('Copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            setCopySuccess('Failed to copy');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="share-modal"
            overlayClassName="share-modal-overlay"
        >
            <h2>Share this property</h2>
            {propertyInfo && (
                <div className="property-info">
                    <h3>{propertyInfo.title}</h3>
                    <p>Precio: {propertyInfo.price}</p>
                    <p>Dormitorios: {propertyInfo.bedrooms} | Baños: {propertyInfo.bathrooms} | Tamaño: {propertyInfo.size} m²</p>
                    <p>{propertyInfo.description.split('.')[0]}</p>
                </div>
            )}
            <div className="share-buttons">
                <button onClick={shareViaWhatsApp}><IconWhatsapp /> WhatsApp</button>
                <button onClick={shareViaEmail}><IconMail /> Email</button>
                {/* <button onClick={shareViaInstagram}><IconInstagram /> Instagram</button> */}
            </div>
            <div className="copy-link">
                <input type="text" value={shareText} readOnly />
                <button onClick={copyToClipboard}><IconShare /> Copy</button>
            </div>
            {copySuccess && <p className="copy-success">{copySuccess}</p>}
            <button onClick={onClose} className="close-button">Close</button>
        </Modal>
    );
};

export default ShareModal;
