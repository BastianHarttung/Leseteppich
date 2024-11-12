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
import { liesMitPiri } from "../../data/leseteppich-data.ts";
import { Leseteppich } from "../../models/interfaces.ts";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";
import usePlayCount from "../../helper-functions/Hooks/usePlayCount.tsx";


export default function Start() {

  const {getPlayCount} = usePlayCount()

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Leseteppich";
  }, []);


  return (
    <main>
      <LeseteppichAppBar/>

      <Timeline position={"alternate"} sx={{pt: 7, pb: 4}}>
        {liesMitPiri.map((teppich: Leseteppich, index) => (
            <TimelineItem key={teppich.id}>
              <TimelineSeparator>
                <TimelineConnector sx={{opacity: index === 0 ? 0 : 1}}/>
                <Link to={`/teppich/${teppich.id}`}
                      data-tut="reactour_start-timelinedot">
                  <TimelineDot
                    color={getPlayCount(teppich.id) >= 5 ? "success" : getPlayCount(teppich.id) > 0 ? "yellow" : "primary"}
                    sx={{width: "36px", display: "flex", justifyContent: "center", alignItems: "center"}}
                  >
                    {teppich.id}
                  </TimelineDot>
                </Link>
                <TimelineConnector sx={{opacity: index === (liesMitPiri.length - 1) ? 0 : 1}}/>
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

      <Box component="footer"
           position={"fixed"}
           bottom={0}
           left={0}
           sx={{
             width: "100%",
             px: 2,
             py: 1,
             backgroundColor: (theme) =>
               `${theme.palette.grey[200]}C8`,
           }}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Link to={"https://school-apps.de"} target={"_blank"}
                style={{display: "flex"}}>
            <SchoolOutlinedIcon sx={{ fontSize: 28 }}/>
          </Link>

          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="body1">©2024 von Bastian Harttung</Typography>

            <Link to={"https://github.com/BastianHarttung"} target={"_blank"}
                  style={{display: "flex"}}>
              <GitHubIcon />
            </Link>
          </Box>
        </Box>

      </Box>
    </main>
  );
}
