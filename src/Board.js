import React from "react";
import Square from "./Square";
import Tile from "./Tile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import isMobile from "./isMobile";
import { Icon } from "semantic-ui-react";
import { usePreview } from "react-dnd-preview";
import isInDrawer from "./isInDrawer";

const MyPreview = () => {
  const { display, item, style } = usePreview();
  if (!display) {
    return null;
  }
  return (
    <div
      style={{
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:
          document.getElementsByClassName("tile")?.[0]?.offsetHeight * 1.2 ||
          "60px",
        width:
          document.getElementsByClassName("tile")?.[0]?.offsetWidth * 1.2 ||
          "60px",
        opacity: 1,
        ...style,
        zIndex: 10000,
      }}
      className={`tile ${
        ["a", "e", "i", "o", "u"].includes(item.letter.toLowerCase())
          ? "vowel"
          : ""
      }`}
    >
      {item.letter}
    </div>
  );
};

function SquareWrapper({ i, tiles, onTileMoved, onTileTouched }) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const hasTile = squareHasTile(x, y, tiles);
  const black = (x + y) % 2 === 1;
  const tile = hasTile ? (
    <Tile
      letter={getLetter(x, y, tiles)}
      x={x}
      y={y}
      id={getId(x, y, tiles)}
      onTileTouched={onTileTouched}
    />
  ) : null;

  return (
    <div
      key={i}
      style={{
        width: "12.5%",
        height: "10%",
        // backgroundColor: i >= 64 ? "#777a92" : "unset",
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

export default function Board({
  tiles,
  onTileMoved,
  shuffle,
  reset,
  check,
  onTileTouched,
}) {
  const squares = [];
  for (let i = 0; i < 64 + 16 /* 80 */; i++) {
    if (i === 77) {
      squares.push(
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "12.5%",
            height: "10%",
            padding: "2px",
          }}
        >
          <Icon
            name="refresh"
            className="button boardButton refreshButton"
            onClick={() => shuffle()}
          />
        </div>
      );
    } else if (i === 78) {
      squares.push(
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "12.5%",
            height: "10%",
            padding: "2px",
          }}
        >
          <Icon
            name="delete"
            className="boardButton deleteButton"
            onClick={() => reset()}
          />
        </div>
      );
    } else if (i === 79) {
      squares.push(
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "12.5%",
            height: "10%",
            padding: "2px",
          }}
        >
          <Icon
            name="check"
            className={`button boardButton checkButton ${
              !isAnyTilesInDrawer(tiles) && "ready"
            }`}
            onClick={() => check()}
          />
        </div>
      );
    } else {
      squares.push(
        <SquareWrapper
          i={i}
          key={i}
          tiles={tiles}
          onTileMoved={onTileMoved}
          onTileTouched={onTileTouched}
        />
      );
    }
  }

  const backend = isMobile() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "700px",
          flexGrow: 1,
        }}
        className="board"
      >
        {squares}
      </div>
      <MyPreview />
    </DndProvider>
  );
}

function isAnyTilesInDrawer(tiles) {
  return tiles.some((tile) => isInDrawer(tile.x, tile.y));
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
