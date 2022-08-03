import "./HelpModal.css";
import { Modal, Icon, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import getPuzzleNumber from "./getPuzzleNumber";
import copy from "copy-to-clipboard";

const trackedGames = [];

function CheckModal({
  onClosed,
  result,
  reason,
  invalidWords,
  tiles,
  wordResults,
  isRandomGame,
}) {
  const [open, setOpen] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const [actualWinCount, setActualWinCount] = useState(
    window.localStorage.getItem("wins") || "0"
  );

  const { wins, currentStreak, bestStreak } = getStats();

  useEffect(() => {
    if (result) {
      if (trackedGames.includes(isRandomGame)) {
        return;
      } else {
        trackedGames.push(isRandomGame);
      }

      const winsValue = window.localStorage.getItem("wins");

      if (winsValue) {
        window.localStorage.setItem("wins", parseInt(winsValue) + 1);
      } else {
        window.localStorage.setItem("wins", wins + 1);
      }

      setActualWinCount(window.localStorage.getItem("wins"));
    }
  }, []);

  let starsCount = 0;
  let stars = "";
  if (wordResults) {
    starsCount = Math.min(3, 6 - wordResults.length);
    starsCount = Math.max(1, starsCount);

    for (let i = 0; i < starsCount; i++) {
      stars += "⭐️   ";
    }

    stars = stars.trim();
  }

  let message = "";
  switch (starsCount) {
    case 1:
      message = "You solved the puzzle (but you can do it with less words)!";
      break;
    case 2:
      message = "Great work! 1 less word gets you 1 more star!";
      break;
    case 3:
    default:
      message = "Stellar job! You got the optimal solution!";
      break;
  }

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
            <div className="badWords">
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
          <div
            className="statsRow"
            style={{ marginBottom: "10px", flexDirection: "column" }}
          >
            <div className="stars">
              <div style={{ marginRight: "6px" }}>⭐️</div>
              {starsCount >= 2 && <div style={{ marginRight: "6px" }}>⭐️</div>}
              {starsCount >= 3 && <div style={{ marginRight: "6px" }}>⭐️</div>}
            </div>
            <div style={{ marginTop: "6px", textAlign: "center" }}>
              {message}
            </div>
          </div>

          {!isRandomGame && (
            <Button
              size="big"
              className="shareButton"
              onClick={() => {
                let text = `#Lattice${getPuzzleNumber()} ${starsCount}/3\n\n${getShareBoard(
                  tiles
                )}\nhttps://playlattice.com`;

                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1;

                const isIos =
                  [
                    "iPad Simulator",
                    "iPhone Simulator",
                    "iPod Simulator",
                    "iPad",
                    "iPhone",
                    "iPod",
                  ].includes(navigator.platform) ||
                  // iPad on iOS 13 detection
                  (navigator.userAgent.includes("Mac") &&
                    "ontouchend" in document);

                if (isIos || isAndroid) {
                  navigator.share({
                    text: text,
                  });
                } else {
                  copy(text);

                  setShowCheck(true);
                  setTimeout(() => {
                    setShowCheck(false);
                  }, 2000);
                }
              }}
            >
              {showCheck ? "copied!" : "share"}
            </Button>
          )}

          {isRandomGame && (
            <div className="statsRow">
              {/* wins */}
              <div className="statsColumn">
                <div className="statsIcon">🏆</div>
                <div className="statsText">wins</div>
                <div className="statsNumber">{actualWinCount}</div>
              </div>

              {/* <div className="statsColumn" style={{ margin: "0 30px" }}>
                <div className="statsIcon">🔥</div>
                <div className="statsText">streak</div>
                <div className="statsSubtext">(current)</div>
                <div className="statsNumber">{currentStreak}</div>
              </div>

              <div className="statsColumn">
                <div className="statsIcon">💯</div>
                <div className="statsText">streak</div>
                <div className="statsSubtext">(best)</div>
                <div className="statsNumber">{bestStreak}</div>
              </div> */}
            </div>
          )}

          {false && (
            <pre className="foo" style={{ overflow: "hidden" }}>
              {getShareBoard(tiles)}
            </pre>
          )}

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div style={{ textAlign: "center" }}>
              Enjoying Lattice? Consider buying me a cup of coffee. ☕
            </div> */}
            <img
              src="/yellow-button.png"
              style={{
                width: "200px",
                margin: "6px 0px 0px 0px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.open("https://www.buymeacoffee.com/lattice", "_blank");
              }}
            />
            {/* <Button
              id="donateButton"
              className="button active"
              size="large"
              color="purple"
              onClick={() => {
                window.open("https://www.buymeacoffee.com/lattice", "_blank");
              }}
            >
              SUPPORT
            </Button> */}
          </div>

          {/* {isRandomGame &&
            window.localStorage.getItem("fromCladder") === "false" && (
              <div
                onClick={() =>
                  window.open(
                    "https://playcladder.com?fromLattice=true",
                    "_blank"
                  )
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "#5fbd72",
                  color: "white",
                  borderRadius: "5px",
                  padding: "12px",
                  marginTop: "24px",
                }}
              >
                <div style={{ fontSize: "30px", marginBottom: "6px" }}>
                  Play Cladder
                </div>
                <div style={{ fontSize: "20px", marginBottom: "12px" }}>
                  Can you solve all 10 clues before the timer runs out?!
                </div>
              </div>
            )} */}
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
