import "./Header.css";
import { Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import HelpModal from "./HelpModal";

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
            marginLeft: "12px",
          }}
          name="help"
          className="button headerButton"
          onClick={() => setShowHelpModal(true)}
        />
        <span className="headerText">funscramble</span>
        <Icon
          style={{
            cursor: "pointer",
            marginRight: "12px",
            marginLeft: "12px",
            visibility: "hidden",
          }}
          name="help"
          className="button headerButton"
        />
      </div>
      {showHelpModal && <HelpModal onClosed={() => setShowHelpModal(false)} />}
    </>
  );
}

export default Header;
