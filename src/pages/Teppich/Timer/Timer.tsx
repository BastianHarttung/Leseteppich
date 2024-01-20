import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGameStore } from "../../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";


export const Timer = () => {
  const {timerSeconds, decreaseTimerSecond} = useGameStore(
    useShallow((state) => (
      {timerSeconds: state.timerSeconds, decreaseTimerSecond: state.decreaseTimerSecond})),
  )
  const {timerIsActive, activateTimer, pauseTimer} = useGameStore(
    useShallow((state) => (
      {timerIsActive: state.timerIsActive, activateTimer: state.activateTimer, pauseTimer: state.pauseTimer})),
  )

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const isTimerEnd = timerSeconds <= 0

  const handleStart = () => {
    if (!isTimerEnd) activateTimer();
  };

  const handlePause = () => {
    pauseTimer()
  };

  useEffect(() => {
    // start timer after 2 seconds
    activateTimer()
  }, []);

  useEffect(() => {
    let interval: number;

    if (timerIsActive) {
      interval = setInterval(() => {
        decreaseTimerSecond()
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive]);


  return (
    <Box>
      <Typography variant={"h5"}
                  fontFamily={"monospace"}
                  fontWeight={100}>
        {formatTime(timerSeconds)}
      </Typography>

      <Button onClick={handleStart}
              disabled={timerIsActive || isTimerEnd}
              variant={"contained"}
              size={"small"}
              color={"success"}>
        Start
      </Button>

      <Button onClick={handlePause}
              disabled={!timerIsActive}
              variant={"contained"}
              size={"small"}
              color={"warning"}>
        Pause
      </Button>
    </Box>
  );
};

