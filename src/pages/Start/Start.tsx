import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Timeline,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { Leseteppich, StorageHighscore } from "../../models/interfaces.ts";
import GitHubIcon from "@mui/icons-material/GitHub";
import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";
import { localStorageHighscoreKey } from "../../helper-functions/Hooks";


export default function Start() {
  const highscores = (): StorageHighscore[] => {
    const storage = localStorage.getItem(localStorageHighscoreKey);
    if (storage) return JSON.parse(storage);
    else return [];
  };

  const highscoreLength = (id: number) => {
    const filteredHighscores = highscores().filter((score) => score.teppichId === id);
    return filteredHighscores.length;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Leseteppich";
  }, []);


  return (
    <main>
      <LeseteppichAppBar/>

      <Timeline position={"alternate"} sx={{pt: 7, pb: 4}}>
        {leseteppiche.map((teppich: Leseteppich, index) => (
            <TimelineItem key={teppich.id}>
              <TimelineSeparator>
                <TimelineConnector sx={{opacity: index === 0 ? 0 : 1}}/>
                <Link to={`/teppich/${teppich.id}`}
                      data-tut="reactour_start-timelinedot">
                  <TimelineDot
                    color={highscoreLength(teppich.id) >= 5 ? "success" : highscoreLength(teppich.id) > 0 ? "yellow" : "primary"}
                    sx={{width: "36px", display: "flex", justifyContent: "center", alignItems: "center"}}
                  >
                    {teppich.id}
                  </TimelineDot>
                </Link>
                <TimelineConnector sx={{opacity: index === (leseteppiche.length - 1) ? 0 : 1}}/>
              </TimelineSeparator>
              <TimelineContent sx={{m: "auto 0", width: "500px"}}>
                <Link to={`/teppich/${teppich.id}`}
                      data-tut="reactour_start-timelinedot">
                  <Typography variant="h6" component="span" color={"text.primary"}>
                    {teppich.name}
                  </Typography>
                </Link>
              </TimelineContent>
            </TimelineItem>
          ),
        )}

      </Timeline>

      <Box
        component="footer"
        position={"fixed"}
        bottom={0}
        sx={{
          width: "100%",
          px: 2,
          py: 1,
          backgroundColor: (theme) =>
            `${theme.palette.grey[200]}C8`,
        }}
      >

        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="body1">©2024 von Bastian Harttung</Typography>

          <Link to={"https://github.com/BastianHarttung"} target={"_blank"}>
            <GitHubIcon/>
          </Link>
        </Box>

      </Box>
    </main>
  );
}
