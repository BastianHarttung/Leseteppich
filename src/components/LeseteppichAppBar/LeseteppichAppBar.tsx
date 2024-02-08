import { useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTour } from "@reactour/tour";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import LeseLogo from "../../assets/Leseteppich_Logo_Text.svg";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


const LeseteppichAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {setIsOpen, setCurrentStep} = useTour()

  const navigate = useNavigate()

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleHelp = () => {
    handleCloseMenu();
    navigate("/")
    setCurrentStep(0)
    setIsOpen(true)
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{display: "flex", justifyContent: "center", gap: "8px"}}>
        <Link to="/">
          <img src={LeseLogo}
               alt="Leseteppich-Logo"
               height={48}/>
        </Link>

        <IconButton onClick={handleOpenMenu}
                    sx={{color: "#fff", position: "absolute", right: 16}}>
          <MenuRoundedIcon fontSize={"large"}/>
        </IconButton>

        <Menu anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}>
          <MenuItem onClick={handleHelp}>
            Hilfe
          </MenuItem>

          <MenuItem onClick={handleCloseMenu}>
            <Link to={"/impressum"} style={{color: "#000", fontWeight: 400}}>
              Impressum
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default LeseteppichAppBar;
