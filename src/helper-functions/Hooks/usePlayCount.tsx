import { useCallback, useEffect, useState } from "react";
import { PlayCount } from "../../models/interfaces.ts";


export const localStoragePlayCountKey = "leseteppich_play-count"

const usePlayCount = () => {
  const [storagePlayCount, setStoragePlayCount] = useState<PlayCount | null>(null)

  const playCountStorage = useCallback(() => {
    const storage = localStorage.getItem(localStoragePlayCountKey);
    if (storage) setStoragePlayCount(JSON.parse(storage) as PlayCount);
    else setStoragePlayCount(null);
  }, []);

  const addPlayCount = useCallback((id: number) => {
    let newStorage: PlayCount = {[id]: 1}
    if (storagePlayCount) newStorage = {...storagePlayCount, [id]: storagePlayCount[id] ? storagePlayCount[id] + 1 : 1}
    localStorage.setItem(localStoragePlayCountKey, JSON.stringify(newStorage));
  }, [storagePlayCount]);

  const getPlayCount = (id: number): number => {
    if (storagePlayCount) return storagePlayCount[id] || 0
    else return 0
  }

  useEffect(() => {
    playCountStorage()
  }, [playCountStorage]);


  return {
    storagePlayCount,
    addPlayCount,
    getPlayCount
  }
};

export default usePlayCount;
