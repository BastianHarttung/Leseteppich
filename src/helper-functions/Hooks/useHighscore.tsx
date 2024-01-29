import { StorageHighscore } from "../../models/interfaces.ts";
import { useCallback } from "react";
import { useGameStore } from "../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";

export const useHighscore = () => {
  const localStorageKey = `highscore_leseteppich`;

  const {activeTeppichId, count, initialTimeInSeconds} = useGameStore(
    useShallow((state) => (
      {
        activeTeppichId: state.activeTeppichId,
        count: state.count,
        initialTimeInSeconds: state.initialTimeInSeconds,
      })),
  );

  const oldHighscore = useCallback((): StorageHighscore[] => JSON.parse(localStorage.getItem(localStorageKey)!)
    , [localStorageKey]);

  const saveHighscore = useCallback(() => {
    const actualTime = new Date().getTime();
    const newHighscore: StorageHighscore = {
      creationTime: actualTime,
      teppichId: activeTeppichId!,
      count: count,
      time: initialTimeInSeconds,
    };
    let storageData = [newHighscore];
    if (oldHighscore()) storageData = [...oldHighscore(), newHighscore];
    console.log("save highscores:", storageData);
    localStorage.setItem(localStorageKey, JSON.stringify(storageData));
  }, [localStorageKey, oldHighscore, activeTeppichId, count, initialTimeInSeconds]);


  return {
    saveHighscore,
    oldHighscore,
  };
};
