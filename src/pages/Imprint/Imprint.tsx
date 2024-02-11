import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const Imprint = () => {
  useEffect(() => {
    document.title = "Leseteppich Impressum"
  }, []);


  return (
    <main style={{justifyContent: "flex-start"}}>
      <LeseteppichAppBar/>

      <Box display={"flex"} flexDirection={"column"} gap={2} pt={10} pb={2} px={2} textAlign={"left"}>
        <Typography variant={"h6"}>Impressum</Typography>
        <Typography variant={"body1"}>
          Dies ist ein ausschließlich privates Projekt von mir, <b>Bastian Harttung</b> ohne kommerzielle
          Absichten. <br/>
          Ich bin nur ein Papa, der seinem Sohn einen Anreiz geben wollte, um schneller und mit mehr Spaß zu lesen und
          seine Übungen des Leseteppichs zu genießen. Um auch anderen Eltern zu helfen, dass ihre Kinder Spaß beim Lesen
          haben, habe ich das Projekt geteilt.<br/>
          Also viel Spaß mit meiner kleinen App.
        </Typography>

        <Typography variant={"body1"}>
          Bei Fragen oder Anregungen kannst du mich über die Email: <a
          href="mailto:info@bastian-harttung.de">info@bastian-harttung.de</a> kontaktieren.
        </Typography>

        <Typography variant={"body1"}>
          Diese Web-App speichert keine Daten im Hintergrund oder erfasst Nutzungsdaten. Nur die Highscores des
          Benutzers werden auf dem jeweiligen Gerät im localStorage gespeichert.
        </Typography>
      </Box>
    </main>
  );
};

export default Imprint;
