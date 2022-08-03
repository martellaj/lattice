import "./Header.css";
import { Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import HelpModal from "./HelpModal";
import SupporterInfoModal from "./SupporterInfoModal";
import getPuzzleNumber from "./getPuzzleNumber";
import { getRandomTiles } from "./getTiles";
import copy from "copy-to-clipboard";

const seenHelp = window.localStorage.getItem("seenHelp5");
const seenSupporterInfo = window.localStorage.getItem("seenSupporterInfo");
const isSupporter = window.localStorage.getItem("isSupporter") === "true";

function Header(props) {
  const { onRandomGameStarted, isRandomGame } = props;

  const [showHelpModal, setShowHelpModal] = useState(!seenHelp);
  const [showSupporterInfoModal, setShowSupporterInfoModal] = useState(
    seenHelp && !seenSupporterInfo && !isSupporter
  );
  const [showCopyCheck, setShowCopyCheck] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("seenHelp5", true);
  }, []);

  return (
    <>
      <div className="headerContainer">
        <div style={{ display: "flex" }}>
          <Icon
            style={{
              cursor: "pointer",
              marginRight: "0px !important",
              marginLeft: "6px",
            }}
            name="help"
            className="button headerButton"
            onClick={() => setShowHelpModal(true)}
          />
          <Icon
            style={{
              cursor: "pointer",
            }}
            name="at"
            className="button headerButton rightHeaderButton"
            onClick={() =>
              window.open("mailto:lattice.feedback@gmail.com", "_blank")
            }
          />
        </div>
        <span className="headerText" style={{ paddingBottom: "4px" }}>
          lattice {isRandomGame ? "" : `#${getPuzzleNumber()}`}
        </span>
        <div style={{ display: "flex" }}>
          <Icon
            style={{
              cursor: "pointer",
            }}
            name={showCopyCheck ? "check" : "share"}
            className="button headerButton rightHeaderButton shareButton"
            onClick={() => {
              const tiles = getRandomTiles(true /* useCache */);
              const letters = tiles.map((tile) => tile.letter).join("");
              shareBoard(letters, setShowCopyCheck);
            }}
          />
          <Icon
            style={{
              cursor: "pointer",
            }}
            name="random"
            className="button headerButton rightHeaderButton randomButton"
            onClick={() => {
              onRandomGameStarted();
            }}
          />
        </div>
      </div>
      {showHelpModal && <HelpModal onClosed={() => setShowHelpModal(false)} />}
    </>
  );
}

const shareBoard = (letters, setShowCopyCheck) => {
  let text = `https://playlattice.com?tiles=${letters}`;

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
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  if (isIos || isAndroid) {
    navigator.share({
      text: text,
    });
  } else {
    copy(text);

    setShowCopyCheck(true);
    setTimeout(() => {
      setShowCopyCheck(false);
    }, 500);
  }
};

export default Header;
