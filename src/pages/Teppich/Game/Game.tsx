import "./Game.scss";
import { useEffect, useRef } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Timer } from "../Timer/Timer.tsx";
import { generateOneLeseteppichArray, useGameStore } from "../../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import ModalWin from "../../../components/ModalWin.tsx";
import { Leseteppich } from "../../../models/interfaces.ts";
import WinSound from "../../../assets/sounds/Stage-Win_(Super-Mario).mp3";


interface GameProps {
  leseTeppich: Leseteppich,
  onStop: () => void,
}

export const Game = ({leseTeppich, onStop}: GameProps) => {

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
  const {openWinModal} = useGameStore(
    useShallow((state) => (
      {openWinModal: state.openWinModal}
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


  return (
    <div className={"flex-column gap-2 w-100"}>
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

            <Typography variant={"h5"}
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
                     sx={{paddingX: "12px"}}>
          {leseTeppich?.strings[gameArray[count]].split("")
            .map((char, index) => {
              const vokabels = /^[aeiou]$/i;
              const isVokabel = vokabels.test(char)
              return (
                <span key={index}
                      className={`char ${isVokabel ? "koenig" : ""}`}>
                {char}
              </span>)
            })}
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

