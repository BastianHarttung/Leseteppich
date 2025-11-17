import { Link, useParams } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import LeseLogo from "../../../assets/Leseteppich_Logo.svg";


const NoTeppich = () => {
  const {id} = useParams();

  return (
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
  );
};

export default NoTeppich;
