export interface Leseteppich {
  id: number;
  chars: string[];
  strings: string[]
}

export interface StorageHighscore {
  creationTime: number,
  teppichId: number,
  count: number,
  time: number,
  countMin: number,
}