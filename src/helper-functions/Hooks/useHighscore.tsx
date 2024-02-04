import { StorageHighscore } from "../../models/interfaces.ts";
import { useCallback } from "react";
import { useGameStore } from "../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import { HighscoreTableRow } from "../../components/Tables/HighscoreTable.tsx";

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

  const oldHighscore = useCallback((): StorageHighscore[] => {
    const storage = localStorage.getItem(localStorageKey)
    if (storage) return JSON.parse(storage)
    else return []
  }, [localStorageKey]);

  const saveHighscore = useCallback(() => {
    const actualTime = new Date().getTime();
    const newHighscore: StorageHighscore = {
      creationTime: actualTime,
      teppichId: activeTeppichId!,
      count: count,
      time: initialTimeInSeconds,
      countMin: Math.round((count / initialTimeInSeconds * 60) * 100) / 100
    };
    let storageData = [newHighscore];
    if (oldHighscore()) storageData = [...oldHighscore(), newHighscore];
    console.log("save highscores:", storageData);
    localStorage.setItem(localStorageKey, JSON.stringify(storageData));
  }, [localStorageKey, oldHighscore, activeTeppichId, count, initialTimeInSeconds]);

  const getHighscoreOfTeppichForTable = (teppichId: number) => {
    const ret: HighscoreTableRow[] = oldHighscore()
      .filter((score) => score.teppichId === teppichId)
      .sort((scoreA, scoreB) => scoreB.countMin - scoreA.countMin)
      .map((sco, index) => ({
        ...sco,
        place: index + 1,
      }))
      .slice(0, 5) //only show first 5 in table
    return ret
  }

  return {
    saveHighscore,
    oldHighscore,
    getHighscoreOfTeppichForTable
  };
};
