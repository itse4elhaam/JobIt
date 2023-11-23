import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapidAPIKey = RAPID_API_KEY;

export default function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {...query},
  };

  
  async function fetchData() {
    setIsLoading(true);
    
    try {
      const res = await axios.request(options);
      setData(res.data.data);
      setResponse(res);
      
      // console.log("USE FETCH DATA: ")
      // console.log(options)
      // console.log("data: ");
      // console.log(response);
      
    } catch (error) {
      setError(error);
      console.log(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    console.log(response)
    console.log(data)
    console.log(error)
  }, []);

  function refetch() {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}
