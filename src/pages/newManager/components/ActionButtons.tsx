import React from "react";
import styles from "./ActionButtons.module.css";
import CustomButton, { ButtonType } from "../../../components/button/CustomButton";
import { QuestionCardStatus } from "./QuestionCard";

const ActionButtons: React.FC<{
  status: QuestionCardStatus;
  isEditSelected: boolean;
  setEditSelected: (value: boolean) => void;
}> = ({ status, isEditSelected, setEditSelected }) => {
  const handleEdit = () => setEditSelected(!isEditSelected);
  const handlePreApprove = () => {};
  const handleReject = () => {};
  const handleReturn = () => {};
  const handleDelete = () => {};

  if (status === QuestionCardStatus.NeedApproval) {
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
      </>
    );
  }

  const buttonConfig: Partial<
    Record<
      QuestionCardStatus,
      { text: string; type: ButtonType; onClick: () => void }
    >
  > = {
    [QuestionCardStatus.PreApproved]: {
      text: 'Kembali kepada "memerlukan kelulusan"',
      type: ButtonType.Return,
      onClick: handleReturn,
    },
    [QuestionCardStatus.Rejected]: {
      text: "Padamkan secara kekal",
      type: ButtonType.Delete,
      onClick: handleDelete,
    },
  };

  return buttonConfig[status] ? (
    <CustomButton {...buttonConfig[status]} />
  ) : null;
};

export default ActionButtons
