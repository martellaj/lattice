import { useRef, useState } from "react";
import "./App.css";
import Board from "./Board";
import CheckModal from "./CheckModal";
import getDailyPuzzleNumber from "./getDailyPuzzleNumber";
import Header from "./Header";
import isInDrawer from "./isInDrawer";
import DICTIONARY from "./sowpods";

// interface TilePositionData = {
//   letter: string;
//   x: number;
//   y: number;
// }

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

window.localStorage.setItem(
  "currentPuzzle",
  params?.p || getDailyPuzzleNumber()
);

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

const WINNING_TILES = [
  {
    letter: "M",
    x: 3,
    y: 0,
    id: "a3356d74-06d6-4504-b379-98abf071202d",
    visited: false,
  },
  {
    letter: "O",
    x: 3,
    y: 1,
    id: "7b015200-5118-40f2-ba49-b31156fb882c",
    visited: false,
  },
  {
    letter: "T",
    x: 3,
    y: 2,
    id: "8681fb4e-73d1-4607-adaf-c0f853d9fbe0",
    visited: false,
  },
  {
    letter: "H",
    x: 3,
    y: 3,
    id: "14dc9d43-bb4c-4516-a477-af71b7794148",
    visited: false,
  },
  {
    letter: "E",
    x: 3,
    y: 4,
    id: "42515705-4e9e-49de-b9b1-6b21187ba1ea",
    visited: false,
  },
  {
    letter: "R",
    x: 3,
    y: 5,
    id: "79dbd5ed-16d4-4f2a-bbdc-a4df8dc0ea20",
    visited: false,
  },
  {
    letter: "L",
    x: 0,
    y: 4,
    id: "a3a13225-46d7-4965-ac8c-698d2a987b06",
    visited: false,
  },
  {
    letter: "I",
    x: 1,
    y: 4,
    id: "005d3322-14a7-48c6-b6c8-bba4369ad635",
    visited: false,
  },
  {
    letter: "F",
    x: 2,
    y: 4,
    id: "81688d87-9a7a-43ed-9761-5aa585e6177e",
    visited: false,
  },
  {
    letter: "B",
    x: 2,
    y: 1,
    id: "7f50bdf7-f8e2-4db2-aa6b-f172448d01f1",
    visited: false,
  },
  {
    letter: "T",
    x: 4,
    y: 1,
    id: "b9392a82-b885-4d90-8116-50f9360583e2",
    visited: false,
  },
  {
    letter: "H",
    x: 5,
    y: 1,
    id: "316ee5f8-6822-42c9-9096-287f06fd6de7",
    visited: false,
  },
];

function App() {
  const [tiles, updateTiles] = useState(WINNING_TILES);

  const [showCheckModal, setShowCheckModal] = useState(false);

  const [gameResult, setGameResult] = useState({});

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

    setGameResult({ ...result });

    setShowCheckModal(true);

    console.log(result.result ? "yay" : result.reason);
  };

  const checkBoard = () => {
    const _tiles = [...tiles];

    // fail when there are tiles in drawer
    for (const tile of tiles) {
      if (isInDrawer(tile.x, tile.y)) {
        return {
          result: false,
          reason: "Make sure you use all 12 tiles in your lattice!",
        };
      }
    }

    // ensure board is valid (all tiles connected)
    if (!isConnected(_tiles)) {
      return {
        result: false,
        reason: "Make sure all your words are properly crossing!",
      };
    }

    const words = getWords(_tiles);

    // ensure all words are at least 3 letters
    const invalidWords = words.filter((word) => word.length < 3);
    if (invalidWords.length > 0) {
      return {
        result: false,
        reason: "Make sure all your words are at least 3 letters!",
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
        reason: "We didn't find these words in our word list:",
        invalidWords: wordResults
          .filter((wordResult) => !wordResult.isValid)
          .map((wordResult) => wordResult.word),
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
      {showCheckModal && (
        <CheckModal onClosed={() => setShowCheckModal(false)} {...gameResult} />
      )}
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
