import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { GameProvider } from './context';

function App() {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
}

export default App;
