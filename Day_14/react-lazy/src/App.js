import React, { Suspense, useState, lazy } from 'react';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import PortalHost from './components/PortalHost';
import './index.css';

// Lazy load the heavy component
const HeavyPage = lazy(() => import('./pages/HeavyPage'));

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'lazy':
        return (
          <Suspense fallback={<div className="loading">Loading Heavy Page...</div>}>
            <HeavyPage />
          </Suspense>
        );
      case 'pure':
        return (
          <div>
            <h2>Pure Component Demo</h2>
            <p>Check the console to see when components re-render</p>
          </div>
        );
      case 'error':
        return (
          <div>
            <h2>Error Boundary Demo</h2>
            <ErrorBoundary>
              <ComponentThatMayError />
            </ErrorBoundary>
          </div>
        );
      case 'portal':
        return (
          <div>
            <h2>Portal Demo</h2>
            <button onClick={() => setShowModal(true)}>
              Open Modal Portal
            </button>
            <PortalHost>
              {showModal && (
                <div className="modal-backdrop">
                  <div className="modal-content">
                    <h3>Modal via Portal</h3>
                    <p>This is rendered outside the normal React tree!</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              )}
            </PortalHost>
          </div>
        );
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Features Demo</h1>
        <nav className="nav">
          <button onClick={() => setCurrentView('home')}>Home</button>
          <button onClick={() => setCurrentView('lazy')}>Lazy Load</button>
          <button onClick={() => setCurrentView('pure')}>Pure Component</button>
          <button onClick={() => setCurrentView('error')}>Error Boundary</button>
          <button onClick={() => setCurrentView('portal')}>Portal</button>
        </nav>
      </header>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

// Component that throws error for demo
function ComponentThatMayError() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a demo error!');
  }

  return (
    <div>
      <p>This component will throw an error when you click the button below:</p>
      <button onClick={() => setShouldError(true)}>
        Throw Error
      </button>
    </div>
  );
}

export default App;