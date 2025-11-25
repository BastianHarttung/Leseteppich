import './ModalImage.scss';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { useGameStore, useJsonStore } from '../../store/index.ts';
import LeseteppichImage from '../Leseteppich-Image/LeseteppichImage.tsx';


const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '88%',
  height: '88%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 4,
  pr: 4,
  pb: 3,
  pl: 3,
};

const ModalImage = () => {
  const {id} = useParams();

  const {isImageModalOpen, closeImageModal} = useGameStore(
    useShallow((state) => (
      {isImageModalOpen: state.isImageModalOpen, closeImageModal: state.closeImageModal})),
  );

  const {leseteppiche} = useJsonStore();

  const findTeppich = leseteppiche?.find((tepp) => tepp.id === Number(id));

  const handleShowImage = () => {
    if (!findTeppich?.images.length) return;

    const imageUrl = findTeppich.images[0];
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };


  const handlePrintImage = () => {
    if (!findTeppich?.images.length) return;
    const oldTitle = document.title;
    document.title = `www.schul-apps.de | Leseteppich ${id}`;
    window.print();
    document.title = oldTitle;
  };


  return (
    <Modal open={isImageModalOpen}
           onClose={closeImageModal}>
      <Box sx={boxStyle}
           data-tut="reactour_modal-image">
        <Box position={'absolute'} right={8} top={8} zIndex={1}>
          <IconButton className="icon-button"
                      onClick={closeImageModal}>
            <CloseIcon/>
          </IconButton>
        </Box>

        {id && <LeseteppichImage id="printable-image"
                                 teppichId={id}
                                 size="fullsize"
                                 onClick={handleShowImage}/>}

        {/*{findTeppich?.images && (*/}
        {/*  <img id="printable-image"*/}
        {/*       src={findTeppich.images[0]}*/}
        {/*       alt={`Leseteppich_${id}.jpg`}*/}
        {/*       onClick={handleShowImage}*/}
        {/*       className="printable-image"/>*/}
        {/*)}*/}

        <Box position={'absolute'} right={10} bottom={10}>
          <IconButton className="icon-button"
                      color={'primary'}
                      onClick={handlePrintImage}>
            <PrintIcon/>
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalImage;
