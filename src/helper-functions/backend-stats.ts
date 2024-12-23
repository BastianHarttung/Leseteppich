import { backend, Data, downloadFromServer, setURL } from "../mini_backend.ts";

export async function updateBackendStats(ip: string) {
  setURL("https://schul-apps.de/smallest_backend_ever");
  await downloadFromServer();

  const beData: Data | null = backend.getItem<Data>("leseteppich_statistics");
  if (beData) {
    const newStats: Data = {
      ...beData,
      overallCount: (beData.overallCount ?? 0) + 1,
      [ip]: (beData[ip] ?? 0) + 1
    };
    backend.setItem<Data>("leseteppich_statistics", newStats);
  }
}