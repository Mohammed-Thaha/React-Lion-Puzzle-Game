import { useState } from "react";
import "./App.css";
import one from "./images/1.png";
import two from "./images/2.png";
import three from "./images/3.png";
import four from "./images/4.png";
import five from "./images/5.png";
import six from "./images/6.png";
import seven from "./images/7.png";
import eight from "./images/8.png";
import nine from "./images/9.png";
import Confetti from "react-confetti";

const App = () => {
  const game_image = [one, two, three, four, five, six, seven, eight, nine];
  const initial_tiles = ["1", "2", "3", "5", "7", "6", "4", "8", "9"]; // Scrambled order
  const winning_order_tile = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Winning order
  const [tiles, setTiles] = useState(initial_tiles);
  const [turns, setTurns] = useState(0);
  const [gameWon, setGameStatus] = useState(false);

  const game_result = (currentTiles) => {
    return currentTiles.join() === winning_order_tile.join();
  };

  const handleTile = (index) => {
    const blank_index = tiles.indexOf("7"); // '7' is the blank tile
    const is_valid_move =
      index === blank_index - 3 || // Move up
      index === blank_index + 3 || // Move down
      (index === blank_index - 1 &&
        Math.floor(index / 3) === Math.floor(blank_index / 3)) || // Move left
      (index === blank_index + 1 &&
        Math.floor(index / 3) === Math.floor(blank_index / 3)); // Move right

    if (is_valid_move) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[blank_index]] = [
        newTiles[blank_index],
        newTiles[index],
      ];
      setTiles(newTiles);
      setTurns(turns + 1);
      if (game_result(newTiles)) {
        setGameStatus(true);
      }
    } else {
      alert("Invalid move!");
    }
  };

  const reset_game = () => {
    setTiles([...initial_tiles]); 
    setTurns(0);
    setGameStatus(false);
  };

  return (
    <div className="app">
      <h1>Lion Puzzle Game</h1>
      {gameWon && <Confetti />}
      <div className="board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="tile"
            onClick={() => {
              handleTile(index);
            }}
          >
            <img src={game_image[parseInt(tile) - 1]} alt="" />
          </div>
        ))}
      </div>
      <div className="game-info">
        <p>Turns: {turns}</p>
        {gameWon && <p>You won the Game!</p>}
        <button onClick={reset_game}>Reset Game</button>
      </div>
    </div>
  );
};

export default App;
