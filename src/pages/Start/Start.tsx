import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { Leseteppich } from "../../models/interfaces.ts";
import GitHubIcon from '@mui/icons-material/GitHub';
import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";


export default function Start() {
  const windowHeight = window.innerHeight

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Leseteppich"
  }, []);


  return (
    <main style={{justifyContent: windowHeight < 500 ? "flex-start" : "center"}}>
      <LeseteppichAppBar/>

      <Box display={"flex"} flexDirection={"column"} gap={2} pt={10} pb={6}>
        {leseteppiche.map((teppich: Leseteppich) => (
          <Link key={teppich.id}
                to={`/teppich/${teppich.id}`}>
            <Button variant="contained"
                    size="large">
              {teppich.name}
            </Button>
          </Link>
        ))}
      </Box>

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
  )
}