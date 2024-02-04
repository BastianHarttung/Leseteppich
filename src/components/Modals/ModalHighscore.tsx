import { useShallow } from "zustand/react/shallow";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGameStore } from "../../store/game-store.ts";
import HighscoreTable from "../Tables/HighscoreTable.tsx";


const ModalHighscore = () => {
  const {isHighscoreModalOpen, closeHighscoreModal} = useGameStore(
    useShallow((state) => (
      {isHighscoreModalOpen: state.isHighscoreModalOpen, closeHighscoreModal: state.closeHighscoreModal}
    ))
  )


  return (
    <Dialog open={isHighscoreModalOpen}
            onClose={closeHighscoreModal}
            scroll={"paper"}>
      <DialogTitle>
        Höchstpunktzahl
        <Box position={"absolute"} right={12} top={12}>
          <IconButton onClick={closeHighscoreModal}>
            <CloseIcon/>
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <HighscoreTable/>
      </DialogContent>

      <DialogActions/>
    </Dialog>
  );
};

export default ModalHighscore;
