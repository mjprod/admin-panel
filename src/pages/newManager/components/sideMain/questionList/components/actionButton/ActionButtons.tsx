import React, { useRef } from "react";
import styles from "./ActionButtons.module.css";
import { useTranslation } from "react-i18next";
import {
  KowledgeContentStatusPatch,
  KowledgeContentBulkUpdateStatus,
  KowledgeContentDelete,
} from "../../../../../../../api/apiCalls";
import { KnowledgeStatus } from "../../../../../../../api/responsePayload/KnowledgeResponse";
import CustomButton, {
  ButtonType,
} from "../../../../../../../components/button/CustomButton";
import PopUpFeedback from "../../../../../../../components/popUp/popUpRejectFeedback/PopUpFeedback";
import { useConversationsContext } from "../../../../../../../context/ConversationProvider";
import { showConsoleError, showConsoleMessage } from "../../../../../../../util/ConsoleMessage";
import { QuestionStatus } from "../../../../../../../util/QuestionStatus";


interface ActionButtonsProps {
  id: number;
  status: KnowledgeStatus;
  isEditSelected: boolean;
  setEditSelected: (value: boolean) => void;
  updatedQuestion: string | null;
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
    try {
      if (isEditSelected) {
        await KowledgeContentStatusPatch(
          id,
          updatedQuestion ?? "",
          updatedAnswer
        );
      }

      await KowledgeContentBulkUpdateStatus(
        [id],
        QuestionStatus.PreApproved
      );
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleReject = () => {
    modalRef.current?.showModal();
  };

  const handleReturn = async () => {
    try {
      await KowledgeContentBulkUpdateStatus(
        [id],
        QuestionStatus.NeedApproval
      );
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleDelete = async () => {
    try {
      await KowledgeContentDelete(id);
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleRejectModalSubmit = async (
    selectOption: string,
    textMessage: string
  ) => {
    try {
      showConsoleMessage(selectOption, textMessage);
      await KowledgeContentBulkUpdateStatus(
        [id],
        QuestionStatus.Rejected
      );
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleApprove = async () => {
    try {
      await KowledgeContentBulkUpdateStatus([id], 3);
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
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

        <PopUpFeedback
          modalRef={modalRef}
          handleSubmit={handleRejectModalSubmit}
        />
      </>
    );
  }

  const buttonConfigPre: {
    text: string;
    type: ButtonType;
    onClick: () => void;
  }[] = [
    {
      text: t("newManager.return_to_approval"),
      type: ButtonType.Return,
      onClick: handleReturn,
    },
    {
      text: t("newManager.approved"),
      type: ButtonType.Approve,
      onClick: handleApprove,
    },
  ];

  if (status === KnowledgeStatus.PreApproved) {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
      >
        {buttonConfigPre.map((data, index) => (
          <CustomButton key={index} {...data} />
        ))}
      </div>
    );
  }

  const buttonConfig: Partial<
    Record<
      KnowledgeStatus,
      { text: string; type: ButtonType; onClick: () => void }
    >
  > = {
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
