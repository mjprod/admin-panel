// FullScreenModal.tsx
import React from "react";
import "./FullScreenModal.css";

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          CLOSE
        </button>
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
