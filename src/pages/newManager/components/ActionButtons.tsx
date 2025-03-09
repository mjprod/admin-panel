import React, { useRef } from "react";
import styles from "./ActionButtons.module.css";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import { QuestionStatus } from "../../../util/QuestionStatus";
import PopUpFeedback from "../../../components/popUp/PopUpFeedback";

const ActionButtons: React.FC<{
  status: QuestionStatus;
  isEditSelected: boolean;
  setEditSelected: (value: boolean) => void;
}> = ({ status, isEditSelected, setEditSelected }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleEdit = () => setEditSelected(!isEditSelected);
  const handlePreApprove = () => setEditSelected(!isEditSelected);
  const handleReject = () => {
    modalRef.current?.showModal();
  };
  const handleReturn = () => {};
  const handleDelete = () => {};

  if (status === QuestionStatus.NeedApproval) {
    return (
      <>
        {!isEditSelected && (
          <CustomButton
            text="Tolak"
            type={ButtonType.Reject}
            onClick={handleReject}
          />
        )}
        <div className={styles["rightcol-buttons"]}>
          <CustomButton
            text={isEditSelected ? "Keluar dari Mod Edit" : "Sunting"}
            type={isEditSelected ? ButtonType.Cancel : ButtonType.Edit}
            onClick={handleEdit}
          />
          <CustomButton
            text={isEditSelected ? "Simpan & Pralulus" : "Pra-Kelulusan"}
            type={isEditSelected ? ButtonType.Done : ButtonType.Approve}
            onClick={handlePreApprove}
          />
        </div>

        <PopUpFeedback modalRef={modalRef} />
      </>
    );
  }

  const buttonConfig: Partial<
    Record<
      QuestionStatus,
      { text: string; type: ButtonType; onClick: () => void }
    >
  > = {
    [QuestionStatus.PreApproved]: {
      text: 'Kembali kepada "memerlukan kelulusan"',
      type: ButtonType.Return,
      onClick: handleReturn,
    },
    [QuestionStatus.Rejected]: {
      text: "Padamkan secara kekal",
      type: ButtonType.Delete,
      onClick: handleDelete,
    },
  };

  return buttonConfig[status] ? (
    <CustomButton {...buttonConfig[status]} />
  ) : null;
};

export default ActionButtons;
