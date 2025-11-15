
// src/App.js
import React from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error}</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Fetch data from API</h2>
      <ul>
        {data.slice(0, 5).map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
