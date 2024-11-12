import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { Box, IconButton, Modal } from "@mui/material";
import { useGameStore } from "../../store/game-store.ts";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

const ModalImage = () => {
  const [teppichPic, setTeppichPic] = useState<string | null>(null)

  const {isImageModalOpen, closeImageModal} = useGameStore(
    useShallow((state) => (
      {isImageModalOpen: state.isImageModalOpen, closeImageModal: state.closeImageModal})),
  )

  const {id} = useParams()

  useEffect(() => {
    const importTeppichPic = async () => {
      try {
        const module = await import(`../../assets/lies-mit-piri/Lies-mit-Piri_${id}.jpg`);
        setTeppichPic(module.default);
      } catch (error) {
        setTeppichPic(null)
        console.error('Fehler beim Laden des Bildes:', error);
      }
    };
    importTeppichPic();
  }, [id]);


  return (
    <Modal open={isImageModalOpen}
           onClose={closeImageModal}>
      <Box sx={style}
           data-tut="reactour_modal-image">
        <Box position={"absolute"} right={8} top={8}>
          <IconButton onClick={closeImageModal}>
            <CloseIcon/>
          </IconButton>
        </Box>

        {teppichPic && <img src={teppichPic}
                            alt={`Leseteppich_${id}.jpg`}
                            style={{height: "100%", width: "100%", objectFit: "contain"}}/>}

      </Box>
    </Modal>
  );
};

export default ModalImage;
