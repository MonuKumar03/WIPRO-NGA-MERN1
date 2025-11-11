import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function ModalPortal({ children, onClose }) {
  const modalRoot = document.getElementById('modal-root');
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-portal">
      {children}
    </div>,
    modalRoot
  );
}

export default ModalPortal;