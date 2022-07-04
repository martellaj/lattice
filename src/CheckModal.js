import "./HelpModal.css";
import { Modal, Icon } from "semantic-ui-react";
import { useState } from "react";

function CheckModal({ onClosed, result, reason, invalidWords }) {
  const [open, setOpen] = useState(true);

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
        {result ? "great work!" : "not quite right..."}
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
            <div>
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
    </Modal>
  );
}

export default CheckModal;
