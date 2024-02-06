import LeseteppichAppBar from "../../components/LeseteppichAppBar/LeseteppichAppBar.tsx";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const Imprint = () => {
  useEffect(() => {
    document.title = "Leseteppich Impressum"
  }, []);


  return (
    <main style={{justifyContent: "flex-start"}}>
      <LeseteppichAppBar/>

      <Box display={"flex"} flexDirection={"column"} gap={2} py={10}>
        <Typography variant={"h6"}>Impressum</Typography>
        <Typography variant={"body1"}>Dies ist ein ausschließlich privates Projekt von Bastian Harttung ohne
          kommerzielle Absichten.</Typography>
      </Box>
    </main>
  );
};

export default Imprint;
