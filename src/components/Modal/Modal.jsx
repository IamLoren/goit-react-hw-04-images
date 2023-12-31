import {  useEffect} from 'react';
import styled from 'styled-components';

export const Modal = ({modalImageUrl, closeModal}) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
 
        return (
    <StyledModal onClick={closeModal}>
      <div>
      <img className="modalImg" src={modalImageUrl} alt="Modal" />
      </div>
    </StyledModal>
  );
};

const StyledModal = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.8);
z-index: 1200;

div{
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
    background-color: white;
}
`;
