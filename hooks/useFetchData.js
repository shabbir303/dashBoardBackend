import axios from "axios";
import { useState, useEffect } from "react";

function fetchData(apiEndpoint) {
  const [allData, setAllData] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const allData = res.data;
        setAllData(allData);
        setLoading(false);
      } catch (err) {
            setLoading(false);
      }
    };
      //   fetch data if only categroy exists
      if(apiEndpoint){
        fetchAllData()
      }
  }, [initialLoad, apiEndpoint]);
   return { allData, loading };
}
export default fetchData;