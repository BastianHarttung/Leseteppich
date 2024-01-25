import "./Game.scss";
import { useEffect, useRef } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Timer } from "../Timer/Timer.tsx";
import { generateOneLeseteppichArray, useGameStore } from "../../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import ModalWin from "../../../components/ModalWin.tsx";
import { Leseteppich } from "../../../models/interfaces.ts";
import WinSound from "../../../assets/sounds/Stage-Win_(Super-Mario).mp3";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { toggleFullscreen } from "../../../helper-functions";

interface GameProps {
  leseTeppich: Leseteppich,
  onStop: () => void,
}

export const Game = ({leseTeppich, onStop}: GameProps) => {

  const theme = useTheme()

  const audioRef = useRef<HTMLAudioElement>(null);

  const {timerSeconds, timerIsActive, pauseTimer} = useGameStore(
    useShallow((state) => (
      {timerSeconds: state.timerSeconds, timerIsActive: state.timerIsActive, pauseTimer: state.pauseTimer})),
  )
  const isTimerFinished = timerSeconds <= 0

  const {decreaseCount} = useGameStore(
    useShallow((state) => (
      {decreaseCount: state.decreaseCount})),
  )
  const {gameArray, addToGameArray} = useGameStore(
    useShallow((state) => (
      {gameArray: state.gameArray, addToGameArray: state.addToGameArray})),
  )
  const {count, increaseCount} = useGameStore(
    useShallow((state) => (
      {count: state.count, increaseCount: state.increaseCount})),
  )
  const {isWinModalOpen, openWinModal} = useGameStore(
    useShallow((state) => (
      {isWinModalOpen: state.isWinModalOpen, openWinModal: state.openWinModal}
    ))
  )
  const {isFullscreen, checkFullscreen} = useGameStore(
    useShallow((state) => (
      {isFullscreen: state.isFullscreen, checkFullscreen: state.checkFullscreen}
    ))
  )

  const isBackDisabled = !timerIsActive || isTimerFinished || count <= 0

  const isNextDisabled = !timerIsActive || isTimerFinished

  const handleBack = () => {
    decreaseCount()
  }

  const handleNext = () => {
    if (!isTimerFinished && !!gameArray[count + 1]) {
      increaseCount();
    } else {
      const newTeppichArray = generateOneLeseteppichArray(leseTeppich.strings.length)
      addToGameArray(newTeppichArray)
      increaseCount()
    }
  }

  useEffect(() => {
    if (timerSeconds <= 0) {
      pauseTimer()
      openWinModal()
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
      }
    }
  }, [timerSeconds, openWinModal, pauseTimer, audioRef]);

  useEffect(() => {
    if (!isWinModalOpen && audioRef.current) {
      audioRef.current.pause()
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
    <div className={"flex-column gap-2 w-100"}>
      <Box className={"fullscreen-btn"}>
        <IconButton sx={{backgroundColor: theme.palette.grey["300"]}}
                    onClick={toggleFullscreen}>
          {isFullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
        </IconButton>
      </Box>

      <ModalWin/>
      <audio ref={audioRef} src={WinSound}/>

      <AppBar position="fixed"
              sx={{minHeight: 80, justifyContent: "center"}}>
        <Toolbar>
          <div className={"game-cockpit"}>
            <Button onClick={onStop}
                    color="error"
                    variant={"contained"}
                    size={"small"}>
              Stop
            </Button>

            <Typography variant={"h4"}
                        className={"count-text"}
                        fontSize={20}
                        sx={{flexGrow: 1}}>{count}</Typography>

            <Timer/>
          </div>
        </Toolbar>
      </AppBar>

      <div className={"game-row"}>
        <IconButton onClick={handleBack}
                    disabled={isBackDisabled}>
          <UndoIcon/>
        </IconButton>

        {<Typography variant={"h3"}
                     sx={{paddingX: "12px", gap: "4px 16px"}}
                     display={"flex"}
                     justifyContent={"center"}
                     flexWrap={"wrap"}>

          {leseTeppich?.strings[gameArray[count]].split(" ")
            .map((word, wordIndex) => {
                return (
                  <div key={wordIndex}>
                    {word.split("").map((char, charIndex) => {
                        const vokabels = /^[aeiou]$/i;
                        const isVokabel = vokabels.test(char)
                        return (
                          <span key={charIndex}
                                className={`char ${isVokabel ? "koenig" : ""}`}>
                {char}
              </span>
                        )
                      }
                    )}
                  </div>
                )
              }
            )}

        </Typography>}

        <IconButton onClick={handleNext}
                    color="primary"
                    disabled={isNextDisabled}>
          <RedoIcon fontSize={"large"}/>
        </IconButton>
      </div>
    </div>
  );
};

