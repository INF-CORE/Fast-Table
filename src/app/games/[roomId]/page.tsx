"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import ChatComponent from "../../components/Chat/ChatComponent";
import PlayersPanel from "../../components/PlayersPanel/PlayersPanel";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel.tsx";
import Maps from "../../components/Maps/Maps.tsx";
import "../../styles/room.sass";
import { useCopyToClipboard } from "usehooks-ts";
import { ring2 } from 'ldrs'


ring2.register()

// Default values shown

// Loading
const socket = io("http://localhost:4000"); // адрес сервера

interface Player {
  id: string;
  name: string;
  piece: { x: number; y: number };
  roomId: string;
  color: string;
  isDM: boolean;
}

const GameComponent: React.FC = () => {
  const [players, setPlayers] = useState<{ [key: string]: Player }>({});
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = usePathname();
  const path = "https://fasttable.fun" + router;
  const [value, copy] = useCopyToClipboard();
  const [chpanel, setChpanel] = useState<boolean>(false)
  const [plpanel, setPlpanel] = useState<boolean>(false)
  const [mlpanel, setMlpanel] = useState<boolean>(false)

  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const roomId = window.location.pathname.split("/").pop();

    const handlePlayersUpdate = (updatedPlayers: { [key: string]: Player }) => {
      setPlayers(updatedPlayers);
      if (!currentPlayerId) {
        const defaultPlayer = Object.values(updatedPlayers).find(
          (p) => p.roomId === roomId,
        );
        if (defaultPlayer) {
          setCurrentPlayerId(defaultPlayer.id);
        }
      }
      setIsLoading(false);
    };

    socket.on("updatePlayers", handlePlayersUpdate);

    // Запрос состояния при подключении
    socket.emit("requestPlayers");

    return () => {
      socket.off("updatePlayers", handlePlayersUpdate);
    };
  }, [currentPlayerId]);

  const movePiece = (dx: number, dy: number) => {
    if (currentPlayerId) {
      const player = players[currentPlayerId];
      const newX = Math.max(0, Math.min(19, player.piece.x + dx)); // ограничиваем X
      const newY = Math.max(0, Math.min(9, player.piece.y + dy)); // ограничиваем Y
      const updatedPlayer = {
        ...player,
        piece: { x: newX, y: newY },
      };
      const updatedPlayers = {
        ...players,
        [player.id]: updatedPlayer,
      };
      setPlayers(updatedPlayers);
      socket.emit("movePiece", updatedPlayers);
    }
  };

  const handlePlayerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPlayerId(event.target.value);
  };
// aaaaaaaaaaaaaaaaaaa
  if (isLoading) {
    return (<l-ring-2 className="loading" size="40" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="0.8" color="white"></l-ring-2>);
  }
// aaaaaaaaaaaaaaaaaaaa
  const currentPlayer = currentPlayerId ? players[currentPlayerId] : null;

  const handleCopy = () => {
    copy(path);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div>
        <h1>Table</h1>
        <select value={currentPlayerId || ""} onChange={handlePlayerSelect}>
          {Object.values(players)
            .filter(
              (player) =>
                player.roomId === window.location.pathname.split("/").pop(),
            )
            .map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
        </select>
        {currentPlayer ? (
          <div className="grid">
            {Array.from({ length: 10 }).map((_, row) => (
              <React.Fragment key={row}>
                {Array.from({ length: 20 }).map((_, col) => {
                  const playerHere = Object.values(players).find(
                    (p) => p.piece.x === col && p.piece.y === row,
                  );
                  return (
                    <div
                      key={col}
                      className={`grid-cell ${playerHere ? "player" : ""}`}
                      style={{
                        backgroundColor: playerHere
                          ? playerHere.color
                          : "#232323",
                      }}
                    >
                      {playerHere ? playerHere.name.charAt(0) : ""}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
            <div
              className="controls"
              style={{
                top: `${currentPlayer.piece.y * 44}px`, // смещение по вертикали
                left: `${currentPlayer.piece.x * 44}px`, // смещение по горизонтали
              }}
            >
              <div
                className="control-group"
                style={{ top: "-50px", left: "0" }}
              >
                <button
                  className="control-button control-up"
                  onClick={() => movePiece(0, -1)}
                >
                  <img src="/up.svg" draggable="false" />
                </button>
              </div>
              <div
                className="control-group"
                style={{ top: "0", left: "-50px" }}
              >
                <button
                  className="control-button control-left"
                  onClick={() => movePiece(-1, 0)}
                >
                  <img src="/left.svg" draggable="false" />
                </button>
              </div>
              <div className="control-group" style={{ top: "0", left: "50px" }}>
                <button
                  className="control-button control-right"
                  onClick={() => movePiece(1, 0)}
                >
                  <img src="/right.svg" draggable="false" />
                </button>
              </div>
              <div className="control-group" style={{ top: "50px", left: "0" }}>
                <button
                  className="control-button control-down"
                  onClick={() => movePiece(0, 1)}
                >
                  <img src="/down.svg" draggable="false" />
                </button>
              </div>
            </div>
            <ChatComponent />
          </div>
        ) : (
          <p>No current player</p>
        )}
      </div>
      {currentPlayer ? (
        <div className="game-panel">
          <h2>
            Game Panel: {currentPlayer.isDM ? 'Dungeon Master' : 'Player'}
            <img src={currentPlayer.isDM ? "/dm.png" : "/pl.png"} width={currentPlayer.isDM ? 25 : 30} />
          </h2>
          <button
            className={`share-button ${isCopied ? "copied" : ""}`}
            onClick={handleCopy}
          >
            Share
            {isCopied && <span className="copied-text">Copied</span>}
          </button>
          {currentPlayer.isDM ? (
            <>
              <button onClick={() => {setPlpanel(true)}} className="panel-button">Players</button>
              <button className="panel-button">EDIT</button>
              <button onClick={() => {setMlpanel(true)}} className="panel-button">Maps</button>
              <button className="panel-button">Battles</button>
              <button className="panel-button">Enemies/NPC</button>
              <button className="panel-button">Items</button>
              <button className="panel-button">Characters</button>
            </>
          ) : (
            <>
              <button onClick={() => {setPlpanel(true)}} className="panel-button">Players</button>
              <button className="panel-button">Stats</button>
              <button className="panel-button">Items</button>
              <button className="panel-button">Skills</button>
              <button onClick={() => {setChpanel(true)}} className="panel-button">Character</button>
            </>
          )}
        </div>
      ) : null}
      {chpanel && (
        <CharacterPanel func={() => {setChpanel(false)}} />
        )}
      {plpanel && (
        <PlayersPanel func={() => {setPlpanel(false)}} />
        )}
      {mlpanel && (
        <Maps func={() => {setMlpanel(false)}} />
        )}
    </>
  );
};

export default GameComponent;
