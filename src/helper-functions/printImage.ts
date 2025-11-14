export const printImage = (teppichPic: string, id?: string) => {
  const win = window.open('', '_blank');
  if (!win) return;
  // HTML in neues Fenster schreiben
  win.document.write(`
    <html>
      <head>
        <title>www.schul-apps.de</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          img {
            max-width: 100%;
            max-height: 100vh;
          }
        </style>
      </head>
      <body>
        <p>Leseteppich ${id}</p>
        <img src="${teppichPic}" />
      </body>
    </html>
  `);

  win.document.close();
  // Warten bis das Bild geladen ist → dann drucken
  win.onload = () => {
    win.focus();
    win.print();
    // Optional: Fenster schließen nach dem Drucken
    win.close();
  };
};