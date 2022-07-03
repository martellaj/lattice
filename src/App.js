import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./Board";
import Header from "./Header";

// interface TilePositionData = {
//   letter: string;
//   x: number;
//   y: number;
// }

// set the app height for mobile
const appHeight = () =>
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
window.addEventListener("resize", appHeight);
appHeight();

const rows = 8;

function App() {
  const [tiles, updateTiles] = useState([
    {
      letter: "A",
      id: guid(),
      x: 64 % rows,
      y: Math.floor(64 / rows),
    },
  ]);

  const onTileMoved = (dropTarget, letter, x, y, prevX, prevY, id) => {
    if (dropTarget === "board") {
      updateTiles((_previousTilePositions) => {
        let previousTilePositions = [..._previousTilePositions];

        console.log(
          `tile with id ${id} moved from (${prevX}, ${prevY}) to (${x}, ${y})`
        );

        // remove tile that's changing position
        previousTilePositions = previousTilePositions.filter(
          (tile) => tile.id !== id
        );

        // add tile back (with new position)
        previousTilePositions.push({ letter: letter, x: x, y: y, id: id });

        // setter
        return [...previousTilePositions];
      });
    } else if (dropTarget === "drawer") {
    }
  };

  return (
    <div className="App">
      <Header />
      <Board tiles={tiles} onTileMoved={onTileMoved} />
    </div>
  );
}

function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default App;
