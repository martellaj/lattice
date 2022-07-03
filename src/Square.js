import React from "react";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";

export default function Square({
  black,
  children,
  x,
  y,
  updateTilePosition,
  hasTile,
}) {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TILE,
      drop: (item) =>
        updateTilePosition("board", item.letter, x, y, item.prevX, item.prevY),
      canDrop: () => !hasTile,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [x, y, hasTile]
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
        backgroundColor: isOver
          ? hasTile
            ? "red"
            : "blue"
          : hasTile
          ? "green"
          : fill,
      }}
    >
      {children}
    </div>
  );
}
