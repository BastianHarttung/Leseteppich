import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { calculateRandomIndex } from '../helper-functions';
import { useTimerStore } from './timer-store.ts';


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

  gameArray: number[],
  count: number,
  isWinModalOpen: boolean,
  isImageModalOpen: boolean,
  isHighscoreModalOpen: boolean,

  isKingsMarked: boolean,

  isFullscreen: boolean,

  // Actions
  setActiveTeppichId: (id: number) => void,

  startGame: (teppichStringsLength: number) => void,
  stopGame: () => void,

  decreaseCount: () => void,
  increaseCount: () => void,
  setCount: (newIndex: number) => void,

  addToGameArray: (newTeppichArray: number[]) => void,

  openWinModal: () => void,
  closeWinModal: () => void,

  openImageModal: () => void,
  closeImageModal: () => void,

  openHighscoreModal: () => void,
  closeHighscoreModal: () => void,

  toggleKingsMarked: (event: ChangeEvent<HTMLInputElement>) => void,

  checkFullscreen: () => void,
}

export const useGameStore = create<GameState>((set) => ({
  activeTeppichId: null,
  isPlayGame: false,

  gameArray: [0],
  count: 0,

  isWinModalOpen: false,
  isImageModalOpen: false,
  isHighscoreModalOpen: false,

  isKingsMarked: true,

  isFullscreen: false,

  //Initial
  setActiveTeppichId: (id: number) => set(() => ({activeTeppichId: id})),

  // Game
  startGame: (teppichStringsLength: number) => set((state) => {
    let newGameArray: number[] = [];

    for (let j = 0; j < 5; j++) {
      const newInnerArray = generateOneLeseteppichArray(teppichStringsLength);
      newGameArray = [...newGameArray, ...newInnerArray];
    }

    return {
      ...state,
      isPlayGame: true,
      gameArray: newGameArray,
    };
  }),
  stopGame: () => {
    set({
      gameArray: [0],
      count: 0,
      isPlayGame: false,
    });

    useTimerStore.getState().resetTimerToInitial();
  },

  // Counter
  increaseCount: () => set(state => ({count: state.count + 1})),
  decreaseCount: () => set((state) => ({count: state.count - 1})),
  setCount: (newIndex: number) => set(() => ({count: newIndex})),

  //Game Array
  addToGameArray: (newTeppichArray: number[]) => set((state) => ({gameArray: [...state.gameArray, ...newTeppichArray]})),

  // Modal Win
  openWinModal: () => set(() => ({isWinModalOpen: true})),
  closeWinModal: () => set(() => ({isWinModalOpen: false})),

  // Modal Image Teppich
  openImageModal: () => set(() => ({isImageModalOpen: true})),
  closeImageModal: () => set(() => ({isImageModalOpen: false})),

  // Modal Highscore
  openHighscoreModal: () => set(() => ({isHighscoreModalOpen: true})),
  closeHighscoreModal: () => set(() => ({isHighscoreModalOpen: false})),

  // Kings Marked
  toggleKingsMarked: (event: ChangeEvent<HTMLInputElement>) => set(() => ({isKingsMarked: event.target.checked})),

  // Fullscreen
  checkFullscreen: () => set((state) => {
    const isFullscreenNow = !!document.fullscreenElement;
    return {
      ...state,
      isFullscreen: isFullscreenNow,
    };
  }),
}));
