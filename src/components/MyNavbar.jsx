import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";

const MyNavbar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bus Routes App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyNavbar;
