import "./Game.scss";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { Timer } from "../Timer/Timer.tsx";
import { generateOneLeseteppichArray, useGameStore } from "../../../store/game-store.ts";
import ModalWin from "../../../components/Modals/ModalWin.tsx";
import { Leseteppich } from "../../../models/interfaces.ts";
import WinSound from "../../../assets/sounds/Stage-Win_(Super-Mario).mp3";
import { toggleFullscreen } from "../../../helper-functions";
import { useHighscore } from "../../../helper-functions/Hooks";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import usePlayCount from "../../../helper-functions/Hooks/usePlayCount.tsx";


interface GameProps {
  leseTeppich: Leseteppich,
  onStop: () => void,
}

export const Game = ({leseTeppich, onStop}: GameProps) => {

  const theme = useTheme();

  const {saveHighscore} = useHighscore();

  const {addPlayCount} = usePlayCount()

  const audioRef = useRef<HTMLAudioElement>(null);

  const {timerSeconds, timerIsActive, pauseTimer} = useGameStore(
    useShallow((state) => (
      {
        timerSeconds: state.timerSeconds,
        timerIsActive: state.timerIsActive,
        pauseTimer: state.pauseTimer,
      })),
  );
  const isTimerFinished = timerSeconds <= 0;

  const {gameArray, addToGameArray} = useGameStore(
    useShallow((state) => (
      {gameArray: state.gameArray, addToGameArray: state.addToGameArray})),
  );
  const {count, setCount} = useGameStore(
    useShallow((state) => (
      {
        count: state.count,
        setCount: state.setCount,
      })),
  );
  const {isWinModalOpen, openWinModal} = useGameStore(
    useShallow((state) => (
      {isWinModalOpen: state.isWinModalOpen, openWinModal: state.openWinModal}
    )),
  );
  const {isKingsMarked} = useGameStore(
    useShallow((state) => (
      {isKingsMarked: state.isKingsMarked}
    )),
  );
  const {isFullscreen, checkFullscreen} = useGameStore(
    useShallow((state) => (
      {isFullscreen: state.isFullscreen, checkFullscreen: state.checkFullscreen}
    )),
  );

  const isBackDisabled = !timerIsActive || isTimerFinished || count <= 0;

  const isNextDisabled = !timerIsActive || isTimerFinished;

  const teppichGameArray = gameArray.map((gameIndex) => leseTeppich.strings[gameIndex]);

  const handleNext = () => {
    if (!isTimerFinished && !!gameArray[count + 1]) {
      return;
    } else {
      const newTeppichArray = generateOneLeseteppichArray(leseTeppich.strings.length);
      addToGameArray(newTeppichArray);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCount(swiper.activeIndex);
  };

  useEffect(() => {
    if (timerSeconds <= 0) {
      pauseTimer();
      openWinModal();
      saveHighscore();
      addPlayCount(leseTeppich.id);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [timerSeconds, openWinModal, pauseTimer, audioRef, saveHighscore, addPlayCount, leseTeppich.id]);

  useEffect(() => {
    if (!isWinModalOpen && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isWinModalOpen, audioRef]);

  useEffect(() => {
    checkFullscreen();
    document.addEventListener("fullscreenchange", checkFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
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
                    size={"small"}
                    startIcon={<StopOutlinedIcon/>}>
              Stop
            </Button>

            <Typography variant={"h4"}
                        className={"count-text"}
                        fontFamily={"ABeeZee"}
                        fontSize={24}
                        sx={{flexGrow: 1}}
                        data-tut="reactour_count">{count}</Typography>

            <Timer/>
          </div>
        </Toolbar>
      </AppBar>

      <div className={"game-row"}>
        <IconButton disabled={isBackDisabled}
                    className="prev-button">
          <UndoIcon/>
        </IconButton>

        <Swiper modules={[Navigation]}
                className={"swiper_container"}
                style={{padding: "24px"}}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                navigation={{
                  prevEl: ".prev-button",
                  nextEl: ".next-button",
                }}>

          {teppichGameArray.map((teppichStrings, index) => (
            <SwiperSlide key={index}
                         className={"swiper_slide"}>
              <Typography variant={"h3"}
                          sx={{padding: "12px", gap: "4px 16px"}}
                          display={"flex"}
                          justifyContent={"center"}
                          flexWrap={"wrap"}>
                {teppichStrings.split(" ")
                  .map((word, wordIndex) => {
                      return (
                        <div key={wordIndex}>
                          {word.split("").map((char, charIndex) => {
                              const vokabels = /^[aeiou]$/i;
                              const isVokabel = vokabels.test(char);
                              return (
                                <span key={charIndex}
                                      className={`char ${(isVokabel && isKingsMarked) ? "koenig" : ""}`}>
                  {char}
                </span>
                              );
                            },
                          )}
                        </div>
                      );
                    },
                  )}
              </Typography>
            </SwiperSlide>))}
        </Swiper>

        <IconButton onClick={handleNext}
                    color="primary"
                    disabled={isNextDisabled}
                    className="next-button">
          <RedoIcon fontSize={"large"}/>
        </IconButton>
      </div>
    </div>
  );
};

