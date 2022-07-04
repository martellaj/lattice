import { useState } from "react";
import "./App.css";
import Board from "./Board";
import Header from "./Header";
import isInDrawer from "./isInDrawer";
import DICTIONARY from "./sowpods";

// interface TilePositionData = {
//   letter: string;
//   x: number;
//   y: number;
// }

// set the app height for mobile
const appHeight = () =>
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
window.addEventListener("resize", appHeight);
appHeight();

const rows = 8;

const TILES = [
  {
    letter: "R",
    id: guid(),
    x: 64 % rows,
    y: Math.floor(64 / rows),
  },
  {
    letter: "F",
    id: guid(),
    x: 65 % rows,
    y: Math.floor(65 / rows),
  },
  {
    letter: "H",
    id: guid(),
    x: 66 % rows,
    y: Math.floor(66 / rows),
  },
  {
    letter: "T",
    id: guid(),
    x: 67 % rows,
    y: Math.floor(67 / rows),
  },
  {
    letter: "B",
    id: guid(),
    x: 68 % rows,
    y: Math.floor(68 / rows),
  },
  {
    letter: "M",
    id: guid(),
    x: 69 % rows,
    y: Math.floor(69 / rows),
  },
  {
    letter: "L",
    id: guid(),
    x: 70 % rows,
    y: Math.floor(70 / rows),
  },
  {
    letter: "H",
    id: guid(),
    x: 71 % rows,
    y: Math.floor(71 / rows),
  },
  {
    letter: "T",
    id: guid(),
    x: 72 % rows,
    y: Math.floor(72 / rows),
  },
  {
    letter: "E",
    id: guid(),
    x: 73 % rows,
    y: Math.floor(73 / rows),
  },
  {
    letter: "O",
    id: guid(),
    x: 74 % rows,
    y: Math.floor(74 / rows),
  },
  {
    letter: "I",
    id: guid(),
    x: 75 % rows,
    y: Math.floor(75 / rows),
  },
];

function App() {
  const [tiles, updateTiles] = useState(TILES);

  const onTileMoved = (dropTarget, letter, x, y, prevX, prevY, id) => {
    if (dropTarget === "board") {
      updateTiles((_previousTilePositions) => {
        let previousTilePositions = [..._previousTilePositions];

        // remove tile that's changing position
        previousTilePositions = previousTilePositions.filter(
          (tile) => tile.id !== id
        );

        // add tile back (with new position)
        previousTilePositions.push({ letter: letter, x: x, y: y, id: id });

        // setter
        return [...previousTilePositions];
      });
    } else if (dropTarget === "drawer") {
    }
  };

  const shuffleBoard = () => {
    updateTiles((_previousTiles) => {
      let previousTiles = [..._previousTiles];

      const boardTiles = previousTiles.filter(
        (tile) => tile.x < 8 && tile.y < 8
      );
      const drawerTiles = previousTiles.filter(
        (tile) => tile.x >= 8 || tile.y >= 8
      );

      // shuffle the tiles
      shuffleArray(drawerTiles);

      // setter
      return [...boardTiles, ...drawerTiles];
    });
  };

  const resetBoard = () => {
    updateTiles(() => [...TILES]);
  };

  const showResult = () => {
    const result = checkBoard();
    console.log(result.result ? "yay" : result.reason);
  };

  const checkBoard = () => {
    const _tiles = [...tiles];

    // fail when there are tiles in drawer
    for (const tile of tiles) {
      if (isInDrawer(tile.x, tile.y)) {
        return {
          result: false,
          reason: "tiles_left_in_drawer",
        };
      }
    }

    // ensure board is valid (all tiles connected)
    if (!isConnected(_tiles)) {
      return {
        result: false,
        reason: "invalid_board",
      };
    }

    const words = getWords(_tiles);

    // ensure all words are at least 3 letters
    const invalidWords = words.filter((word) => word.length < 3);
    if (invalidWords.length > 0) {
      return {
        result: false,
        reason: "invalid_words",
        invalidWords: invalidWords,
      };
    }

    // check all words against the dictionary
    let wordResults = [];
    for (const word of words) {
      wordResults.push({
        word: word,
        isValid: DICTIONARY.includes(word),
      });
    }

    // ensure all words are valid
    const areAllWordsValid = wordResults.every(
      (wordResult) => wordResult.isValid
    );
    if (!areAllWordsValid) {
      return {
        result: false,
        reason: "invalid_words",
        wordResults,
      };
    }

    return {
      result: true,
      wordResults,
    };
  };

  return (
    <div className="App">
      <Header />
      <Board
        tiles={tiles}
        onTileMoved={onTileMoved}
        shuffle={shuffleBoard}
        reset={resetBoard}
        check={showResult}
      />
    </div>
  );
}

function isConnected(tiles) {
  countTiles(tiles[tiles.length - 1], tiles);
  const _isConnected = tileCount === 12;

  // reset visited state
  for (const tile of tiles) {
    tile.visited = false;
  }

  // reset count
  tileCount = 0;

  return _isConnected;
}

let tileCount = 0;
function countTiles(tile, tiles) {
  const { x, y } = tile;

  // count the tile if it's not been visited yet
  if (!getVisited(x, y, tiles)) {
    tileCount++;
    markVisited(x, y, tiles);
  }

  if (squareHasTile(x + 1, y, tiles) && !getVisited(x + 1, y, tiles)) {
    countTiles(getTile(x + 1, y, tiles), tiles);
  }

  if (squareHasTile(x - 1, y, tiles) && !getVisited(x - 1, y, tiles)) {
    countTiles(getTile(x - 1, y, tiles), tiles);
  }

  if (squareHasTile(x, y + 1, tiles) && !getVisited(x, y + 1, tiles)) {
    countTiles(getTile(x, y + 1, tiles), tiles);
  }

  if (squareHasTile(x, y - 1, tiles) && !getVisited(x, y - 1, tiles)) {
    countTiles(getTile(x, y - 1, tiles), tiles);
  }
}

function squareHasTile(x, y, tiles) {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
    return tiles.some((tile) => tile.x === x && tile.y === y);
  } else {
    return false;
  }
}

function getVisited(x, y, tiles) {
  return tiles.find((tile) => tile.x === x && tile.y === y)?.visited;
}

function markVisited(x, y, tiles) {
  const tile = tiles.find((tile) => tile.x === x && tile.y === y);
  tile.visited = true;
}

function getTile(x, y, tiles) {
  const tile = tiles.find((tile) => tile.x === x && tile.y === y);
  return tile;
}

function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    const x1 = array[i].x;
    const y1 = array[i].y;

    const x2 = array[j].x;
    const y2 = array[j].y;

    array[i].x = x2;
    array[i].y = y2;

    array[j].x = x1;
    array[j].y = y1;
  }
}

function getLetter(x, y, tiles) {
  return tiles.find((tile) => tile.x === x && tile.y === y)?.letter;
}

function getWords(tiles) {
  const words = [];

  // row words
  for (let i = 0; i < 8; i++) {
    let rowWord = "";

    for (let j = 0; j < 8; j++) {
      if (squareHasTile(j, i, tiles)) {
        rowWord += getLetter(j, i, tiles);
      } else {
        words.push(rowWord);
        rowWord = "";
      }
    }

    words.push(rowWord);
    rowWord = "";
  }

  // column words
  for (let i = 0; i < 8; i++) {
    let columnWord = "";

    for (let j = 0; j < 8; j++) {
      if (squareHasTile(i, j, tiles)) {
        columnWord += getLetter(i, j, tiles);
      } else {
        words.push(columnWord);
        columnWord = "";
      }
    }

    words.push(columnWord);
    columnWord = "";
  }

  return words.filter((word) => word.length > 1);
}

export default App;
