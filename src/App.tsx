import "./App.scss";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NoSleep from "nosleep.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Start from "./pages/Start/Start.tsx";
import Teppich from "./pages/Teppich/Teppich.tsx";
import { CssBaseline } from "@mui/material";
import FourOhFour from "./pages/404/FourOhFour.tsx";
import Imprint from "./pages/Imprint/Imprint.tsx";
import { yellow } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    yellow: Palette["primary"];
  }

  interface PaletteOptions {
    yellow?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    yellow: true;
  }
}
declare module "@mui/lab/TimelineDot" {
  interface TimelineDotPropsColorOverrides {
    yellow: true;
  }
}

let lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#1ccceb",
    },
  },
});

lightTheme = createTheme(lightTheme, {
  // Custom colors created with augmentColor go here
  palette: {
    yellow: lightTheme.palette.augmentColor({
      color: {
        main: yellow["500"],
      },
      name: "yellow",
    }),
  },
});

function App() {

  useEffect(() => {
    // Initialisiere NoSleep
    const noSleep = new NoSleep();
    // Aktiviere NoSleep, wenn die Komponente montiert wird
    noSleep.enable();
    // Deaktiviere NoSleep, wenn die Komponente demontiert wird
    return () => {
      noSleep.disable();
    };
  }, []);


  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="teppich/:id" element={<Teppich/>}/>
          <Route path="/impressum" element={<Imprint/>}/>
          <Route path="*" element={<FourOhFour/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
