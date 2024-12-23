import { useEffect, useState } from "react";

export const useIpAddress = () => {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIp();
  }, []);

  return ip;
}