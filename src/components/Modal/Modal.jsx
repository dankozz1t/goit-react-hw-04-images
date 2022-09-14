import React from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export function Modal({ onCloseModal, children }) {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>{children}</div>
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
