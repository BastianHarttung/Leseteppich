import { create } from 'zustand'
import { calculateRandomIndex } from "../helper-functions/randomNumber.ts";


interface GameState {
  isPlayGame: boolean,

  timerIsActive: boolean,
  initialTimeInSeconds: number,
  timerSeconds: number,

  gameArray: number[],
  count: number,
  isWinModalOpen: boolean,
  // Actions
  startGame: (teppichStringsLength: number) => void,
  stopGame: () => void,

  setTimeInSeconds: (timeInMinutes: string) => void,
  addMinute: () => void,
  removeMinute: () => void,
  activateTimer: () => void,
  pauseTimer: () => void,
  decreaseTimerSecond: () => void,

  decreaseCount: () => void,
  addToGameArray: (newIndex: number) => void,
  increaseCount: () => void,

  openWinModal: () => void,
  closeWinModal: () => void,
}

const initialTime = 300

export const useGameStore = create<GameState>((set) => ({
  isPlayGame: false,

  timerIsActive: false,
  initialTimeInSeconds: initialTime,
  timerSeconds: initialTime,

  gameArray: [0],
  count: 0,

  isWinModalOpen: false,

  // Game
  startGame: (teppichStringsLength: number) => set((state) => {
    const newGameArray: number[] = []

    for (let i = 0; i < teppichStringsLength; i++) {
      const pushRandomIndex = () => {
        const newIndex = calculateRandomIndex(teppichStringsLength - 1)
        if (!newGameArray.includes(newIndex)) {
          newGameArray.push(newIndex)
        } else pushRandomIndex()
      }
      pushRandomIndex()
    }

    return {
      ...state,
      isPlayGame: true,
      gameArray: newGameArray,
    }
  }),
  stopGame: () => set((state) => {
    return {
      ...state,
      gameArray: [0],
      count: 0,
      initialTimeInSeconds: state.initialTimeInSeconds,
      timerSeconds: state.initialTimeInSeconds,
      isPlayGame: false
    }
  }),
  //Timer
  setTimeInSeconds: (timeInMinutes: string) => set((state) => {
    const timeinSec = Number(timeInMinutes) * 60
    return {
      ...state,
      timerSeconds: timeinSec,
      initialTimeInSeconds: timeinSec
    }
  }),
  addMinute: () => set((state) => {
    const newTime = state.initialTimeInSeconds + 60
    return {
      ...state,
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    }
  }),
  removeMinute: () => set((state) => {
    const newTime = state.initialTimeInSeconds > 60 ? state.initialTimeInSeconds - 60 : state.initialTimeInSeconds
    return {
      ...state,
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    }
  }),
  activateTimer: () => set((state) => {
    return {
      ...state,
      timerIsActive: true
    }
  }),
  pauseTimer: () => set((state) => {
    return {
      ...state,
      timerIsActive: false
    }
  }),
  decreaseTimerSecond: () => set((state) => {
    return {
      ...state,
      timerSeconds: state.timerSeconds - 1
    }
  }),
  // Counter
  decreaseCount: () => set((state) => {
    return {
      ...state,
      count: state.count - 1
    }
  }),
  addToGameArray: (newIndex: number) => set((state) => {
    return {
      ...state,
      gameArray: [...state.gameArray, newIndex]
    }
  }),
  increaseCount: () => set((state) => {
    return {
      ...state,
      count: state.count + 1
    }
  }),

  openWinModal: () => set((state) => {
    return {
      ...state,
      isWinModalOpen: true,
    }
  }),
  closeWinModal: () => set((state) => {
    return {
      ...state,
      isWinModalOpen: false,
    }
  }),
}))