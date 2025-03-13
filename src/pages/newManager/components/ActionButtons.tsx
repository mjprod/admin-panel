import React, { useRef } from "react";
import styles from "./ActionButtons.module.css";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import PopUpFeedback from "../../../components/popUp/PopUpFeedback";
import { useTranslation } from "react-i18next";
import { KnowledgeStatus } from "../../../api/responsePayload/KnowledgeResponse";
import { KowledgeContentStatusPatch } from "../../../api/auth";
// import { useConversations } from "../../../store/useConversation";

const ActionButtons: React.FC<{
  id: number;
  status: KnowledgeStatus;
  isEditSelected: boolean;
  setEditSelected: (value: boolean) => void;
}> = ({ id, status, isEditSelected, setEditSelected }) => {

  // const {
  //       currentPage,
  //       onPrevPageClicked,
  //       onNextPageClicked,
  //       totalPages,
  //     } = useConversations();
      
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleEdit = () => setEditSelected(!isEditSelected);
  const handlePreApprove = async () => {
    const res = await KowledgeContentStatusPatch(id, 2);
    console.log("patch res ...... handlePreApprove", id, res)
  };
  const handleReject = () => {
    modalRef.current?.showModal();
  };
  const handleReturn = () => {};
  const handleDelete = () => {};

  if (status === KnowledgeStatus.NeedReview) {
    return (
      <>
        {!isEditSelected && (
          <CustomButton
            text={t("newManager.reject")}
            type={ButtonType.Reject}
            onClick={handleReject}
          />
        )}
        <div className={styles["rightcol-buttons"]}>
          <CustomButton
            text={
              isEditSelected
                ? t("newManager.exit_edit_mode")
                : t("newManager.edit")
            }
            type={isEditSelected ? ButtonType.Cancel : ButtonType.Edit}
            onClick={handleEdit}
          />
          <CustomButton
            text={
              isEditSelected
                ? t("newManager.save_preApprove")
                : t("newManager.preApproval")
            }
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
      KnowledgeStatus,
      { text: string; type: ButtonType; onClick: () => void }
    >
  > = {
    [KnowledgeStatus.PreApproved]: {
      text: t("newManager.return_to_approval"),
      type: ButtonType.Return,
      onClick: handleReturn,
    },
    [KnowledgeStatus.Rejected]: {
      text: t("newManager.permanently_delete"),
      type: ButtonType.Delete,
      onClick: handleDelete,
    },
  };

  return buttonConfig[status] ? (
    <CustomButton {...buttonConfig[status]} />
  ) : null;
};

export default ActionButtons;
