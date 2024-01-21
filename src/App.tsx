import './App.scss'
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Start from "./pages/Start/Start.tsx";
import Teppich from "./pages/Teppich/Teppich.tsx";


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Routes>
          <Route path={"/"} element={<Start/>}/>
          <Route path={"teppich/:id"} element={<Teppich/>}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
