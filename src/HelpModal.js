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
        }}
      >
        <strong>Lattice</strong> is where Scrabble meets Solitaire
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
        }}
      >
        Use all <strong>12 tiles</strong> to make words that cross
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
        }}
      >
        Words must be at least <strong>3 letters</strong> long
      </div>
      <div>New Lattice at midnight</div>
    </Modal>
  );
}

export default HelpModal;
