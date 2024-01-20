import "./Game.scss";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { leseteppiche } from "../../../data/leseteppich-data.ts";
import { useParams } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Timer } from "../Timer/Timer.tsx";
import { useGameStore } from "../../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import { calculateRandomIndex } from "../../../helper-functions/randomNumber.ts";
import ModalWin from "../../../components/ModalWin.tsx";
import { useEffect } from "react";


interface GameProps {
  onStop: () => void,
}

export const Game = ({onStop}: GameProps) => {
  const {id} = useParams()

  const findLeseteppich = leseteppiche.find((tepp) => tepp.id.toString() === id!)

  const {timerSeconds, timerIsActive, pauseTimer} = useGameStore(
    useShallow((state) => (
      {timerSeconds: state.timerSeconds, timerIsActive: state.timerIsActive, pauseTimer: state.pauseTimer})),
  )
  const isTimerFinished = timerSeconds <= 0

  const {activeStringIndex, setActiveStringIndex, decreaseCount} = useGameStore(
    useShallow((state) => (
      {
        activeStringIndex: state.activeStringIndex,
        setActiveStringIndex: state.setActiveStringIndex,
        decreaseCount: state.decreaseCount
      })),
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
    if (!isTimerFinished) {
      const newIndex = calculateRandomIndex(findLeseteppich ? findLeseteppich.strings.length - 1 : 0)
      if (newIndex !== activeStringIndex) {
        setActiveStringIndex(newIndex);
        addToGameArray(newIndex);
        increaseCount();
      } else handleNext()
    }
  }

  useEffect(() => {
    if (timerSeconds <= 0) {
      pauseTimer()
      openWinModal()
    }
  }, [timerSeconds]);


  return (
    <div className={"flex-column gap-2 w-100"}>
      <ModalWin/>

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
          {findLeseteppich?.strings[gameArray[count]].split("")
            .map((char, index) => {
              const vokabels = /^[aeiou]$/i;
              const isVokabel = vokabels.test(char)
              return <span key={index}
                           className={`char ${isVokabel ? "koenig" : ""}`}>
                {char}
              </span>
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

