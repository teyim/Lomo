"use client";

import React from "react";
import ReactDOM from "react-dom";
import {X} from "lucide-react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element with id 'modal-root' not found.");
    return null;
  }

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Modal Content */}
      <div
        className="relative z-10 max-w-lg p-6 bg-white rounded shadow-lg"
        onClick={handleContentClick}
      >
        <button
          className="absolute top-1 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={15}/>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
