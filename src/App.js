import { useState } from "react";
import BusTable from "./components/BusTable";
import Layout from "./components/Layout";
import "./styles/App.css";
import { DataContext } from "./context/context";

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
        <BusTable/>
      </Layout>
    </DataContext.Provider>
  );
}

export default App;   
