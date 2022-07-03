import React from "react";
import Square from "./Square";
import Tile from "./Tile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import isMobile from "./isMobile";

function SquareWrapper({ i, tiles, onTileMoved }) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const hasTile = squareHasTile(x, y, tiles);
  const black = (x + y) % 2 === 1;
  const tile = hasTile ? (
    <Tile letter={getLetter(x, y, tiles)} x={x} y={y} id={getId(x, y, tiles)} />
  ) : null;

  return (
    <div
      key={i}
      style={{
        width: "12.5%",
        height: "12.5%",
        backgroundColor: i >= 64 ? "#777a92" : "unset",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",
      }}
    >
      <Square
        black={black}
        x={x}
        y={y}
        onTileMoved={onTileMoved}
        hasTile={hasTile}
      >
        {tile}
      </Square>
    </div>
  );
}

export default function Board({ tiles, onTileMoved }) {
  const squares = [];
  for (let i = 0; i < 64 + 16; i++) {
    squares.push(
      <SquareWrapper i={i} key={i} tiles={tiles} onTileMoved={onTileMoved} />
    );
  }

  const backend = isMobile() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
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

function squareHasTile(x, y, tiles) {
  return tiles.some((tile) => tile.x === x && tile.y === y);
}

function getLetter(x, y, tiles) {
  return tiles.find((tile) => tile.x === x && tile.y === y)?.letter;
}

function getId(x, y, tiles) {
  return tiles.find((tile) => tile.x === x && tile.y === y)?.id;
}
