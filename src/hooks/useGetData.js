import { useState, useEffect } from "react";

/* Moved the band JSON files to the public folder so they can be accessed via fetch. */

function useGetData() {
  const [band, setBand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBandData() {
      const urls = [
        "/band-json/kpop-band.json",
        "/band-json/punk-band.json",
        "/band-json/ska-band.json",
      ];

      const allData = [];
      setLoading(true);
      setError(null);

      for (let url of urls) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          allData.push(data);
        } catch (error) {
          console.log(error.message);
          setError("Unable to get data");
        }
      }
      setBand(allData);
      setLoading(false);
    }
    fetchBandData();
  }, []);

  return { band, loading, error };
}

export default useGetData;
