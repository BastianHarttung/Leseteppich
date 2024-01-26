import { create } from "zustand";
import { calculateRandomIndex } from "../helper-functions/randomNumber.ts";


export const generateOneLeseteppichArray = (teppichStringsLength: number) => {
  const uniqueTeppichArray: number[] = [];
  for (let i = 0; i < teppichStringsLength; i++) {
    const pushRandomIndex = () => {
      const newIndex = calculateRandomIndex(teppichStringsLength - 1);
      if (!uniqueTeppichArray.includes(newIndex)) {
        uniqueTeppichArray.push(newIndex);
      } else pushRandomIndex();
    };
    pushRandomIndex();
  }
  return uniqueTeppichArray;
};

interface GameState {
  activeTeppichId: number | null,
  isPlayGame: boolean,

  timerIsActive: boolean,
  initialTimeInSeconds: number,
  timerSeconds: number,

  gameArray: number[],
  count: number,
  isWinModalOpen: boolean,
  isImageModalOpen: boolean,

  isFullscreen: boolean,
  // Actions
  setActiveTeppichId: (id: number) => void,

  startGame: (teppichStringsLength: number) => void,
  stopGame: () => void,

  setTimeInSeconds: (timeInMinutes: string) => void,
  addMinute: () => void,
  removeMinute: () => void,
  activateTimer: () => void,
  pauseTimer: () => void,
  decreaseTimerSecond: () => void,

  decreaseCount: () => void,
  increaseCount: () => void,
  setCount: (newIndex: number) => void,

  addToGameArray: (newTeppichArray: number[]) => void,

  openWinModal: () => void,
  closeWinModal: () => void,

  openImageModal: () => void,
  closeImageModal: () => void,

  checkFullscreen: () => void,
}

const initialTime = 300;

export const useGameStore = create<GameState>((set) => ({
  activeTeppichId: null,
  isPlayGame: false,

  timerIsActive: false,
  initialTimeInSeconds: initialTime,
  timerSeconds: initialTime,

  gameArray: [0],
  count: 0,

  isWinModalOpen: false,
  isImageModalOpen: false,

  isFullscreen: false,

  //Initial
  setActiveTeppichId: (id: number) => set((state) => {
    return {
      ...state,
      activeTeppichId: id,
    };
  }),
  // Game
  startGame: (teppichStringsLength: number) => set((state) => {
    let newGameArray: number[] = [];

    for (let j = 0; j < 10; j++) {

      const newInnerArray = generateOneLeseteppichArray(teppichStringsLength);

      newGameArray = [...newGameArray, ...newInnerArray];
    }
    console.log("startGame() newGameArray:", newGameArray);

    return {
      ...state,
      isPlayGame: true,
      gameArray: newGameArray,
    };
  }),
  stopGame: () => set((state) => {
    return {
      ...state,
      gameArray: [0],
      count: 0,
      initialTimeInSeconds: state.initialTimeInSeconds,
      timerSeconds: state.initialTimeInSeconds,
      isPlayGame: false,
    };
  }),

  //Timer
  setTimeInSeconds: (timeInMinutes: string) => set((state) => {
    const timeinSec = Number(timeInMinutes) * 60;
    return {
      ...state,
      timerSeconds: timeinSec,
      initialTimeInSeconds: timeinSec,
    };
  }),

  addMinute: () => set((state) => {
    const newTime = state.initialTimeInSeconds + 60;
    return {
      ...state,
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    };
  }),

  removeMinute: () => set((state) => {
    const newTime = state.initialTimeInSeconds > 60 ? state.initialTimeInSeconds - 60 : state.initialTimeInSeconds;
    return {
      ...state,
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    };
  }),

  activateTimer: () => set((state) => {
    return {
      ...state,
      timerIsActive: true,
    };
  }),

  pauseTimer: () => set((state) => {
    return {
      ...state,
      timerIsActive: false,
    };
  }),

  decreaseTimerSecond: () => set((state) => {
    return {
      ...state,
      timerSeconds: state.timerSeconds - 1,
    };
  }),

  // Counter
  increaseCount: () => set((state) => {
    return {
      ...state,
      count: state.count + 1,
    };
  }),
  decreaseCount: () => set((state) => {
    return {
      ...state,
      count: state.count - 1,
    };
  }),
  setCount: (newIndex: number) => set((state) => {
    return {
      ...state,
      count: newIndex,
    };
  }),

  //Game Array
  addToGameArray: (newTeppichArray: number[]) => set((state) => {
    return {
      ...state,
      gameArray: [...state.gameArray, ...newTeppichArray],
    };
  }),

  // Modal Win
  openWinModal: () => set((state) => {
    return {
      ...state,
      isWinModalOpen: true,
    };
  }),
  closeWinModal: () => set((state) => {
    return {
      ...state,
      isWinModalOpen: false,
    };
  }),

  // Modal Image Teppich
  openImageModal: () => set((state) => {
    return {
      ...state,
      isImageModalOpen: true,
    };
  }),
  closeImageModal: () => set((state) => {
    return {
      ...state,
      isImageModalOpen: false,
    };
  }),

  // Fullscreen
  checkFullscreen: () => set((state) => {
    const isFullscreenNow = !!document.fullscreenElement;
    return {
      ...state,
      isFullscreen: isFullscreenNow,
    };
  }),
}));
