// Interfaces
export interface Data {
  overallCount: number;
  [ip: string]: number;
}

interface Backend {
  setItem<T>(key: string, item: T): Promise<string>;

  getItem<T>(key: string): T | null;

  deleteItem(key: string): Promise<string>;
}

// Methods
let jsonFromServer: Record<string, any> = {};
let BASE_SERVER_URL: string | undefined;

export const backend: Backend = {
  setItem<T>(key: string, item: T): Promise<string> {
    jsonFromServer[key] = item;
    return saveJSONToServer();
  },
  getItem<T>(key: string): T | null {
    if (!jsonFromServer[key]) {
      return null;
    }
    return jsonFromServer[key] as T;
  },
  deleteItem(key: string): Promise<string> {
    delete jsonFromServer[key];
    return saveJSONToServer();
  },
};

// Nur ausführen, falls wir uns in einer Browser-Umgebung befinden
if (typeof window !== 'undefined') {
  window.onload = async function (): Promise<void> {
    await downloadFromServer();
  };
}

export async function downloadFromServer(): Promise<string> {
  const result = await loadJSONFromServer();
  jsonFromServer = JSON.parse(result);
  // console.log('Loaded', result);
  return result
}

export function setURL(url: string): void {
  BASE_SERVER_URL = url;
}

/**
 * Lädt JSON als String vom Server
 */
export async function loadJSONFromServer(): Promise<string> {
  if (!BASE_SERVER_URL) {
    throw new Error('BASE_SERVER_URL is not set.');
  }
  const response = await fetch(BASE_SERVER_URL + '/nocors.php?json=database&noache=' + new Date().getTime());
  return await response.text();
}

export function loadJSONFromServerOld(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!BASE_SERVER_URL) {
      return reject('BASE_SERVER_URL is not set.');
    }

    const xhttp = new XMLHttpRequest();
    const proxy = determineProxySettings();
    const serverURL = proxy + BASE_SERVER_URL + '/nocors.php?json=database&noache=' + new Date().getTime();

    xhttp.open('GET', serverURL);

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status <= 399) {
          resolve(xhttp.responseText);
        } else {
          reject(xhttp.statusText);
        }
      }
    };

    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send();
  });
}

/**
 * Speichert JSON-Daten auf dem Server
 */
export function saveJSONToServer(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!BASE_SERVER_URL) {
      return reject('BASE_SERVER_URL is not set.');
    }

    const xhttp = new XMLHttpRequest();
    const proxy = determineProxySettings();
    const serverURL = proxy + BASE_SERVER_URL + '/save_json.php';
    xhttp.open('POST', serverURL);

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status <= 399) {
          resolve(xhttp.responseText);
        } else {
          reject(xhttp.statusText);
        }
      }
    };

    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(jsonFromServer));
  });
}

function determineProxySettings(): string {
  return '';

  // if (window.location.href.indexOf('.developerakademie.com') > -1) {
  //   return '';
  // } else {
  //   return 'https://cors-anywhere.herokuapp.com/';
  // }
}

export { jsonFromServer }