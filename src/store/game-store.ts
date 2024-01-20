import { create } from 'zustand'


interface GameState {
  isPlayGame: boolean,

  timerIsActive: boolean,
  initialTimeInSeconds: number,
  timerSeconds: number,

  activeStringIndex: number,
  gameArray: number[],
  count: number,
  isWinModalOpen: boolean,
  // Actions
  startGame: () => void,
  stopGame: () => void,

  setTimeInSeconds: (timeInMinutes: string) => void,
  activateTimer: () => void,
  pauseTimer: () => void,
  decreaseTimerSecond: () => void,

  setActiveStringIndex: (newIndex: number) => void,
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

  activeStringIndex: 0, //TODO random number from length of teppichstrings
  gameArray: [0],
  count: 0,

  isWinModalOpen: false,

  // Game
  startGame: () => set((state) => {
    return {
      ...state,
      isPlayGame: true
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
  setActiveStringIndex: (newIndex: number) => set((state) => {
    return {
      ...state,
      activeStringIndex: newIndex
    }
  }),
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