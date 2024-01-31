import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useHighscore } from "../../helper-functions/Hooks";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: 'place',
    headerName: 'Platz',
    width: 75,
    flex: 0,
    sortable: false
  },
  {
    field: 'countMin',
    headerName: 'Wörter/Min',
    type: "number",
    minWidth: 100,
    flex: 1,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'time',
    headerName: 'Zeit',
    type: "number",
    minWidth: 70,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.time / 60} Min`,
  },
  {
    field: 'count',
    headerName: 'Wörter',
    type: 'number',
    minWidth: 70,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: 'creationTime',
    headerName: 'Datum/Zeit',
    minWidth: 200,
    flex: 2,
    disableColumnMenu: true,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${new Date(params.row.creationTime).toISOString()}`,
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


  return (
    <DataGrid
      getRowId={(row) => row.place}
      rows={getHighscoreOfTeppichForTable(Number(id))}
      columns={columns}
      disableColumnFilter
      autoHeight={true}
      columnHeaderHeight={42}
      rowHeight={42}
      hideFooter
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
      }}
    />
  );
};

export default HighscoreTable;
