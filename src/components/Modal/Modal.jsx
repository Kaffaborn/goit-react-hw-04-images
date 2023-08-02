import { useEffect } from 'react';
import modalCss from './Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ imageModal, tagModal, closeModal }) {
  useEffect(() => {
    const handleESC = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleESC);
    return () => {
      document.removeEventListener('keydown', handleESC);
    };
  }, [closeModal]);

  return (
    <>
      <div className={modalCss.Overlay} onClick={closeModal}>
        <div className={modalCss.Modal}>
          <img src={imageModal} alt={tagModal} />
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  imageModal: PropTypes.string.isRequired,
  tagModal: PropTypes.string,
};
