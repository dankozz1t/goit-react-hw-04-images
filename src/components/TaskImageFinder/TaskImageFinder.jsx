import React, { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { Searchbar } from '../Searchbar';
import { Loader } from '../Loader';
import { ImageGalleryList } from '../ImageGallery';
import { Button } from '../Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './TaskImageFinder.module.css';

const Status = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
});

export function TaskImageFinder() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!search) {
      return;
    }

    setStatus(Status.PENDING);

    api
      .fetchImages(search, page)
      .then(({ data }) => {
        if (data.hits <= 0) {
          toast.info(`Wtf, Idn what "${search}" is`);
          setError('not found');
          setStatus(Status.REJECTED);

          return;
        } else if (page === 1) {
          toast.info(`Im search "${data.total}" images`);
        }

        setImages(state => (page > 1 ? [...state, ...data.hits] : data.hits));
        setTotalImages(data.total);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [page, search]);

  const handleFormSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.box}>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && <ImageGalleryList images={images} />}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (page * 12 < totalImages ? true : false) && (
        <Button onClick={handleLoadMoreClick} />
      )}

      {status === 'rejected' && (
        <>
          <img
            src="https://i.ibb.co/ss9ZJ7L/not-found.jpg"
            alt="not found images"
          />
          <p className={s.error}>
            Error message: <span className={s.errorMessage}>{error}</span>
          </p>
        </>
      )}

      <ToastContainer autoClose={3000} theme="dark" />
    </div>
  );
}
