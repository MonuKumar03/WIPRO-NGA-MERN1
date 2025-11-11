import React from 'react';

function Home({ onNavigate }) {
  return (
    <div className="home">
      <h2>Welcome to React Features Demo</h2>
      <p>Explore different React features by clicking the navigation buttons above.</p>
      
      <div className="feature-grid">
        <div className="feature-card">
          <h3> Lazy Loading</h3>
          <p>Dynamic imports and code splitting with React.lazy()</p>
          <button onClick={() => onNavigate('lazy')}>Try Lazy Loading</button>
        </div>
        
        <div className="feature-card">
          <h3> Pure Component</h3>
          <p>Optimized re-renders with React.PureComponent</p>
          <button onClick={() => onNavigate('pure')}>Try Pure Component</button>
        </div>
        
        <div className="feature-card">
          <h3> Error Boundary</h3>
          <p>Catch JavaScript errors anywhere in the component tree</p>
          <button onClick={() => onNavigate('error')}>Try Error Boundary</button>
        </div>
        
        <div className="feature-card">
          <h3> Portal</h3>
          <p>Render children into a DOM node outside parent hierarchy</p>
          <button onClick={() => onNavigate('portal')}>Try Portal</button>
        </div>
      </div>
    </div>
  );
}

export default Home;