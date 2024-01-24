import "./Teppich.scss"
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { Game } from "./Game/Game.tsx";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { useGameStore } from "../../store/game-store.ts";
import LeseLogo from "../../assets/Leseteppich_Logo.svg";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';


export default function Teppich() {
  const [teppichPic, setTeppichPic] = useState(null)

  const {id} = useParams()

  const {isPlayGame, startGame, stopGame} = useGameStore(
    useShallow((state) => (
      {isPlayGame: state.isPlayGame, startGame: state.startGame, stopGame: state.stopGame})),
  )
  const {initialTimeInSeconds, setTimeInSeconds, addMinute, removeMinute} = useGameStore(
    useShallow((state) => (
      {
        initialTimeInSeconds: state.initialTimeInSeconds,
        setTimeInSeconds: state.setTimeInSeconds,
        addMinute: state.addMinute,
        removeMinute: state.removeMinute
      })),
  )

  const findTeppich = leseteppiche.find((tepp) => tepp.id === Number(id))

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeInSeconds(event.target.value)
  }

  const handleStart = () => {
    if (findTeppich) {
      startGame(findTeppich.strings.length)
    }
  }

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen({navigationUI: "hide"})
  }

  useEffect(() => {
    handleFullscreen()
  }, []);

  useEffect(() => {
    const importTeppichPic = async () => {
      try {
        const module = await import(`../../assets/leseteppiche-scans/Leseteppich_${id}.jpg`);
        setTeppichPic(module.default);
      } catch (error) {
        console.error('Fehler beim Laden des Bildes:', error);
      }
    };

    importTeppichPic();
  }, [id]);


  if (!findTeppich) return (
    <main>
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
          Kein Teppich mit der Nummer {id}
        </Typography>
      </Box>
    </main>
  )

  return (
    <main>
      {!isPlayGame ? (
          <>
            <AppBar position="fixed">
              <Toolbar sx={{justifyContent: "space-between"}}>
                <Link to={"/"}>
                  <Button variant={"contained"}
                          size={"small"}
                          startIcon={<img src={LeseLogo}
                                          alt="Leseteppich-Logo"
                                          height={28}/>}>
                    Zurück zur Leseteppich Auswahl
                  </Button>
                </Link>

                <Button variant={"contained"}
                        onClick={handleFullscreen}
                        startIcon={<FullscreenIcon/>}>
                  Vollbild
                </Button>
              </Toolbar>
            </AppBar>

            <Box sx={{mt: 10}}
                 display={"flex"}
                 flexDirection={"column"}
                 alignItems={"center"}
                 gap={0.5}>

              <Box className={"header-box"}>
                {teppichPic && <img src={teppichPic} alt={`Leseteppich_${id}.jpg`}
                                    height={75}/>}

                <Box>
                  <Typography variant={"h4"} textAlign={"left"}>
                    Leseteppich Nr.{id}
                  </Typography>

                  <Typography variant={"body1"}
                              sx={{fontSize: "1.3rem"}}>
                    {findTeppich?.chars.join(", ")}
                  </Typography>
                </Box>
              </Box>

              <Box display={"flex"}
                   alignItems={"flex-end"}>
                <Button variant={"outlined"}
                        size={"small"}
                        onClick={removeMinute}
                        disabled={initialTimeInSeconds <= 60}>
                  <RemoveIcon/>
                </Button>

                <TextField type={"number"}
                           size={"small"}
                           label={"Zeit in Minuten"}
                           value={(initialTimeInSeconds / 60).toString()}
                           onChange={handleChange}
                           sx={{mt: 2, width: "110px"}}
                           inputProps={{style: {textAlign: "center"}}}/>

                <Button variant={"outlined"}
                        size={"small"}
                        onClick={addMinute}>
                  <AddIcon/>
                </Button>
              </Box>

              <Button variant={"contained"}
                      onClick={handleStart}
                      size={"large"}>Start</Button>
            </Box>
          </>)
        : <Game leseTeppich={findTeppich!}
                onStop={stopGame}/>
      }
    </main>
  );
}