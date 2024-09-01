import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { GameProvider } from './context';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}

export default App;
