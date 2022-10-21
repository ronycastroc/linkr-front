import { useState } from "react";
import styled from "styled-components";
import React from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333333",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "34px",
    textAlign: "center",
  },
};

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

      <Modal
        appElement={document.getElementsByClassName("root") || undefined}
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
          <BackButton onClick={closeModal}>No, go back</BackButton>
          <ConfirmDeleteButton onClick={closeModal}>
            Yes, delete it
          </ConfirmDeleteButton>
        </Options>
      </Modal>
    </div>
  );
}

const Confirmation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
`;

const ConfirmDeleteButton = styled.div`
  width: 135px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1877f2;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 20px;
`;

const BackButton = styled.div`
  width: 135px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #1877f2;
  border: none;
  cursor: pointer;
`;
