import React from "react";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";
import isInDrawer from "./isInDrawer";
import "./Square.css";

export default function Square({
  black,
  children,
  x,
  y,
  onTileMoved,
  hasTile,
}) {
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

  let backgroundColor = "#323434";
  if (isInDrawer(x, y)) {
    if (isOver) {
      backgroundColor = "#484A4A";
    } else {
      backgroundColor = "#8F9999";
    }
  } else if (isOver) {
    if (!hasTile) {
      backgroundColor = "#323434";
    }
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: isInDrawer(x, y) ? "unset" : "#e4e5f1 grey 2px 2px",
      }}
      className="square"
    >
      {children}
    </div>
  );
}
