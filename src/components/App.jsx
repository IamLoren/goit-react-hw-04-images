import { useState, useEffect } from 'react';
import { getAllimages, getImagesByQuery } from '../services/api.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { ColorRing } from 'react-loader-spinner';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

useEffect(() => {
  async function getImagesFromBack () {
    try {
      setLoading(true);
      const allImages = await getAllimages();
      setSearchResult(allImages.hits)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  getImagesFromBack();
}, [])

 const onSubmit = event => {
    event.preventDefault();
    setPage(1);
    setLoading(true)
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    async function getImmages () {
        try {
        setLoading(true)
        const allImages = await getImagesByQuery(searchQuery, page);
        if (page === 1) {
          setSearchResult(allImages.hits);
        } else {
          setSearchResult((prevState) => [...prevState, ...allImages.hits]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }

    }
      getImmages();

  }, [searchQuery, page])

 const  addMoreImages = async () => {
  setPage(prev => prev + 1);
  };

 const openModal = imgUrl => {
  setIsModalOpen(prev => !prev);
  setModalImageUrl(imgUrl);
  };

 const closeModal = () => {
  setIsModalOpen(prev => !prev);
  };

    return (
      <div>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery
          images={searchResult}
          openModal={openModal}
        />
        <Button addMoreImages={addMoreImages} />
        {loading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {isModalOpen && (
          <Modal
            modalImageUrl={modalImageUrl}
            closeModal={closeModal}
          />
        )}
      </div>
    );
}
