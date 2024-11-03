"use client";

import React, { useState } from 'react';
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import "../styles/games.sass";

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [password, setPassword] = useState("");

  const games = [
    { name: "F&H", id: "GM0W1Q", link: "/games/GM0W1Q", creator: "Faynot", img: "l.svg", password: "001" },
    { name: "D&D", id: "MEO85A", link: "/games/MEO85A", creator: "cobaka3laya", img: "l.svg", password: "001" },
    { name: "Table42", id: "5FM0V1", link: "/games/5FM0V1", creator: "Down", img: "l.svg", password: "001" },
    { name: "suck", id: "E5YPE1", link: "/games/E5YPE1", creator: "Pidoras", img: "l.svg", password: "001" },
    { name: "name", id: "M0TEQR", link: "/games/M0TEQR", creator: "Geraen", img: "l.svg", password: "001" },
  ];

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    if (selectedGame && password === selectedGame.password) {
      window.location.href = selectedGame.link;
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="Create">
          <div className="CreateWindow">
            <h2>Create new table</h2>
            <div>
              <input
                className="place"
                type="text"
                id="name-game"
                placeholder="Type name of new game"
              />
              <br />
              <input
                className="place"
                type="password"
                id="password-game"
                placeholder="Type password to join the game"
              />
              <br />
              <div className="create-btn" >
                Create new table
              </div>
            </div>
          </div>
        </div>
        <div className="list">
          <h2>Select existing tables</h2>
          <div className="search-container">
            <img src="search.svg" alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or creator"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="place-s"
            />
          </div>
          <ul>
            {filteredGames.map(item => (
              <li className="room-card" key={item.id} onClick={() => handleGameClick(item)}>
                <img src={item.img} width={60} height={60} />
                <h3>{item.creator}</h3>
                <div className="room-info">
                  <h2>{item.name}</h2>
                  <p>id: {item.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="place"
            />
            <button className="btn" onClick={handlePasswordSubmit}>Submit</button>
            <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
