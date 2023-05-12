import React, { useState } from "react";
import { Button, Tab, Tabs, TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


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
    },
  }),
  { defaultTheme }
);


const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "routeNumber", headerName: "Route Number", width: 150 },
  {
    field: "departureDate",
    headerName: "Departure Date",
    width: 230,
    renderHeader: (params) => (
      <div>
        {params.colDef.headerName}
        <IconButton size="small" onClick={params.onFilterIconClick}>
          <FilterListIcon fontSize="small" />
        </IconButton>
      </div>
    ),
  },
  { field: "departureTime", headerName: "Departure Time", width: 150 },
  { field: "destinationCity", headerName: "Destination", width: 150 },
  { field: "departureStation", headerName: "Departure Station", width: 200 },
  { field: "departurePlatform", headerName: "Platform", width: 100 },
  { field: "arrivalStation", headerName: "Arrival Station", width: 280 },
  { field: "ticketPrice", headerName: "Ticket Price", width: 150 },
  { field: "busBrand", headerName: "Bus Brand", width: 150 },
  { field: "travelTime", headerName: "Travel Time", width: 130 },
];

function MyTable() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    severity: "error",
    message: "",
  });



  const handleFileUpload = (event) => {
    try{
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target.result);
        setData(jsonData.buses);
        console.log(jsonData.buses);
      };
      reader.readAsText(file);
    } catch(error) {
      setSnackbarProps({
        ...snackbarProps,
        open: true,
        message: `${error.message}`,
      });
    }
    
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleFilterChange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      setData(
        data.filter((row) => {
          const date = new Date(row.departureDate);
          return date >= start && date <= end;
        })
      );
    } else {
      setData(data);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps({ ...snackbarProps, open: false });
  };

  return (
    <>
      <input
        accept="application/json"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          sx={{
            fontSize: "15px",
            fontWeight: "bold",
            display: "block",
            textAlign: "center",
          }}
        >
          Upload JSON File
        </Button>
      </label>
      <div style={{ marginTop: "10px" }}>
        <Tabs
          style={{ display: " inline-block" }}
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label="Table" />
          <Tab label="Inline Data" />
          <Tab label="Orders info" />
        </Tabs>
        {showFilter && (
          <>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              onBlur={handleFilterChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              onBlur={handleFilterChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}
      </div>

      <Box style={{ height: 600, width: "100%" }}>
        {tabIndex === 0 && (
          <DataGrid
            className={classes.root}
            rows={data}
            columns={columns.map((column) =>
              column.field === "departureDate"
                ? {
                    ...column,
                    renderHeader: (params) =>
                      column.renderHeader({
                        ...params,
                        onFilterIconClick: () => setShowFilter(!showFilter),
                      }),
                  }
                : column
            )}
            pageSizeOptions={[10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            onColumnFilterableChange={(params) =>
              setShowFilter(params.filterable)
            }
          />
        )}
        {tabIndex === 1 && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {
        <Snackbar
          open={snackbarProps.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarProps.severity}
            sx={{ width: "100%" }}
          >
            {snackbarProps.message}
          </Alert>
        </Snackbar>
      }
      </Box>
    </>
  );
}

export default MyTable;
