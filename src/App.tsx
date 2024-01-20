import './App.scss'
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start/Start.tsx";
import Teppich from "./pages/Teppich/Teppich.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Start/>}/>
        <Route path={"teppich/:id"} element={<Teppich/>}/>
      </Routes>
    </>
  )
}

export default App
