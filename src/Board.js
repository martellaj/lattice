import React from 'react'
import Square from './Square'
import Tile from './Tile'

function renderSquare(i, tilePositions) {
  const x = i % 8
  const y = Math.floor(i / 8)
  const hasTile = squareHasTile(x, y, tilePositions);
  const black = (x + y) % 2 === 1
  const tile = hasTile ? <Tile letter={getLetter(x, y, tilePositions)} /> : null

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black}>{tile}</Square>
    </div>
  )
}

export default function Board({ tilePositions }) {
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, tilePositions))
  }

  return (
    <div
      style={{
        width: '100%',
        height: '700px',
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: '500px'
      }}
    >
      {squares}
    </div>
  )
}

function squareHasTile(x, y, tilePositions) {
  return tilePositions.some(tile => tile.x === x && tile.y === y);
}

function getLetter(x, y, tilePositions) {
    return tilePositions.find(tile => tile.x === x && tile.y === y)?.letter;
}