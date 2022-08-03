import "./HelpModal.css";
import { Modal } from "semantic-ui-react";
import { useState } from "react";

function HelpModal(props) {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      closeIcon
      id="helpModalContainer"
      className="helpModalContainer"
      onClose={() => {
        props.onClosed();
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div className="helpModalTitle">HOW TO PLAY</div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <strong>
          Use all 12 tiles to make words that cross (a la Scrabble)
        </strong>
      </div>
      {/* <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
          marginBottom: "12px",
          width: "100%",
        }}
      >
        Less words means a <strong>higher</strong> score
      </div> */}
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "12px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/new-tiles.png"
          style={{
            width: "50px",
            margin: "6px 12px 0px 0px",
            cursor: "pointer",
          }}
        />
        Tap to get a new set of 12 tiles
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "12px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/shuffle-tiles.png"
          style={{
            width: "50px",
            margin: "6px 12px 0px 0px",
            cursor: "pointer",
          }}
        />
        Tap to shuffle the tiles left in your drawer
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "12px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/clear-tiles.png"
          style={{
            width: "50px",
            margin: "6px 12px 0px 0px",
            cursor: "pointer",
          }}
        />
        Tap to clear the tiles from the board
      </div>
      <div
        style={{
          paddingBottom: "12px",
          borderBottom: "1px solid #6c6c6c",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/check-tiles.png"
          style={{
            width: "50px",
            margin: "6px 12px 0px 0px",
            cursor: "pointer",
          }}
        />
        Tap to check your solution
      </div>
      <div
        style={{
          paddingBottom: "12px",
          borderBottom: "1px solid #6c6c6c",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/share-tiles.png"
          style={{
            width: "50px",
            margin: "6px 12px 0px 0px",
            cursor: "pointer",
          }}
        />
        Tap to share the current puzzle with a friend
      </div>
    </Modal>
  );
}

export default HelpModal;
