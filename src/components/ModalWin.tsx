import { Box, Fade, Modal, Typography } from "@mui/material";
import { useGameStore } from "../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import LeseLogo from "../assets/Leseteppich_Logo.svg";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalWin = () => {
  const {isWinModalOpen, closeWinModal} = useGameStore(
    useShallow((state) => (
      {isWinModalOpen: state.isWinModalOpen, closeWinModal: state.closeWinModal})),
  )
  const {count} = useGameStore(
    useShallow((state) => (
      {count: state.count})),
  )
  const {initialTimeInSeconds} = useGameStore(
    useShallow((state) => (
      {initialTimeInSeconds: state.initialTimeInSeconds}
    ))
  )


  return (
    <Modal
      open={isWinModalOpen}
      onClose={closeWinModal}
    >
      <Fade in={isWinModalOpen}
            timeout={2300}>
        <Box sx={style}>
          <img src={LeseLogo}
               alt="Leseteppich-Logo"
               height={48}/>
          <Typography variant="h5" component="h2">
            Super gemacht!
          </Typography>
          <Typography variant="h6"
                      fontWeight={400}
                      sx={{mt: 2}}>
            Du hast <mark>{count}</mark> Wörter <br/>
            in {initialTimeInSeconds / 60} {initialTimeInSeconds >= 120 ? "Minuten" : "Minute"} gelesen.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalWin