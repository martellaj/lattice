import React from "react";
import { ItemTypes } from "./constants";
import { useDrag, DragPreviewImage } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function Tile({ letter, x, y, id }) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.TILE,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      item: {
        letter,
        prevX: x,
        prevY: y,
        id: id,
      },
    }),
    [letter, x, y, id]
  );

  return (
    <>
      <DragPreviewImage connect={preview} src={getEmptyImage()} />
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="tile"
      >
        {letter}
      </div>
    </>
  );
}
