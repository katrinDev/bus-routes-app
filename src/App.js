import { useState } from "react";
import Layout from "./components/Layout";
import "./styles/App.css";
import { DataContext } from "./context/context";
import TasksTable from "./components/TasksTable"

function App() {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      <Layout>
        <TasksTable/>
      </Layout>
    </DataContext.Provider>
  );
}

export default App;   
