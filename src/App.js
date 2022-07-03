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

const TILES = [
  {
    letter: "R",
    id: guid(),
    x: 64 % rows,
    y: Math.floor(64 / rows),
  },
  {
    letter: "F",
    id: guid(),
    x: 65 % rows,
    y: Math.floor(65 / rows),
  },
  {
    letter: "H",
    id: guid(),
    x: 66 % rows,
    y: Math.floor(66 / rows),
  },
  {
    letter: "T",
    id: guid(),
    x: 67 % rows,
    y: Math.floor(67 / rows),
  },
  {
    letter: "B",
    id: guid(),
    x: 68 % rows,
    y: Math.floor(68 / rows),
  },
  {
    letter: "M",
    id: guid(),
    x: 69 % rows,
    y: Math.floor(69 / rows),
  },
  {
    letter: "L",
    id: guid(),
    x: 70 % rows,
    y: Math.floor(70 / rows),
  },
  {
    letter: "H",
    id: guid(),
    x: 71 % rows,
    y: Math.floor(71 / rows),
  },
  {
    letter: "T",
    id: guid(),
    x: 72 % rows,
    y: Math.floor(72 / rows),
  },
  {
    letter: "E",
    id: guid(),
    x: 73 % rows,
    y: Math.floor(73 / rows),
  },
  {
    letter: "O",
    id: guid(),
    x: 74 % rows,
    y: Math.floor(74 / rows),
  },
  {
    letter: "I",
    id: guid(),
    x: 75 % rows,
    y: Math.floor(75 / rows),
  },
];

function App() {
  const [tiles, updateTiles] = useState(TILES);

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
