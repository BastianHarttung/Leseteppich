import { ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { Game } from "./Game/Game.tsx";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { useGameStore } from "../../store/game-store.ts";
import LeseLogo from "../../assets/Leseteppich_Logo.svg";


export default function Teppich() {
  const {isPlayGame, startGame, stopGame} = useGameStore(
    useShallow((state) => (
      {isPlayGame: state.isPlayGame, startGame: state.startGame, stopGame: state.stopGame})),
  )
  const {initialTimeInSeconds, setTimeInSeconds} = useGameStore(
    useShallow((state) => (
      {initialTimeInSeconds: state.initialTimeInSeconds, setTimeInSeconds: state.setTimeInSeconds})),
  )

  const {id} = useParams()

  const findTeppich = leseteppiche.find((tepp) => tepp.id === Number(id))

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeInSeconds(event.target.value)
  }


  return (
    <main>
      {!isPlayGame ? (
          <>
            <AppBar position="fixed">
              <Toolbar>
                <Link to={"/"}>
                  <Button variant={"contained"}
                          size={"small"}
                          startIcon={<img src={LeseLogo}
                                          alt="Leseteppich-Logo"
                                          height={32}/>}>
                    Zurück zur Leseteppich Auswahl
                  </Button>
                </Link>
              </Toolbar>
            </AppBar>

            <Box sx={{mt: 10}}
                 display={"flex"}
                 flexDirection={"column"}
                 alignItems={"center"}
                 gap={1}>
              <Typography variant={"h4"}>
                Leseteppich Nr.{id}
              </Typography>

              <Typography variant={"body1"}
                          sx={{fontSize: "1.3rem"}}>
                {findTeppich?.chars.join(", ")}
              </Typography>

              <TextField type={"number"}
                         size={"small"}
                         label={"Zeit in Minuten"}
                         value={(initialTimeInSeconds / 60).toString()}
                         onChange={handleChange}
                         sx={{mt: 2, width: "110px"}}/>

              <Button variant={"contained"}
                      onClick={startGame}
                      size={"large"}>Start</Button>
            </Box>
          </>)
        : <Game onStop={stopGame}/>
      }
    </main>
  );
}