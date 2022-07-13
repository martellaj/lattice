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
        }}
      >
        <strong>Lattice</strong> is a solo Scrabble challenge
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
          width: "100%",
        }}
      >
        Use all <strong>12 tiles</strong> to make words that cross
      </div>
      <div
        style={{
          paddingBottom: "24px",
        }}
      >
        Less words means a <strong>higher</strong> score
      </div>
      <div
        style={{
          paddingBottom: "24px",
          borderBottom: "1px solid #6c6c6c",
          width: "100%",
        }}
      >
        ⭐️ Can you earn all <strong>3 stars</strong>? ⭐️
      </div>

      <div>
        New Lattice at <strong>midnight</strong>
      </div>
    </Modal>
  );
}

export default HelpModal;
