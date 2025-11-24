import './Game.scss';
import { useEffect, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import WinSound from '../../../assets/sounds/Stage-Win_(Super-Mario).mp3';
import ModalWin from '../../../components/Modals/ModalWin.tsx';
import { toggleFullscreen } from '../../../helper-functions';
import { useHighscore } from '../../../helper-functions/Hooks';
import usePlayCount from '../../../helper-functions/Hooks/usePlayCount.tsx';
import { Leseteppich } from '../../../models/interfaces.ts';
import { generateOneLeseteppichArray, useGameStore, useTimerStore } from '../../../store';
import { Timer } from '../Timer/Timer.tsx';

interface GameProps {
  leseTeppich: Leseteppich;
  onStop: () => void;
}

export const Game = ({leseTeppich, onStop}: GameProps) => {
  const theme = useTheme();

  const {saveHighscore} = useHighscore();
  const {addPlayCount} = usePlayCount();

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(0);

  const {timerIsActive, timerIsFinished, pauseTimer} = useTimerStore(
    useShallow((state) => ({
      timerIsActive: state.timerIsActive,
      timerIsFinished: state.timerIsFinished,
      pauseTimer: state.pauseTimer,
    })),
  );

  const {
    gameArray,
    addToGameArray,
    count,
    setCount,
    isWinModalOpen,
    openWinModal,
    isKingsMarked,
    isFullscreen,
    checkFullscreen,
  } = useGameStore(
    useShallow((state) => ({
      gameArray: state.gameArray,
      addToGameArray: state.addToGameArray,
      count: state.count,
      setCount: state.setCount,
      isWinModalOpen: state.isWinModalOpen,
      openWinModal: state.openWinModal,
      isKingsMarked: state.isKingsMarked,
      isFullscreen: state.isFullscreen,
      checkFullscreen: state.checkFullscreen,
    })),
  );

  const isBackDisabled = !timerIsActive || timerIsFinished || count <= 0;
  const isNextDisabled = !timerIsActive || timerIsFinished;

  const teppichGameArray = useMemo(
    () => gameArray.map((gameIndex) => leseTeppich.strings[gameIndex]),
    [gameArray, leseTeppich.strings],
  );

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: index * slideWidth
    });
  };

  const handlePrevClick = () => {
    if (isBackDisabled) return;
    const currentIndex = currentIndexRef.current;
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNextClick = () => {
    if (isNextDisabled) return;
    const currentIndex = currentIndexRef.current;

    const newIndex = currentIndex + 1;
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = container.clientWidth;
      if (!slideWidth) return;

      const index = Math.round(container.scrollLeft / slideWidth);

      if (index !== currentIndexRef.current) {
        currentIndexRef.current = index;
        setCount(index);

        const isLastSlide = index === gameArray.length - 1;
        if (isLastSlide && !timerIsFinished) {
          const newTeppichArray = generateOneLeseteppichArray(leseTeppich.strings.length);
          addToGameArray(newTeppichArray);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, {passive: true});
    return () => container.removeEventListener('scroll', handleScroll);
  }, [gameArray.length, timerIsFinished, addToGameArray, leseTeppich.strings.length, setCount]);

  useEffect(() => {
    if (timerIsFinished) {
      pauseTimer();
      openWinModal();
      saveHighscore();
      addPlayCount(leseTeppich.id);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [timerIsFinished, openWinModal, pauseTimer, audioRef, saveHighscore, addPlayCount, leseTeppich.id]);

  useEffect(() => {
    if (!isWinModalOpen && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isWinModalOpen, audioRef]);

  useEffect(() => {
    checkFullscreen();
    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, [checkFullscreen]);


  return (
    <div className={'flex-column gap-2 w-100'}>
      <Box className={'fullscreen-btn'}>
        <IconButton sx={{backgroundColor: theme.palette.grey['300']}} onClick={toggleFullscreen}>
          {isFullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
        </IconButton>
      </Box>

      <ModalWin/>
      <audio ref={audioRef} src={WinSound}/>

      <AppBar position="fixed" sx={{minHeight: 80, justifyContent: 'center'}}>
        <Toolbar>
          <div className={'game-cockpit'}>
            <Box flex={1} display={'flex'}>
              <Button onClick={onStop}
                      color="error"
                      variant={'contained'}
                      size={'small'}
                      startIcon={<StopOutlinedIcon/>}>
                Stop
              </Button>
            </Box>

            <Box flex={1} display={'flex'} justifyContent={'center'}>
              <Typography variant={'h4'}
                          className={'count-text'}
                          fontFamily={'ABeeZee'}
                          fontSize={24}
                          data-tut="reactour_count">
                {count}
              </Typography>
            </Box>

            <Box flex={1} display={'flex'} justifyContent={'right'}>
              <Timer/>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <div className={'game-row'}>
        <IconButton disabled={isBackDisabled}
                    className="prev-button"
                    onClick={handlePrevClick}>
          <UndoIcon/>
        </IconButton>

        <div className={`snap-container ${!timerIsActive ? "disabled" : ""}`}
             ref={containerRef}>
          {teppichGameArray.map((text, index) => {
            const isLongTeppich = text.length > 44;

            return (
              <div className="snap-slide" key={`${gameArray[index]}-${index}`}>
                <Typography className="snap-card"
                            variant="h3"
                            sx={{
                              fontSize: isLongTeppich ? '2.2em' : '3em',
                              gap: isLongTeppich ? '6px 10px' : '4px 16px',
                              padding: '12px',
                            }}
                            display="flex"
                            justifyContent="center"
                            flexWrap="wrap">
                  {text.split(' ').map((word, wordIndex) => (
                    <div key={wordIndex}>
                      {word.split('').map((char, charIndex) => {
                        const isVokabel = /^[aeiou]$/i.test(char);
                        return (
                          <span key={charIndex}
                                className={`char ${isLongTeppich ? 'small' : ''} ${isVokabel && isKingsMarked ? 'koenig' : ''}`}>
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </Typography>
              </div>
            );
          })}
        </div>

        <IconButton onClick={handleNextClick}
                    color="primary"
                    disabled={isNextDisabled}
                    className="next-button">
          <RedoIcon fontSize={'large'}/>
        </IconButton>
      </div>
    </div>
  );
};