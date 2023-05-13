import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "routeNumber",
    headerName: "Route Number",
    width: 150,
    editable: false,
  },
  {
    field: "doubleDeckerPeopleAmount",
    headerName: "Double Decker Byers Amount",
    type: "number",
    width: 300,
    editable: false,
  },
  {
    field: "doubleDeckerProfitAmount",
    headerName: "Double Decker Profit Amount",
    type: "number",
    width: 300,
    editable: false,
  },
  {
    field: "singleDeckerPeopleAmount",
    headerName: "Single Decker Byers Amount",
    type: "number",
    width: 300,
    editable: false,
  },
  {
    field: "singleDeckerProfitAmount",
    headerName: "Single Decker Profit Amount",
    type: "number",
    width: 300,
    editable: false,
  },
];

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      "& .MuiDataGrid-cell": {
        fontSize: "18px",
      },
      "& .MuiDataGrid-columnHeader": {
        fontSize: "18px",
        fontWeight: "bold",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  }),
  { defaultTheme }
);

export default function OrdersTable({data}) {
  const classes = useStyles();

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        classes={classes}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
