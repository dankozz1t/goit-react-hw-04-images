import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export function Modal({ onCloseModal, children }) {
  useEffect(() => {
    const handleKeydownModal = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydownModal);

    return () => window.removeEventListener('keydown', handleKeydownModal);
  }, [onCloseModal]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>
        {children}
        <button type="button" className={s.Button} onClick={handleCloseModal}>
          Close for bad user
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
