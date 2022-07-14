import "./HelpModal.css";
import { Modal, Button, Input } from "semantic-ui-react";
import { useEffect, useState } from "react";

function SupporterInfoModal(props) {
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    window.localStorage.setItem("seenSupporterInfo", true);
  }, []);

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
      <div className="helpModalTitle">UNLIMITED PLAY</div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
          width: "100%",
        }}
      >
        The daily Lattice is <strong>free</strong> to play!
      </div>
      <div
        style={{
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
          width: "100%",
        }}
      >
        Supporters can play an <strong>unlimited</strong> amount of random
        puzzles!
      </div>
      <div
        style={{
          marginBottom: "12px",
          borderBottom: "1px solid #6c6c6c",
          paddingBottom: "24px",
        }}
      >
        <strong>Support</strong> using the button below and you'll be given a
        code to unlock it!
      </div>
      <Button
        id="donateButton"
        className="button active"
        size="large"
        color="purple"
        onClick={() => {
          window.open("https://www.buymeacoffee.com/lattice", "_blank");
        }}
      >
        SUPPORT
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "300px !important",
        }}
      >
        <Input
          style={{ marginRight: "12px", marginBottom: "0px", height: "40px" }}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <Button
          className="button unlockButton"
          onClick={() => {
            const CODE = "CORTADO";

            if (code.trim().toLowerCase() === CODE.toLowerCase()) {
              // save for later
              window.localStorage.setItem("isSupporter", true);

              // refresh page
              window.location.reload();
            } else {
              alert(
                "That didn't work. Maybe try again? Please send an email to lattice.feedback@gmail.com if the code you received isn't working!"
              );
            }
          }}
        >
          UNLOCK
        </Button>
      </div>
    </Modal>
  );
}

export default SupporterInfoModal;
