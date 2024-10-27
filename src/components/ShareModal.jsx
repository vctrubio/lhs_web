import React from 'react';
import Modal from 'react-modal';
import { IconWhatsapp, IconMail, IconInstagram } from '@/lib/svgs';

const ShareModal = ({ isOpen, onClose, url }) => {
    const shareViaWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    };

    const shareViaEmail = () => {
        window.location.href = `mailto:?body=${encodeURIComponent(url)}`;
    };

    const shareViaInstagram = () => {
        // Instagram doesn't have a direct share URL, so we'll copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copied to clipboard. You can now paste it into Instagram.');
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="share-modal"
            overlayClassName="share-modal-overlay"
        >
            <h2>Share this page</h2>
            <div className="share-buttons">
                <button onClick={shareViaWhatsApp}><IconWhatsapp /> WhatsApp</button>
                <button onClick={shareViaEmail}><IconMail /> Email</button>
                <button onClick={shareViaInstagram}><IconInstagram /> Instagram</button>
            </div>
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default ShareModal;
