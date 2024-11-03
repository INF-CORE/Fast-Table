"use client";

const PlayerStatus = ({ players }) => {
  return (
    <div>
      {players.map(player => (
        <div key={player.id}>
          {player.name} - {player.piece}
        </div>
      ))}
    </div>
  );
};

export default PlayerStatus;
