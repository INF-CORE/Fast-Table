"use client";

import Footer from "../components/Footer/Footer.tsx";
import "../styles/about.sass";
import Header from "../components/Header/Header.tsx";


export default function AboutUs() {
  return (
    <>
      <Header />
      <div>
        <div className="block-1">
          <h1>What is "Fast Table?"</h1>
          <p>
            The Quick Table is an easy and fast way to play Dungeons & Dragons
            with friends without worrying about the rules. For a comfortable
            game, you will only need more than two players, 1 of whom must be a
            Dungeon Master. The system of fighting and moves is taken over by
            Fast Table. You can add locations, decorations, enemies and NPCs -
            as well as customize them all as you want. The character designer
            here is just as simple!
          </p>
        </div>
        <div className="block-2">
          <h1>How to play?</h1>
          <p>There are 2 ways</p>
          <p>
            1. Just click on "Create Table" on the <a href="/">main page</a>,
            you can select any game and enter a password if you have been
            informed of it, or create your own game by following the
            instructions on the games page
          </p>
          <p>
            2. Your friend who created a new table can click on the "Share"
            button and share the link to the game with you and tell you the
            password
          </p>
          <p>
            3. If you want to create 1 more table, then you can buy a <a href="/subcribe">subscription!</a>
          </p>
        </div>
        <div className="block-3">
          <h1>Enjoy the game!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
