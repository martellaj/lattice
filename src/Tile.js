import React from "react";
import { ItemTypes } from "./constants";
import { useDrag } from "react-dnd";

export default function Tile({ letter, x, y }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TILE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      letter,
      prevX: x,
      prevY: y,
    },
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {letter}
    </div>
  );
}
