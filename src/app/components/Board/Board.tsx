"use client";

import { useState } from 'react';

const Board = ({ players }) => {
  const [pieces, setPieces] = useState(players.map(player => ({ ...player, position: 0 })));

  const movePiece = (playerId, newPosition) => {
    setPieces(pieces.map(piece => piece.id === playerId ? { ...piece, position: newPosition } : piece));
  };

  return (
    <div>
      {/* Render the board and pieces */}
      {pieces.map(piece => (
        <div key={piece.id} style={{ position: 'absolute', left: piece.position * 10, top: 50 }}>
          {piece.piece}
        </div>
      ))}
    </div>
  );
};

export default Board;
