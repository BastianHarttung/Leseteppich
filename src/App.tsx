import "./App.scss";
import { SetStateAction, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TourProvider} from "@reactour/tour";
import NoSleep from "nosleep.js";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Start from "./pages/Start/Start.tsx";
import Teppich from "./pages/Teppich/Teppich.tsx";
import FourOhFour from "./pages/404/FourOhFour.tsx";
import Imprint from "./pages/Imprint/Imprint.tsx";
import { steps } from "./help-tour-steps.tsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


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

  const [step, setStep] = useState(0)

  const redirect = useNavigate()

  const disableBody = (target: Element | null) => {
    disableBodyScroll(target!)
  }
  const enableBody = (target: Element | null) => {
    enableBodyScroll(target!)
  };

  const handleSetCurrentStep = (step: SetStateAction<number>) => {
    switch (step) {
      case 0:
        redirect("/");
        break;
      case 1:
        redirect("/teppich/1");
        break;
      default:
        break;
    }
    setStep(step);
  };

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
      <TourProvider steps={steps}
                    afterOpen={disableBody}
                    beforeClose={enableBody}
                    showBadge={false}
                    startAt={0}
                    currentStep={step}
                    setCurrentStep={handleSetCurrentStep}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<Start/>}/>
            <Route path="teppich/:id" element={<Teppich/>}/>
            <Route path="/impressum" element={<Imprint/>}/>
            <Route path="*" element={<FourOhFour/>}/>
          </Routes>
        </ThemeProvider>
      </TourProvider>
    </>
  );
}

export default App;
