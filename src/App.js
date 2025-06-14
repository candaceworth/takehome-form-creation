import useGetData from "./hooks/useGetData";
import BandForm from "./BandForm";

function App() {
  const { band, loading, error } = useGetData();
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {band.length > 0 && <BandForm band={band[0]} />}
    </div>
  );
}

export default App;
