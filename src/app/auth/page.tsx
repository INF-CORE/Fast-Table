"use client";

import { useEffect, useState } from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import "../styles/auth.css";

// Страница регистрации/входа
// Уже залогиненный пользователь не должен иметь права заходить сюда, его должно перебрасывать на страницу своего профиля


export default function Auth() {
  let [name, setName] = useState<string>("loading...");
  let [LogOrReg, setLogOrReg] = useState<boolean>(false);

  useEffect(() => {
    setName(LogOrReg ? "[Register]" : "[Login]");
  }, [LogOrReg]);

  const handleChange = () => {
    setLogOrReg(!LogOrReg);
  };

  return (
    <>
    <Header />
    <div className="Auth">
      <div className="AuthWindow">
        <h2>{name}</h2>
        {LogOrReg ? (
          <div>
            <input
              className="place"
              type="text"
              id="name"
              placeholder="Type your Name"
            />
            <br />
            <input
              className="place"
              type="email"
              id="email"
              placeholder="Type your Email"
            />
            <br />
            <input
              className="place"
              type="password"
              id="password"
              placeholder="Type your Password"
            />
            <div>Потом тут будет капча</div>
          </div>
        ) : (
          <div>
            <input
              className="place"
              type="text"
              id="name"
              placeholder="Type your Name"
            />
            <br />
            <input
              className="place"
              type="password"
              id="password"
              placeholder="Type your Password"
            />
            <div>Потом тут будет капча</div>
          </div>
        )}
        <label>
          <input
            className="checkbox-custom"
            type="checkbox"
            checked={LogOrReg}
            onChange={handleChange}
          />
          Are you new?
        </label>
      </div>
    </div>
    <Footer />
    </>
  );
}
