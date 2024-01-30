import { useShallow } from "zustand/react/shallow";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGameStore } from "../../store/game-store.ts";
import HighscoreTable from "../Tables/HighscoreTable.tsx";


const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: "flex-start",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const ModalHighscore = () => {
  const {isHighscoreModalOpen, closeHighscoreModal} = useGameStore(
    useShallow((state) => (
      {isHighscoreModalOpen: state.isHighscoreModalOpen, closeHighscoreModal: state.closeHighscoreModal}
    ))
  )


  return (
    <Modal open={isHighscoreModalOpen}
           onClose={closeHighscoreModal}>
      <Box sx={style}>
        <Box position={"absolute"} right={8} top={8}>
          <IconButton onClick={closeHighscoreModal}>
            <CloseIcon/>
          </IconButton>
        </Box>

        <Box>
          <Typography variant={"h6"}>Höchstpunktezahl</Typography>
        </Box>

        <Box sx={{width: "100%", height: "100%"}}>
          <HighscoreTable/>
        </Box>

      </Box>
    </Modal>
  );
};

export default ModalHighscore;
