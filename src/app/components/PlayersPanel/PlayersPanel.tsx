import React, { FC, useState } from 'react';
import './PlayersPanel.sass';
import Player from './Player/Player';
import PlayerEdit from '../PlayerEdit/PlayerEdit';

interface Player {
  name: string;
  avatar: string;
}

interface PlayersPanelProps {
  func: () => void;
}

const PlayersPanel: FC<PlayersPanelProps> = ({ func }) => {
  const players: Player[] = [
    { name: 'Player 1', avatar: '/avatar1.png' },
    { name: 'Player 2', avatar: '/avatar2.png' },
    { name: 'Player 3', avatar: '/avatar3.png' },
  ];
  const [edittoggle, setEdittoggle] = useState<boolean>(false);

  return (
    <>
      {edittoggle ? (
        <div className="edit-mode">
          <PlayerEdit func={() => { setEdittoggle(false); }} />
        </div>
      ) : (
        <div className="modal">
          <div className="modal-content">
            <h1>Players List</h1>
            <img src="/close.svg" width={40} className="close-btn" onClick={func} />
            {players.map((player: Player, index: number) => (
              <Player func={() => { setEdittoggle(true); }} key={index} name={player.name} avatar={player.avatar} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PlayersPanel;