import "../PlayersPanel.sass"

export default function Player({ name, avatar, func }) {
  const handleButtonClick = (action) => {
    // Заготовка для запросов на сервер
    console.log(`Button clicked: ${action}`);
    // Здесь будет логика для отправки запросов на сервер
  };

  return (
    <div className="PlayerX">
      <img src={avatar} alt="avatar" width={50} />
      <h3>{name}</h3>
      <div className="buttons">
        <button className="btnX" alt="edit" onClick={func}>
          <img src="/edit.png" alt="icon1" alt="edit" />
        </button>
        <button className="btnX" onClick={() => handleButtonClick('action2')}>
          <img src="/orange.png" alt="icon2" />
        </button>
        <button className="btnX" onClick={() => handleButtonClick('action3')}>
          <img src="/ban.png" alt="icon3" />
        </button>
      </div>
    </div>
  );
}
