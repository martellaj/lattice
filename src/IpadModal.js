import "./HelpModal.css";
import { Modal } from "semantic-ui-react";
import { useState } from "react";

// For use within normal web clients
const isiPad = navigator.userAgent.match(/iPad/i) != null;

function IpadModal(props) {
  const [open, setOpen] = useState(isiPad);

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
      <div className="helpModalTitle">JUST A HEADS UP</div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
        }}
      >
        We know the drag and drop experience on the iPad is a little awkward.
      </div>
      <div
        style={{
          paddingBottom: "24px",
        }}
      >
        While we work on fixing it, you just need to hold a little bit longer
        than you'd think you'd need to before dragging a tile and then it'll
        work! 👍
      </div>
    </Modal>
  );
}

export default IpadModal;
