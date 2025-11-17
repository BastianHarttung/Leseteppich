export interface Leseteppich {
  id: number;
  name: string;
  chars: string[];
  strings: string[];
  images?: string[];
}

export interface StorageHighscore {
  creationTime: number,
  teppichId: number,
  count: number,
  time: number,
  countMin: number,
}

export interface PlayCount {
  [key: number]: number;
}