import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header.js';
import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';

function App() {

  const [activeButton, setActiveButton] = useState('graph2D');

  return (
    <div>
      <Header
        activeButton = {activeButton}
        key = {activeButton}
        setActiveButton = {name => setActiveButton(name)}
      />
      {activeButton === 'calculator' ?
      <Calculator /> :
      activeButton === 'graph2D' ?
      <Graph2D /> :
      activeButton === 'graph3D' ?
      <Graph3D /> : ''}
    </div>
  );
}

export default App;
