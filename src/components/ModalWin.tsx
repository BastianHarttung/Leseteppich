import { Box, Fade, Modal, Typography } from "@mui/material";
import { useGameStore } from "../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import LeseLogo from "../assets/Leseteppich_Logo.svg";
import confetti from "canvas-confetti"
import { useEffect } from "react";


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

  useEffect(() => {
    if (isWinModalOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6},
        zIndex: 9999
      })
      const duration = 8 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999};

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
        });
        confetti({
          ...defaults,
          particleCount,
          origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
        });
      }, 250);
    }
  }, [isWinModalOpen]);


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