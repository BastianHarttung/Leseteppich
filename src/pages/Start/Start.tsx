import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { Leseteppich } from "../../models/interfaces.ts";
import LeseLogo from "../../assets/Leseteppich_Logo_Text.svg"
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Start() {
  const windowHeight = window.innerHeight

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  return (
    <main style={{justifyContent: windowHeight < 500 ? "flex-start" : "center"}}>
      <AppBar position="fixed">
        <Toolbar sx={{display: "flex", justifyContent: "center", gap: "8px"}}>
          <img src={LeseLogo}
               alt="Leseteppich-Logo"
               height={48}/>
        </Toolbar>
      </AppBar>

      <Box display={"flex"} flexDirection={"column"} gap={2} py={10}>
        {leseteppiche.map((teppich: Leseteppich) => (
          <Link key={teppich.id}
                to={`/teppich/${teppich.id}`}>
            <Button variant="contained"
                    size="large">
              Leseteppich {teppich.id}
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
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >

        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="body1">
            ©2024 von Bastian Harttung
          </Typography>

          <Link to={"https://github.com/BastianHarttung"} target={"_blank"}>
            <GitHubIcon/>
          </Link>
        </Box>

      </Box>
    </main>
  )
}