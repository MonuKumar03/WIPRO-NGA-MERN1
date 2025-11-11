import React, { useState, useEffect } from 'react';
import PureDisplay from '../components/PureDisplay';

function HeavyPage() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // Simulate heavy computation
  useEffect(() => {
    // Artificial delay to simulate heavy loading
    const timer = setTimeout(() => {
      const mockData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 1000
      }));
      setData(mockData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Heavy computation function
  const computeHeavy = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    return result;
  };

  const heavyResult = computeHeavy();

  return (
    <div className="heavy-page">
      <h2>Heavy Page Loaded!</h2>
      <p>This component was lazy-loaded and represents a heavy chunk.</p>
      
      <div className="demo-section">
        <h3>Pure Component Demo</h3>
        <PureDisplay value={count} />
        <button onClick={() => setCount(c => c + 1)}>
          Increment Count
        </button>
        <p>Check console to see when PureDisplay re-renders</p>
      </div>

      <div className="demo-section">
        <h3>Heavy Computation Result</h3>
        <p>Computed value: {heavyResult.toFixed(2)}</p>
      </div>

      <div className="demo-section">
        <h3>Large Data Set ({data.length} items)</h3>
        <div className="data-preview">
          {data.slice(0, 10).map(item => (
            <div key={item.id} className="data-item">
              {item.name}: {item.value.toFixed(2)}
            </div>
          ))}
          {data.length > 10 && <p>... and {data.length - 10} more items</p>}
        </div>
      </div>

      <div className="demo-section">
        <h3>Large Content Area</h3>
        <div className="content-area">
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>This is paragraph #{i + 1} in the heavy component.</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeavyPage;