import React from "react";
import { ItemTypes } from "./constants";
import { useDrag } from "react-dnd";

export default function Tile({ letter }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TILE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      letter,
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
