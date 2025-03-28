// Modal.js
import React from 'react';
import './Modal.css'; // Add this CSS file to style the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
