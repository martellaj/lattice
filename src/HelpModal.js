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
      <div>💣 Select a spot to fire a shot</div>
      <div>❌ means you missed</div>
      <div>💥 means you hit the battleship</div>
      <div>🏆 Sink the battleship (3 hits) in as few shots as possible</div>
      <div>🕛 New battle at midnight</div>
    </Modal>
  );
}

export default HelpModal;
