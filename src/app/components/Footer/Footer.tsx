import "./Footer.sass";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <img src="/by.png" width={200} draggable="false" />
        <ul className="lili">
          <li><a className="a" href="https://new.donatepay.ru/@Faynot">• Donate</a></li>
          <li><a className="a" href="#">• Github</a></li>
          <li><a className="a" href="/AboutUs">• Inform</a></li>
        </ul>
      </div>
    </footer>
  );
}
