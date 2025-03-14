import React, { useRef } from "react";
import styles from "./ActionButtons.module.css";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import PopUpFeedback from "../../../components/popUp/PopUpFeedback";
import { useTranslation } from "react-i18next";
import { KnowledgeStatus } from "../../../api/responsePayload/KnowledgeResponse";
import {
  KowledgeContentBulkUpdate,
  KowledgeContentStatusPatch,
} from "../../../api/auth";
import { getStatusNumber, QuestionStatus } from "../../../util/QuestionStatus";
import { useConversationsContext } from "../../../context/ConversationProvider";

interface ActionButtonsProps {
  id: number;
  status: KnowledgeStatus;
  isEditSelected: boolean;
  setEditSelected: (value: boolean) => void;
  updatedQuestion: string;
  updatedAnswer: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  status,
  isEditSelected,
  setEditSelected,
  updatedQuestion,
  updatedAnswer,
}) => {
  const { t } = useTranslation();
  const { setUpdateConversationList } = useConversationsContext();

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleEdit = () => {
    setEditSelected(!isEditSelected);
  };

  const handlePreApprove = async () => {
    if (isEditSelected) {
      const res = await KowledgeContentStatusPatch(
        id,
        getStatusNumber(QuestionStatus.PreApproved),
        updatedQuestion,
        updatedAnswer
      );
      console.log("patch res ...... handleSaveAndPreApprove", id, res);
      return;
    }
    const res = await KowledgeContentStatusPatch(
      id,
      getStatusNumber(QuestionStatus.PreApproved)
    );
    setUpdateConversationList(true);
    console.log("patch res ...... handlePreApprove", id, res);
  };

  const handleReject = () => {
    modalRef.current?.showModal();
    setUpdateConversationList(true);
  };

  const handleReturn = async () => {
    const res = await KowledgeContentBulkUpdate(
      [id],
      getStatusNumber(QuestionStatus.NeedApproval)
    );
    console.log("patch res ...... handle Return Approve", id, res);
    setUpdateConversationList(true);
  };

  const handleDelete = () => {
    setUpdateConversationList(true);
  };

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
