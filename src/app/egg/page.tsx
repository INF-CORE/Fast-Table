import React from 'react';
import './Game.css';

const Game = () => {
  return (
    <div className="game-container">
      <iframe
        src="/egg/test.html"
        className="game-iframe"
        frameBorder="0"
        title="Godot Game"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Game;
