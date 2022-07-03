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

function App() {
  const [tilePositions, setTilePositions] = useState([
    { letter: "A", x: 0, y: 0 },
    { letter: "B", x: 0, y: 1 },
  ]);

  const onTileMoved = (dropTarget, letter, x, y, prevX, prevY) => {
    if (dropTarget === "board") {
      setTilePositions((_previousTilePositions) => {
        let previousTilePositions = [..._previousTilePositions];

        console.log(JSON.stringify(previousTilePositions));
        console.log(`${letter} moved from ${prevX}, ${prevY} to ${x}, ${y}`);

        // remove tile that's changing position
        previousTilePositions = previousTilePositions.filter(
          (tile) => !(tile.x === prevX && tile.y === prevY)
        );

        // add tile back (with new position)
        previousTilePositions.push({ letter: letter, x: x, y: y });

        // setter
        return [...previousTilePositions];
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <Board tilePositions={tilePositions} updateTilePosition={onTileMoved} />
    </div>
  );
}

export default App;
