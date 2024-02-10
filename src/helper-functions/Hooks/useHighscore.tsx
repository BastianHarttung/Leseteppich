import { StorageHighscore } from "../../models/interfaces.ts";
import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "../../store/game-store.ts";
import { useShallow } from "zustand/react/shallow";
import { HighscoreTableRow } from "../../components/Tables/HighscoreTable.tsx";


export const localStorageHighscoreKey = `leseteppich_highscores`;

export const useHighscore = () => {

  const [highscore, setHighscore] = useState<StorageHighscore[]>([])

  const {activeTeppichId, count, initialTimeInSeconds} = useGameStore(
    useShallow((state) => (
      {
        activeTeppichId: state.activeTeppichId,
        count: state.count,
        initialTimeInSeconds: state.initialTimeInSeconds,
      })),
  );

  const getOldHighscore = useCallback(() => {
    const storage = localStorage.getItem(localStorageHighscoreKey);
    if (storage) setHighscore(JSON.parse(storage) as StorageHighscore[]);
    else setHighscore([]);
  }, []);

  const saveHighscore = useCallback(() => {
    const actualTime = new Date().getTime();
    const newHighscore: StorageHighscore = {
      creationTime: actualTime,
      teppichId: activeTeppichId!,
      count: count,
      time: initialTimeInSeconds,
      countMin: Math.round((count / initialTimeInSeconds * 60) * 100) / 100,
    };
    let storageData = [newHighscore];
    if (highscore.length > 0) storageData = [...highscore, newHighscore];
    console.log("save highscores:", storageData);
    localStorage.setItem(localStorageHighscoreKey, JSON.stringify(storageData));
  }, [highscore, activeTeppichId, count, initialTimeInSeconds]);

  const getHighscoreOfTeppichForTable = (teppichId: number): HighscoreTableRow[] => {
    return highscore
      .filter((score) => score.teppichId === teppichId)
      .sort((scoreA, scoreB) => scoreB.countMin - scoreA.countMin)
      .map((sco, index) => ({
        ...sco,
        place: index + 1,
      }))
      .slice(0, 5); //only show first 5 in table
  };

  useEffect(() => {
    getOldHighscore()
  }, [getOldHighscore]);


  return {
    highscore,
    saveHighscore,
    getHighscoreOfTeppichForTable,
  };
};
