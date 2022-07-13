const ROWS_COUNT = 8;

const bank = [
  /*269,0*/ "RFHTBMLHTEOI",
  /*269,1*/ "RFHTBMLHTEOI",
  /*179,2*/ "NPIBODFBWGMA",
  /*246,3*/ "LKSBRTNRTOOY",
  /*157,4*/ "EHNPKLKDGESY",
  /*203,5*/ "DNOWGBTKSNMU",
  /*171,6*/ "ETDUONBRTYBG",
  /*167,7*/ "ALPSILRBGETS",
  /*311,8*/ "TCHNTNRLOPME",
  /*304,9*/ "NYCTELKLTNEH",
  /*303,10*/ "UYCNMWHIERNF",
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

export default function getTiles(puzzleNumber, override, skipCache = false) {
  if (override) {
    return WINNING_TILES;
  }

  const cachedTiles = window.localStorage.getItem(`tiles-${puzzleNumber}`);
  if (!skipCache && cachedTiles) {
    return JSON.parse(cachedTiles);
  }

  const tiles = [];

  for (let i = 0; i < 12; i++) {
    tiles.push({
      id: guid(),
      x: (64 + i) % ROWS_COUNT,
      y: Math.floor((64 + i) / ROWS_COUNT),
      letter: bank[puzzleNumber][i],
    });
  }

  return tiles;
}

function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}