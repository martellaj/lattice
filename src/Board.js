import React from "react";
import Square from "./Square";
import Tile from "./Tile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function renderSquare(i, tilePositions, updateTilePosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const hasTile = squareHasTile(x, y, tilePositions);
  const black = (x + y) % 2 === 1;
  const tile = hasTile ? (
    <Tile letter={getLetter(x, y, tilePositions)} />
  ) : null;

  return (
    <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <Square black={black} x={x} y={y} updateTilePosition={updateTilePosition}>
        {tile}
      </Square>
    </div>
  );
}

export default function Board({ tilePositions, updateTilePosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, tilePositions, updateTilePosition));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "500px",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}

function squareHasTile(x, y, tilePositions) {
  return tilePositions.some((tile) => tile.x === x && tile.y === y);
}

function getLetter(x, y, tilePositions) {
  return tilePositions.find((tile) => tile.x === x && tile.y === y)?.letter;
}
