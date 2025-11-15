// src/hooks/useFetch.js
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);      // To store API data
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null);     // Optional: Handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};