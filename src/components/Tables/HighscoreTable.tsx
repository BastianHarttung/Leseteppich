import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: 'id',
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

const rows = [
  {id: 1, countMin: 15, time: 300, count: 70, creationTime: 1706646828321},
  {id: 2, countMin: 14.5, time: 300, count: 70, creationTime: 1706646828321},
  {id: 3, countMin: 13, time: 60, count: 13, creationTime: 1706646828321},
  {id: 4, countMin: 12, time: 300, count: 62, creationTime: 1706646828321},
  {id: 5, countMin: 11.7, time: 300, count: 60, creationTime: 1706646828321},
];

const HighscoreTable = () => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnFilter
      columnHeaderHeight={42}
      rowHeight={42}
      hideFooter
      autoHeight={true}
    />
  );
};

export default HighscoreTable;
