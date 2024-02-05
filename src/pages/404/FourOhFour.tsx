import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";
import { Typography } from "@mui/material";

const FourOhFour = () => {
  return (
    <main>
      <LeseteppichAppBar/>
      <Typography variant={"h5"}>404 Falsche URL</Typography>
    </main>
  );
};

export default FourOhFour;
