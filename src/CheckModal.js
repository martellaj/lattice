import "./HelpModal.css";
import { Modal, Icon, Button } from "semantic-ui-react";
import { useState } from "react";
import getPuzzleNumber from "./getPuzzleNumber";

function CheckModal({ onClosed, result, reason, invalidWords, tiles }) {
  const [open, setOpen] = useState(true);

  const { wins, currentStreak, bestStreak } = getStats();

  return (
    <Modal
      closeIcon
      id="checkModalContainer"
      className="helpModalContainer"
      onClose={() => {
        onClosed();
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div className="helpModalTitle">
        {result ? "nice lattice!" : "not quite right..."}
      </div>
      {reason && (
        <div
          style={{
            margin: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginBottom: "12px",
              textAlign: "center",
              fontSize: "x-large",
            }}
          >
            {reason}
          </div>
          {invalidWords && (
            <div>
              {invalidWords.map((word) => (
                <div key={word} style={{ marginBottom: "12px" }}>
                  {word}
                </div>
              ))}
            </div>
          )}
          <Icon
            name="check"
            className="button boardButton checkButton checkButtonCheckModal"
            onClick={() => onClosed()}
            style={{
              width: "50px !important",
              height: "40px !important",
            }}
          />
        </div>
      )}
      {result && (
        <div className="statsContainer">
          <div className="statsRow">
            {/* wins */}
            <div className="statsColumn">
              <div className="statsIcon">🏆</div>
              <div className="statsText">wins</div>
              <div className="statsNumber">{wins}</div>
            </div>

            {/* current streak */}
            <div className="statsColumn" style={{ margin: "0 30px" }}>
              <div className="statsIcon">🔥</div>
              <div className="statsText">streak</div>
              <div className="statsSubtext">(current)</div>
              <div className="statsNumber">{currentStreak}</div>
            </div>

            {/* best streak */}
            <div className="statsColumn">
              <div className="statsIcon">💯</div>
              <div className="statsText">streak</div>
              <div className="statsSubtext">(best)</div>
              <div className="statsNumber">{bestStreak}</div>
            </div>
          </div>

          <pre className="foo">{getShareBoard(tiles)}</pre>

          <Button size="big" className="shareButton">
            share
          </Button>
        </div>
      )}
    </Modal>
  );
}

function getShareBoard(tiles) {
  let board = "";

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (squareHasTile(j, i, tiles)) {
        board += "🟩";
      } else {
        board += "⬛️";
      }
    }
    board += "\n";
  }

  return board;
}

function squareHasTile(x, y, tiles) {
  return tiles.some((tile) => tile.x === x && tile.y === y);
}

function getStats() {
  const puzzleNumber = getPuzzleNumber();

  let wins = 0;
  let currentStreak = 0;
  let bestStreak = 0;

  let _currentStreak = 0;

  let previousDayForStreak = -1;

  for (let i = puzzleNumber; i > 0; i--) {
    const isWin = window.localStorage.getItem(`puzzle-${i}`);
    if (isWin === "true") {
      wins++;

      // if it's the current day, add to current streak
      if (i === puzzleNumber) {
        previousDayForStreak = i;
        _currentStreak++;
        /**
         * else check if there was a win on the day prior to this one and if so,
         * increment the streak.
         *
         * else that means the previous streak is ended so compare is against the
         * best streak and then reset it.
         */
      } else {
        if (i === previousDayForStreak - 1) {
          previousDayForStreak = i;
          _currentStreak++;
        } else {
          previousDayForStreak = i;

          // if current streak hasn't been set yet when there's a miss, then
          // set it
          if (currentStreak === 0) {
            currentStreak = _currentStreak;
          }

          if (_currentStreak > bestStreak) {
            bestStreak = _currentStreak;
          }
          _currentStreak = 1;
        }
      }
    } else {
      // if current streak hasn't been set yet when there's a miss, then
      // set it
      if (currentStreak === 0) {
        currentStreak = _currentStreak;
      }

      if (_currentStreak > bestStreak) {
        bestStreak = _currentStreak;
      }
      _currentStreak = 1;
    }
  }

  if (currentStreak === 0) {
    currentStreak = _currentStreak;
  }

  if (_currentStreak > bestStreak) {
    bestStreak = _currentStreak;
  }

  return {
    wins,
    currentStreak,
    bestStreak,
  };
}

export default CheckModal;
