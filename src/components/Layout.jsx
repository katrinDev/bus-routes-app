import React from "react";
import MyNavbar from "./AdminNavbar";

export default function Layout({ children }) {

  return (
    <>
      <MyNavbar />
      <h1 style={{ paddingTop: "30px" }}>Work with Json file</h1>
      <div style={{ padding: '20px' }}>{children}</div>
    </>
  )
}
