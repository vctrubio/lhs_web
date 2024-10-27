import React from 'react';
import Modal from 'react-modal';
import { IconWhatsapp, IconMail, IconInstagram } from '@/lib/svgs';

const DefaultShareModal = ({ isOpen, onClose, url }) => {
  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?body=${encodeURIComponent(url)}`;
  };

  const shareViaInstagram = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard. You can now paste it into Instagram.');
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="default-share-modal"
      overlayClassName="default-share-modal-overlay"
    >
      <h2>Share this page</h2>
      <div className="default-share-buttons">
        <button onClick={shareViaWhatsApp}><IconWhatsapp /> WhatsApp</button>
        <button onClick={shareViaEmail}><IconMail /> Email</button>
        <button onClick={shareViaInstagram}><IconInstagram /> Instagram</button>
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default DefaultShareModal;
