import { create } from "zustand";

interface HelpTourState {
  startingHelpUrl: string;
  setStartingHelpUrl: (url: string) => void
}


export const useHelpTourStore = create<HelpTourState>((set) => ({
  startingHelpUrl: "/",

  setStartingHelpUrl: (url: string) => set((state) => {
    return {
      ...state,
      startingHelpUrl: url,
    };
  }),

}));