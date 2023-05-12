import Layout from "./components/Layout";
import MyTable from "./components/MyTable";
import "./styles/App.css";

function App() {
  const [data, setData] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
      }}
    >
      <Layout>
        <MyTable/>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;   
