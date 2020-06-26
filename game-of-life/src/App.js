import React from 'react';

import Grid from './components/Grid';
import './App.css';


function App() {

  const portfolio = () => {
    window.location.href = "https://luispepen.com"
  }

  return (
    <div className="app">
      <Grid />
      <footer>
        Developed by <span onClick={portfolio}>Luis Pepen</span>
      </footer>
    </div>
  );
}

export default App;
