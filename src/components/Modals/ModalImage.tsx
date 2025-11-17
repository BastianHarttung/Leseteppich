import './ModalImage.scss';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { printImage } from '../../helper-functions/index.ts';
import { useGameStore } from '../../store/game-store.ts';
import { useJsonStore } from '../../store/json-store.ts';


const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

const ModalImage = () => {
  const {id} = useParams();

  const {isImageModalOpen, closeImageModal} = useGameStore(
    useShallow((state) => (
      {isImageModalOpen: state.isImageModalOpen, closeImageModal: state.closeImageModal})),
  );

  const {json} = useJsonStore();

  const findTeppich = json?.find((tepp) => tepp.id === Number(id));

  const handlePrintImage = () => {
    if (!findTeppich?.images) return;
    printImage(findTeppich.images[0], id);
  };


  return (
    <Modal open={isImageModalOpen}
           onClose={closeImageModal}>
      <Box sx={boxStyle}
           data-tut="reactour_modal-image">
        <Box position={'absolute'} right={8} top={8}>
          <IconButton className="icon-button"
                      onClick={closeImageModal}>
            <CloseIcon/>
          </IconButton>
        </Box>

        {findTeppich?.images && <img src={findTeppich.images[0]}
                                     alt={`Leseteppich_${id}.jpg`}
                                     style={{height: '100%', width: '100%', objectFit: 'contain'}}/>}

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
