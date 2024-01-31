import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useHighscore } from "../../helper-functions/Hooks";
import { useParams } from "react-router-dom";
import moment from "moment"
import { Box, Typography } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: 'place',
    headerName: 'Platz',
    width: 55,
    flex: 0,
    disableColumnMenu: true,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: 'countMin',
    headerName: 'Wörter/Min',
    type: "number",
    minWidth: 95,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: 'time',
    headerName: 'Zeit',
    type: "number",
    minWidth: 65,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.time / 60} Min`,
  },
  {
    field: 'count',
    headerName: 'Wörter',
    type: 'number',
    minWidth: 65,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: 'creationTime',
    headerName: 'Datum/Zeit',
    minWidth: 140,
    flex: 2,
    disableColumnMenu: true,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      moment(new Date(params.row.creationTime)).format("DD.MM.YYYY | HH:mm"),
  },
];

export interface HighscoreTableRow {
  place: number,
  countMin: number,
  time: number,
  count: number,
  creationTime: number
}

function CustomNoRowsOverlay() {
  return (
    <Box display={"flex"}
         alignItems={"center"}
         justifyContent={"center"}
         sx={{width: "100%", height: "100%"}}>
      <Typography variant={"body1"}>Noch keine Höchstpunkte</Typography>
    </Box>
  );
}

const HighscoreTable = () => {
  const {id} = useParams()
  const {getHighscoreOfTeppichForTable} = useHighscore()

  const rows = getHighscoreOfTeppichForTable(Number(id))


  return (
    <DataGrid
      getRowId={(row) => row.place}
      rows={rows}
      columns={columns}
      disableColumnFilter
      density={rows.length < 3 ? "standard" : "compact"}
      hideFooter
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
      }}
    />
  );
};

export default HighscoreTable;
