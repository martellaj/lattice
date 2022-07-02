import { useState } from 'react';
import './App.css';
import Board from './Board';
import Header from "./Header";

// interface TilePositionData = {
//   letter: string;
//   x: number;
//   y: number;
// }

function App() {
  const [tilePositions, setTilePositions] = useState([{ letter: 'A', x: 0, y: 0 }, { letter: 'B', x: 0, y: 1 }]);

  return (
    <div className="App">
      <Header />
      <Board tilePositions={tilePositions} />
    </div>
  );
}

export default App;
