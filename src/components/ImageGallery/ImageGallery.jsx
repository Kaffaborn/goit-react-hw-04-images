import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';

import IGCss from './ImageGallery.module.css';

export function ImageGallery({ addMore, openModal, imageBase, total, load }) {
  return (
    <>
      <ul className={IGCss.ImageGallery}>
        {imageBase.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              imageForModal={largeImageURL}
              openModal={openModal}
            />
          );
        })}
      </ul>

      {load && <Loader />}

      {imageBase.length > 0 && imageBase.length < total && (
        <Button addMore={addMore} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  addMore: PropTypes.func.isRequired,
  imageBase: PropTypes.array.isRequired,
  load: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
};
