import { create } from 'zustand';
import { Leseteppich, LeseteppichJson } from '../models/interfaces.ts';


type JsonState = {
  originalJson: LeseteppichJson[] | null;
  leseteppiche: Leseteppich[] | null;
  isLoading: boolean;
  error: string | null;
  loadJson: () => Promise<void>;
};

export const useJsonStore = create<JsonState>((set, get) => ({
  originalJson: null,
  leseteppiche: null,
  isLoading: false,
  error: null,

  loadJson: async () => {
    // Wenn schon geladen, nicht nochmal fetchen
    if (get().leseteppiche || get().isLoading) return;

    set({isLoading: true, error: null});

    try {
      const res = await fetch('/datas/leseteppiche.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: LeseteppichJson[] = await res.json();
      const uniqueData = data.map((tepp) => ({
        ...tepp,
        strings: Array.from(new Set(tepp.strings.flat())),
      }));
      set({originalJson: data, leseteppiche: uniqueData, isLoading: false});
    } catch (e: unknown) {
      const error = e as Error;
      set({error: error.message ?? 'Fehler beim Laden des Json', isLoading: false});
    }
  },
}));
