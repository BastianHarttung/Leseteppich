import { backend, Data, downloadFromServer, setURL } from '../mini_backend.ts';


export interface LocalStats {
  id: string;
  count: number;
  coins: number;
}

export async function updateBackendStats(ip: string) {
  const key = 'leseteppich_statistics';
  setURL('https://schul-apps.de/smallest_backend_ever');

  const localStats = updateLocalStats(key, ip);

  await downloadFromServer();

  const beData: Data = backend.getItem(key) ?? {overallCount: 0, users: {}};
  beData.overallCount++;
  const currentIp = localStats.id;

  beData.users[currentIp] = {count: localStats.count, coins: localStats.coins};
  await backend.setItem(key, beData);
}

/**
 * Update Local Storage and return local stats
 * @param key LocalStorage key
 * @param ip
 */
function updateLocalStats(key: string, ip: string): LocalStats {
  const rawLocalStats = localStorage.getItem(key);

  let localStats: LocalStats;

  if (rawLocalStats) {
    localStats = JSON.parse(rawLocalStats) as LocalStats;
  } else {
    localStats = {id: ip, count: 0, coins: 0};
  }

  localStats.count = localStats.count + 1;

  localStorage.setItem(key, JSON.stringify(localStats));

  return localStats;
}