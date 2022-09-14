import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';

import s from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(state => !state);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={handleToggleModal}
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />

      {isModalOpen && (
        <Modal onCloseModal={handleToggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
