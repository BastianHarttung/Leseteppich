import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { leseteppiche } from "../../data/leseteppich-data.ts";
import { Leseteppich } from "../../models/interfaces.ts";
import LeseLogo from "../../assets/Leseteppich_Logo_Text.svg"


export default function Start() {

  return (
    <main>
      <AppBar position="fixed">
        <Toolbar sx={{display: "flex", justifyContent: "center", gap: "8px"}}>
          <img src={LeseLogo}
               alt="Leseteppich-Logo"
               height={48}/>
        </Toolbar>
      </AppBar>
      {leseteppiche.filter((tepp) => tepp.id > 0)
        .map((teppich: Leseteppich) => (
          <Link key={teppich.id}
                to={`/teppich/${teppich.id}`}>
            <Button variant="contained"
                    size="large">
              Leseteppich {teppich.id}
            </Button>
          </Link>
        ))}
    </main>
  )
}