import "./Teppich.scss";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Toolbar,
  Typography,
  Menu,
  MenuItem, ListItemIcon, ListItemText, IconButton, Stack,
} from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { Game } from "./Game/Game.tsx";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { useGameStore } from "../../store/game-store.ts";
import LeseLogo from "../../assets/Leseteppich_Logo.svg";
import ModalImage from "../../components/Modals/ModalImage.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { toggleFullscreen } from "../../helper-functions";
import NoTeppich from "./NoTeppich/NoTeppich.tsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ModalHighscore from "../../components/Modals/ModalHighscore.tsx";


export default function Teppich() {
  const [teppichPic, setTeppichPic] = useState(null);

  const {id} = useParams();

  const windowHeight = window.innerHeight;

  const {setActiveTeppichId} = useGameStore(
    useShallow((state) => (
      {setActiveTeppichId: state.setActiveTeppichId}
    )),
  );
  const {isPlayGame, startGame, stopGame} = useGameStore(
    useShallow((state) => (
      {isPlayGame: state.isPlayGame, startGame: state.startGame, stopGame: state.stopGame})),
  );
  const {initialTimeInSeconds, setTimeInSeconds, addMinute, removeMinute} = useGameStore(
    useShallow((state) => (
      {
        initialTimeInSeconds: state.initialTimeInSeconds,
        setTimeInSeconds: state.setTimeInSeconds,
        addMinute: state.addMinute,
        removeMinute: state.removeMinute,
      })),
  );
  const {openImageModal} = useGameStore(
    useShallow((state) => (
      {openImageModal: state.openImageModal}
    )),
  );
  const {openHighscoreModal} = useGameStore(
    useShallow((state) => (
      {openHighscoreModal: state.openHighscoreModal}
    )),
  );
  const {isKingsMarked, toggleKingsMarked} = useGameStore(
    useShallow((state) => (
      {isKingsMarked: state.isKingsMarked, toggleKingsMarked: state.toggleKingsMarked}
    )),
  );
  const {isFullscreen, checkFullscreen} = useGameStore(
    useShallow((state) => (
      {isFullscreen: state.isFullscreen, checkFullscreen: state.checkFullscreen}
    )),
  );

  const findTeppich = leseteppiche.find((tepp) => tepp.id === Number(id));

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (Number(event.target.value) > 0) {
      setTimeInSeconds(event.target.value);
    }
  };

  const handleStart = () => {
    if (findTeppich) {
      startGame(findTeppich.strings.length);
    }
  };

  const handleImageClick = () => {
    openImageModal();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMoreMenu = Boolean(anchorEl);

  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleHighscoreClick = () => {
    handleCloseMore();
    openHighscoreModal();
  };

  useEffect(() => {
    const importTeppichPic = async () => {
      try {
        const module = await import(`../../assets/leseteppiche-scans/Leseteppich_${id}.jpg`);
        setTeppichPic(module.default);
      } catch (error) {
        console.error("Fehler beim Laden des Bildes:", error);
      }
    };

    if (findTeppich) importTeppichPic();
  }, [id, findTeppich]);

  useEffect(() => {
    checkFullscreen();
    document.addEventListener("fullscreenchange", checkFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, [checkFullscreen]);

  useEffect(() => {
    if (findTeppich) setActiveTeppichId(findTeppich.id);
  }, [findTeppich, setActiveTeppichId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (!findTeppich) return (
    <NoTeppich/>
  );

  return (
    <main style={{justifyContent: windowHeight < 400 ? "flex-start" : "center"}}>
      {!isPlayGame ? (
          <Box paddingBottom={2}>
            <ModalImage/>

            <ModalHighscore/>

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

                <Stack direction={"row"} alignItems={"center"} gap={2}>
                  {/*<IconButton sx={{color:"white"}}>*/}
                  {/*  <HelpOutlineIcon/>*/}
                  {/*</IconButton>*/}

                  <Button variant={"contained"}
                          onClick={toggleFullscreen}
                          startIcon={isFullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}>
                    {isFullscreen ? "Verkleinern" : "Vollbild"}
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>

            <Box sx={{mt: 10}}
                 display={"flex"}
                 flexDirection={"column"}
                 alignItems={"center"}
                 gap={0.5}>

              <Box className={"header-box"}>
                {teppichPic && <Button onClick={handleImageClick}>
                  <img src={teppichPic}
                       alt={`Leseteppich_${id}.jpg`}
                       height={75}/>
                </Button>}

                <Box>
                  <Typography variant={"h4"} textAlign={"left"}>
                    Leseteppich Nr.{id}
                  </Typography>

                  <Typography variant={"body1"}
                              sx={{fontSize: "1.3rem"}}>
                    {findTeppich?.chars.join(", ")}
                  </Typography>
                </Box>

                <Box height={73}>
                  <IconButton onClick={handleClickMore}>
                    <MoreVertIcon/>
                  </IconButton>
                </Box>

                <Menu id="more-menu"
                      anchorEl={anchorEl}
                      open={openMoreMenu}
                      onClose={handleCloseMore}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}>
                  <MenuItem onClick={handleHighscoreClick}>
                    <ListItemIcon><FormatListNumberedIcon/></ListItemIcon>
                    <ListItemText><Typography>Höchste Punkte</Typography></ListItemText>
                  </MenuItem>
                </Menu>

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

              <FormControlLabel checked={isKingsMarked}
                                control={<Switch value={isKingsMarked}
                                                 onChange={toggleKingsMarked}/>}
                                label="Könige (A,E,I,O,U) markieren"
                                sx={{mr: 0}}/>

              <Button variant={"contained"}
                      onClick={handleStart}
                      size={"large"}>Start</Button>
            </Box>
          </Box>)
        : <Game leseTeppich={findTeppich!}
                onStop={stopGame}/>
      }
    </main>
  )
    ;
}
