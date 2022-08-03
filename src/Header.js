import "./Header.css";
import { Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import HelpModal from "./HelpModal";
import SupporterInfoModal from "./SupporterInfoModal";
import getPuzzleNumber from "./getPuzzleNumber";

const seenHelp = window.localStorage.getItem("seenHelp4");
const seenSupporterInfo = window.localStorage.getItem("seenSupporterInfo");
const isSupporter = window.localStorage.getItem("isSupporter") === "true";

function Header(props) {
  const { onRandomGameStarted, isRandomGame } = props;

  const [showHelpModal, setShowHelpModal] = useState(!seenHelp);
  const [showSupporterInfoModal, setShowSupporterInfoModal] = useState(
    seenHelp && !seenSupporterInfo && !isSupporter
  );

  useEffect(() => {
    window.localStorage.setItem("seenHelp4", true);
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
              visibility: "hidden",
            }}
            name="at"
            className="button headerButton rightHeaderButton"
            onClick={() =>
              window.open("mailto:lattice.feedback@gmail.com", "_blank")
            }
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

export default Header;
