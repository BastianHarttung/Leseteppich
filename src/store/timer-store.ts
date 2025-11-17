import { create } from 'zustand';


interface TimerState {
  timerIsActive: boolean;
  initialTimeInSeconds: number;
  timerSeconds: number;

  setTimeInSeconds: (minutes: string) => void;
  addMinute: () => void;
  removeMinute: () => void;
  activateTimer: () => void;
  pauseTimer: () => void;
  decreaseTimerSecond: () => void;
  resetTimerToInitial: () => void;
}

const initialTime = 300;

export const useTimerStore = create<TimerState>((set, get) => ({
  timerIsActive: false,
  initialTimeInSeconds: initialTime,
  timerSeconds: initialTime,

  setTimeInSeconds: (timeInMinutes: string) => {
    const timeInSec = Number(timeInMinutes) * 60;
    set({
      timerSeconds: timeInSec,
      initialTimeInSeconds: timeInSec,
    });
  },

  addMinute: () => {
    const {initialTimeInSeconds} = get();
    const newTime = initialTimeInSeconds + 60;
    set({
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    });
  },

  removeMinute: () => {
    const {initialTimeInSeconds} = get();
    const newTime = initialTimeInSeconds > 60 ? initialTimeInSeconds - 60 : initialTimeInSeconds;
    set({
      timerSeconds: newTime,
      initialTimeInSeconds: newTime,
    });
  },

  activateTimer: () => set({timerIsActive: true}),

  pauseTimer: () => set({timerIsActive: false}),

  decreaseTimerSecond: () => {
    const {timerSeconds} = get();
    set({timerSeconds: timerSeconds - 1});
  },

  resetTimerToInitial: () => {
    const {initialTimeInSeconds} = get();
    set({
      timerIsActive: false,
      timerSeconds: initialTimeInSeconds,
    });
  },
}));
