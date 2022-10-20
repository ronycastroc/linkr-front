import { useState } from "react";
import styled from "styled-components";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function DeletePost() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#ffffff";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ModalStyle>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Delete Post Modal"
          shouldCloseOnOverlayClick={false}
        >
          <Confirmation>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Are you sure you want to delete this post?
            </h2>
          </Confirmation>

          <Options>
            <button onClick={closeModal}>No, go back</button>
            <button onClick={closeModal}>Yes, delete it</button>
          </Options>
        </Modal>
      </ModalStyle>
    </div>
  );
}

const ModalStyle = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  background-color: #333333;
  border-radius: 30px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Confirmation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
`;
