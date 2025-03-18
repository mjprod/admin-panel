import React, { useState } from "react";
import styles from "./PopUpFeedback.module.css";
import AssetsPack from "../../util/AssetsPack";

interface PopUpFeedbackProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  handleSubmit: (selectOption: string, textMessage: string) => void;
}

const PopUpFeedback: React.FC<PopUpFeedbackProps> = ({
  modalRef,
  handleSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [textMessage, setTextMessage] = useState<string>("");

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(selectedOption, textMessage);
    closeModal();
  };

  return (
    <dialog ref={modalRef} id="modal" className={styles["dialog"]}>
      <div className={styles["delete-modal-content-container"]}>
        <div className={styles["row01"]}>
          <h2 className={styles["title"]}>Provide Feedback</h2>
          <button onClick={closeModal} className={styles["closeModal"]}>
            <img
              className={styles["close-dialog-modal"]}
              src={AssetsPack.icons.ICON_CLOSE_GRAY.default}
            />
          </button>
        </div>
        <div className={styles["row02"]}>
          <div className={styles["radio-input-row"]}>
            <input
              type="radio"
              name="feedback"
              id="wrong-question"
              value="Wrong Question"
              checked={selectedOption === "Wrong Question"}
              onChange={handleRadioChange}
            />
            <label htmlFor="wrong-question">Wrong Question</label>
          </div>
          <div className={styles["radio-input-row"]}>
            <input
              type="radio"
              name="feedback"
              id="wrong-answer"
              value="Wrong Answer"
              checked={selectedOption === "Wrong Answer"}
              onChange={handleRadioChange}
            />
            <label htmlFor="wrong-answer">Wrong Answer</label>
          </div>
          <div className={styles["radio-input-row"]}>
            <input
              type="radio"
              name="feedback"
              id="other"
              value="Other"
              checked={selectedOption === "Other"}
              onChange={handleRadioChange}
            />
            <label htmlFor="other">Other</label>
          </div>
          <div className={styles["radio-input-row"]}>
            <textarea
              name="explanation"
              id="explanation"
              placeholder="Explain"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              disabled={selectedOption !== "Other"}
            ></textarea>
          </div>
        </div>
        <button
          className={styles["delete-submit"]}
          onClick={onSubmit}
          disabled={!selectedOption}
        >
          Submit
        </button>
      </div>
    </dialog>
  );
};

export default PopUpFeedback;
