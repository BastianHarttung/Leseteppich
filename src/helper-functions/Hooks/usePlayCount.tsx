import { useCallback, useEffect, useState } from "react";


interface PlayCount {
  [key: number]: number
}

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

  useEffect(() => {
    playCountStorage()
  }, [playCountStorage]);


  return {
    storagePlayCount,
    addPlayCount
  }
};

export default usePlayCount;
