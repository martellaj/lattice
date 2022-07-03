import React from "react";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";
import isInDrawer from "./isInDrawer";

export default function Square({
  black,
  children,
  x,
  y,
  onTileMoved,
  hasTile,
}) {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TILE,
      drop: (item) =>
        onTileMoved(
          "board",
          item.letter,
          x,
          y,
          item.prevX,
          item.prevY,
          item.id
        ),
      canDrop: () => !hasTile,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [x, y, hasTile]
  );

  let backgroundColor = fill;
  if (isInDrawer(x, y)) {
    backgroundColor = "brown";
  } else if (isOver) {
    if (hasTile) {
      backgroundColor = "red";
    } else {
      backgroundColor = "blue";
    }
  } else {
    if (hasTile) {
      backgroundColor = "green";
    }
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
}
