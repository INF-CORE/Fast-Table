"use client";

const GameControl = () => {
  const move = (playerId) => {
    // Handle movement logic
  };

  return (
    <div>
      <button onClick={() => move('1')}>Move Player 1</button>
      <button onClick={() => move('2')}>Move Player 2</button>
    </div>
  );
};

export default GameControl;
