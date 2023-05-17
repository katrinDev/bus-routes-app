import React, { useState, useEffect, useRef } from "react";
import { Button, Tab, Tabs, TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {factoryMethodClient } from "../patterns/FactoryMethodClient.ts"

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


class TasksTableMediator {
  constructor() {
    this.components = {};
  }

  register(componentName, component) {
    this.components[componentName] = component;
  }

  handleFileUpload(event) {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target.result);

        console.log(jsonData);

        //patterns usage
        let fullData = factoryMethodClient(jsonData);
        console.log(fullData);
        this.components["TasksTable"].setData(fullData);
      };
      reader.readAsText(file);
    } catch (error) {
      this.components["TasksTable"].setSnackbarProps({
        ...this.components["TasksTable"].snackbarProps,
        open: true,
        message: `${error.message}`,
      });
    }
  }
}


const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "taskName", headerName: "Task Name", width: 250 },
  { field: "projectName", headerName: "Project Name", width: 150 },
  { field: "laborIntensity", headerName: "Labor intensity", width: 180 },
  { field: "plannedResource", headerName: "Planned Resourse", width: 200 },
  { field: "actualTimeSpent", headerName: "Actual Time Spent", width: 190 },
  { field: "actualTimeLeft", headerName: "Actual Time Left", width: 190 },
];

function TasksTable() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    severity: "error",
    message: "",
  });

  const mediator = useRef(new TasksTableMediator());
  useEffect(() => {
    mediator.current.register("TasksTable", {
      setData,
      snackbarProps,
      setSnackbarProps,
    });
  }, []);

   // Use mediator to handle file upload
   const handleFileUpload = (event) => {
    mediator.current.handleFileUpload(event);
  };

  // const handleFileUpload = (event) => {
  //   try{
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const jsonData = JSON.parse(event.target.result);

  //       console.log(jsonData);

  //       //patterns usage
  //       let fullData = factoryMethodClient(jsonData);
  //       console.log(fullData);
  //       setData(fullData);
  //     };
  //     reader.readAsText(file);
  //   } catch(error) {
  //     setSnackbarProps({
  //       ...snackbarProps,
  //       open: true,
  //       message: `${error.message}`,
  //     });
  //   }
    
  // };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
        </Tabs>
      </div>

      <Box style={{ height: 600, width: "100%" }}>
        {tabIndex === 0 && (
          <DataGrid
            classes={classes}
            rows={data}
            columns={columns}
            pageSizeOptions={[10]}
            components={{
              Toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                csvOptions: {
                  allColumns: true,
                },
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
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

export default TasksTable;
