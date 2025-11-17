import './Teppich.scss';
import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import { useShallow } from 'zustand/react/shallow';
import {
  AppBar, Box, Button, FormControlLabel, Switch, TextField, Toolbar, Typography,
  Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Stack,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LeseLogo from '../../assets/Leseteppich_Logo.svg';
import ModalHighscore from '../../components/Modals/ModalHighscore.tsx';
import ModalImage from '../../components/Modals/ModalImage.tsx';
import { Game } from './Game/Game.tsx';
import { toggleFullscreen, uniqueStrings } from '../../helper-functions';
import NoTeppich from './NoTeppich/NoTeppich.tsx';
import { useGameStore } from '../../store/game-store.ts';
import { useHelpTourStore } from '../../store/help-tour-store.ts';
import { useJsonStore } from '../../store/json-store.ts';


export default function Teppich() {
  const {id} = useParams();

  const location = useLocation();

  const {setIsOpen, setCurrentStep} = useTour();

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

  const {setStartingHelpUrl} = useHelpTourStore(
    useShallow((state) => (
      {setStartingHelpUrl: state.setStartingHelpUrl}
    )),
  );

  const {json} = useJsonStore();

  const findTeppich = json?.find((tepp) => tepp.id === Number(id));

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (Number(event.target.value) > 0) {
      setTimeInSeconds(event.target.value);
    }
  };

  const handleStart = () => {
    if (findTeppich) {
      startGame(uniqueStrings(findTeppich.strings).length);
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

  const handleHelp = () => {
    const url = location.pathname;
    setStartingHelpUrl(url);
    setCurrentStep(0);
    setIsOpen(true);
  };

  // useEffect(() => {
  //   const importTeppichPic = async () => {
  //     try {
  //       if (findTeppich && findTeppich.images) {
  //         const module = await import(findTeppich.images[0]);
  //         setTeppichPic(module.default);
  //       }
  //     } catch (error) {
  //       setTeppichPic(null);
  //       console.error('Fehler beim Laden des Bildes oder keins vorhanden:', error);
  //     }
  //   };
  //
  //   if (findTeppich) importTeppichPic();
  // }, [id, findTeppich]);

  useEffect(() => {
    checkFullscreen();
    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, [checkFullscreen]);

  useEffect(() => {
    if (findTeppich) {
      setActiveTeppichId(findTeppich.id);
      document.title = findTeppich.name;
    }
  }, [findTeppich, setActiveTeppichId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (!findTeppich) return (
    <NoTeppich/>
  );

  return (
    <main style={{justifyContent: windowHeight < 348 ? 'flex-start' : 'center'}}>
      {!isPlayGame ? (
          <Box paddingBottom={2}>

            <ModalImage/>

            <ModalHighscore/>

            <AppBar position="fixed">
              <Toolbar sx={{justifyContent: 'space-between'}}>
                <Link to={'/'}>
                  <Button variant={'contained'}
                          size={'small'}
                          startIcon={<img src={LeseLogo}
                                          alt="Leseteppich-Logo"
                                          height={28}/>}>
                    Zurück zur Leseteppich Auswahl
                  </Button>
                </Link>

                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <IconButton sx={{color: 'white'}}
                              onClick={handleHelp}>
                    <HelpOutlineIcon/>
                  </IconButton>

                  <Button variant={'contained'}
                          onClick={toggleFullscreen}
                          startIcon={isFullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                          data-tut="reactour_fullscreen">
                    {isFullscreen ? 'Verkleinern' : 'Vollbild'}
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>

            <Box sx={{mt: 10}}
                 display={'flex'}
                 flexDirection={'column'}
                 alignItems={'center'}
                 gap={0.5}>

              <Box className={'header-box'}>
                {findTeppich.images && (
                  <Button data-tut="reactour_image"
                          sx={{minWidth: '128px'}}
                          onClick={handleImageClick}>
                    <img src={findTeppich.images[0]}
                         alt={`Leseteppich_${id}.jpg`}
                         height={75}/>
                  </Button>
                )}

                <Box>
                  <Typography variant={'h4'} textAlign={'left'}>
                    {findTeppich.name}
                  </Typography>

                  <Typography variant={'body1'}
                              sx={{fontSize: '1.1rem', textAlign: 'left'}}>
                    {findTeppich?.chars.join(', ')}
                  </Typography>
                </Box>

                <Box height={73}>
                  <IconButton onClick={handleClickMore}
                              data-tut="reactour_more-btn">
                    <MoreVertIcon/>
                  </IconButton>
                </Box>

                <Menu id="more-menu"
                      anchorEl={anchorEl}
                      open={openMoreMenu}
                      onClose={handleCloseMore}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}>
                  <MenuItem onClick={handleHighscoreClick}>
                    <ListItemIcon><FormatListNumberedIcon/></ListItemIcon>
                    <ListItemText><Typography>Höchste Punkte</Typography></ListItemText>
                  </MenuItem>
                </Menu>

              </Box>

              <Box display={'flex'}
                   alignItems={'flex-end'}
                   data-tut="reactour_time">
                <Button variant={'outlined'}
                        size={'small'}
                        onClick={removeMinute}
                        disabled={initialTimeInSeconds <= 60}>
                  <RemoveIcon/>
                </Button>

                <TextField type={'number'}
                           size={'small'}
                           label={'Zeit in Minuten'}
                           value={(initialTimeInSeconds / 60).toString()}
                           onChange={handleChange}
                           sx={{mt: 2, width: '110px'}}
                           inputProps={{style: {textAlign: 'center'}}}/>

                <Button variant={'outlined'}
                        size={'small'}
                        onClick={addMinute}>
                  <AddIcon/>
                </Button>
              </Box>

              <FormControlLabel checked={isKingsMarked}
                                control={<Switch value={isKingsMarked}
                                                 onChange={toggleKingsMarked}/>}
                                label="Könige (A,E,I,O,U) markieren"
                                sx={{mr: 0}}
                                data-tut="reactour_kings"/>

              <Button variant={'contained'}
                      onClick={handleStart}
                      size={'large'}
                      data-tut="reactour_start">Start</Button>
            </Box>
          </Box>)
        : <Game leseTeppich={findTeppich!}
                onStop={stopGame}/>
      }
    </main>
  )
    ;
}
