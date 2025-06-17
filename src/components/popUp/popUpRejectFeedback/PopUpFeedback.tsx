import React, { useEffect, useRef, useState } from "react";
import styles from "./PopUpFeedback.module.css";
import AssetsPack from "../../../util/AssetsPack";
import { useTranslation } from "react-i18next";

interface PopUpFeedbackProps {
  isOpen: boolean;
  handleSubmit: (selectOption: number, textMessage: string) => void;
  onClose: () => void
}

enum RejetType {
  OTHER,
  WRONG_QUESTION,
  WRONG_ANSWER
}

const PopUpFeedback: React.FC<PopUpFeedbackProps> = ({
  isOpen,
  handleSubmit,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<RejetType>();
  const [textMessage, setTextMessage] = useState<string>("");

  const modalRef = useRef<HTMLDialogElement | null>(null);


  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const closeModal = () => {
    onClose()
    modalRef.current?.close();
  };



  const handleRadioChange = (event: any) => {
    setSelectedOption(Number(event.target.value) as RejetType);
  };

  const onSubmit = () => {
    if (selectedOption === undefined) return;
    handleSubmit(selectedOption + 1, (selectedOption == RejetType.OTHER) ? textMessage : "");
    closeModal();
  };

  const { t } = useTranslation()

  return (
    <dialog ref={modalRef} id="modal" className={styles["dialog"]} onClose={closeModal}>
      <div className={styles["delete-modal-content-container"]}>
        <div className={styles["row01"]}>
          <h2 className={styles["title"]}>{t("popUpFeedback.provide_feedback")}</h2>
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
              value={RejetType.WRONG_QUESTION.toString()}
              checked={selectedOption === RejetType.WRONG_QUESTION}
              onChange={(e: any) => handleRadioChange(e)}
            />
            <label htmlFor="wrong-question">
              {t("popUpFeedback.wrong_question")}
            </label>
          </div>
          <div className={styles["radio-input-row"]}>
            <input
              type="radio"
              name="feedback"
              id="wrong-answer"
              value={RejetType.WRONG_ANSWER.toString()}
              checked={selectedOption === RejetType.WRONG_ANSWER}
              onChange={(e: any) => handleRadioChange(e)}
            />
            <label htmlFor="wrong-answer">
              {t("popUpFeedback.wrong_answer")}
            </label>
          </div>
          <div className={styles["radio-input-row"]}>
            <input
              type="radio"
              name="feedback"
              id="other"
              value={RejetType.OTHER.toString()}
              checked={selectedOption === RejetType.OTHER}
              onChange={(e: any) => handleRadioChange(e)}
            />
            <label htmlFor="other">{t("popUpFeedback.other")}</label>
          </div>
          <div className={styles["radio-input-row"]}>
            <textarea
              name="explanation"
              id="explanation"
              placeholder={t("popUpFeedback.explain")}
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              disabled={selectedOption !== RejetType.OTHER}
            ></textarea>
          </div>
        </div>
        <button
          className={styles["delete-submit"]}
          onClick={onSubmit}
          disabled={
            selectedOption === undefined ||
            (selectedOption === RejetType.OTHER && !textMessage.trim())
          }
        >
          {t("popUpFeedback.submit")}
        </button>
      </div>
    </dialog>
  );
};

export default PopUpFeedback;
