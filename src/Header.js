import "./Header.css";
import { Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import HelpModal from "./HelpModal";
import getPuzzleNumber from "./getPuzzleNumber";

const seenHelp = window.localStorage.getItem("seenHelp2");

function Header() {
  const [showHelpModal, setShowHelpModal] = useState(!seenHelp);

  useEffect(() => {
    window.localStorage.setItem("seenHelp2", true);
  }, []);

  return (
    <>
      <div className="headerContainer">
        <Icon
          style={{
            cursor: "pointer",
            marginRight: "12px",
            marginLeft: "6px",
          }}
          name="help"
          className="button headerButton"
          onClick={() => setShowHelpModal(true)}
        />
        <span className="headerText">lattice #{getPuzzleNumber()}</span>
        <Icon
          style={{
            cursor: "pointer",
            marginRight: "6px",
            marginLeft: "12px",
          }}
          name="at"
          className="button headerButton"
          onClick={() => window.open("mailto:playcladder@gmail.com", "_blank")}
        />
      </div>
      {showHelpModal && <HelpModal onClosed={() => setShowHelpModal(false)} />}
    </>
  );
}

export default Header;
