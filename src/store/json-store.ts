import { create } from 'zustand';
import { Leseteppich } from '../models/interfaces.ts';


type JsonState = {
  json: Leseteppich[] | null;
  isLoading: boolean;
  error: string | null;
  loadJson: () => Promise<void>;
};

export const useJsonStore = create<JsonState>((set, get) => ({
  json: null,
  isLoading: false,
  error: null,

  loadJson: async() => {
    // Wenn schon geladen, nicht nochmal fetchen (optional)
    if (get().json || get().isLoading) return;

    set({isLoading: true, error: null});

    try {
      const res = await fetch('/datas/leseteppiche.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: Leseteppich[] = await res.json();
      set({json: json, isLoading: false});
    } catch (e: any) {
      set({error: e.message ?? 'Fehler beim Laden des Json', isLoading: false});
    }
  },
}));
