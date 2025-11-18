import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import confetti from 'canvas-confetti';
import { Box, Fade, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LeseLogo from '../../assets/Leseteppich_Logo.svg';
import Funki1 from '../../assets/funki/Funki_Freude_01.svg';
import Piri1 from '../../assets/piri/Piri_1.png';
import Piri2 from '../../assets/piri/Piri_2.png';
import Piri3 from '../../assets/piri/Piri_3.png';
import { useGameStore, useTimerStore } from '../../store';


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

const images = [Funki1, Piri1, Piri2, Piri3];

const getRandomImage = () => {
  const randomNr = Math.floor(Math.random() * images.length);
  return images[randomNr];
};

const ModalWin = () => {
  const {
    isWinModalOpen, closeWinModal,
    count,
  } = useGameStore(
    useShallow((state) => (
      {
        isWinModalOpen: state.isWinModalOpen,
        closeWinModal: state.closeWinModal,
        count: state.count,
      })),
  );
  const {initialTimeInSeconds} = useTimerStore(
    useShallow((state) => (
      {initialTimeInSeconds: state.initialTimeInSeconds}
    )),
  );

  const piriPic = useMemo(() => {
    if (!isWinModalOpen) return null;
    return getRandomImage();
  }, [isWinModalOpen]);

  useEffect(() => {
    if (isWinModalOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6},
        zIndex: 9999,
      });
      const duration = 8 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999};

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

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
          origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
        });
        confetti({
          ...defaults,
          particleCount,
          origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
        });
      }, 250);
    }
  }, [isWinModalOpen]);


  return (
    <Modal open={isWinModalOpen}
           onClose={closeWinModal}>
      <Fade in={isWinModalOpen}
            timeout={2000}>
        <Box sx={style}>
          <Box position={'absolute'} right={8} top={8}>
            <IconButton onClick={closeWinModal}>
              <CloseIcon/>
            </IconButton>
          </Box>

          <Box display={'flex'} alignItems={'center'} gap={2}>
            {piriPic && <img src={piriPic} alt="Piri" height={160}/>}

            <Box>
              <img src={LeseLogo}
                   alt="Leseteppich-Logo"
                   height={48}/>
              <Typography variant="h5" component="h2">
                Super gemacht!
              </Typography>
              <Typography variant="h6"
                          fontWeight={400}
                          sx={{mt: 2}}
                          whiteSpace={'nowrap'}>
                Du hast <mark>{count}</mark> Wörter <br/>
                in {initialTimeInSeconds / 60} {initialTimeInSeconds >= 120 ? 'Minuten' : 'Minute'} gelesen.
              </Typography>
            </Box>
          </Box>

        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalWin;
