import logo from './logo.svg';
import './App.css';
import {button,container} from 'react-bootstrap'; //as included via cli command

function App() {
  return (
    // // using bootstrap classes directly or via react-bootstrap components
    // <div className="container py-4">
    //   <h1 className="mb-3">Bootstrap in React</h1>
    //   <button className="btn btn-primary">Primary Button</button>
    // </div>

    <container className="py-4">
      <h1 className="mb-3">React-Bootstrap successfully implemented</h1>
      <button variant="success">Success</button>
    </container>
  // );


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
