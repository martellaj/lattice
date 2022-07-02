import React from "react";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";

export default function Square({ black, children, x, y, updateTilePosition }) {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TILE,
      drop: (item) => updateTilePosition("board", item.letter, x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
