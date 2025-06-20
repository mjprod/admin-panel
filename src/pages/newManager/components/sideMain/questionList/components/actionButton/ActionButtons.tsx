import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KowledgeContentBulkUpdateStatus,
  KowledgeContentDelete,
  KowledgeContentStatusPatch,
  KowledgeContentUpdateReject,
} from "../../../../../../../api/apiCalls";
import { KnowledgeStatus } from "../../../../../../../api/responsePayload/KnowledgeResponse";
import CustomButton, {
  ButtonType,
} from "../../../../../../../components/button/CustomButton";
import { DialogShownFromType, DialogStyle } from "../../../../../../../components/dialog/Dialog";
import PopUpFeedback from "../../../../../../../components/popUp/popUpRejectFeedback/PopUpFeedback";
import { useConversationsContext } from "../../../../../../../context/ConversationProvider";
import { DialogContext } from "../../../../../../../context/DialogContext";
import {
  showConsoleError,
  showConsoleMessage,
} from "../../../../../../../util/ConsoleMessage";
import { QuestionStatus } from "../../../../../../../util/QuestionStatus";
import styles from "./ActionButtons.module.css";

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
  const { showDialog } = useContext(DialogContext);

  const [open, setOpen] = useState(false);
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
        setEditSelected(!isEditSelected);
      } else {

        showDialog(DialogStyle.Default, id, updatedQuestion ?? "", updatedAnswer, DialogShownFromType.NeedApproval);

        // await KowledgeContentBulkUpdateStatus([id], QuestionStatus.Approved);
        // setUpdateConversationList(true);
      }
    } catch (e) {
      showConsoleError(e);
    }
      
  };

  const handleReject = () => {
    setOpen(true);
  };

  const handleReturn = async () => {
    try {
      await KowledgeContentBulkUpdateStatus([id], QuestionStatus.NeedApproval);
      setUpdateConversationList(true);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleBackToNeedApproval = async () => {
    try {
      await KowledgeContentBulkUpdateStatus([id], QuestionStatus.NeedApproval);
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
    selectOption: number,
    textMessage: string
  ) => {
    try {
      showConsoleMessage(selectOption, textMessage);
      await KowledgeContentUpdateReject(
        id,
        QuestionStatus.Rejected,
        selectOption,
        textMessage
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
                ? t("newManager.save")
                : t("newManager.preApproval")
            }
            type={isEditSelected ? ButtonType.Done : ButtonType.Approve}
            onClick={handlePreApprove}
          />
        </div>

        {open && (
          <PopUpFeedback
            key={id}
            isOpen={open}
            handleSubmit={handleRejectModalSubmit}
            onClose={() => setOpen(false)}
          />
        )}
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
      { text: string; type: ButtonType; onClick: () => void }[]
    >
  > = {
    [KnowledgeStatus.Rejected]: [
      {
        text: "Back to Approval",
        type: ButtonType.Return,
        onClick: handleBackToNeedApproval,
      },
      {
        text: t("newManager.permanently_delete"),
        type: ButtonType.Delete,
        onClick: handleDelete,
      },
    ],
  };

  return buttonConfig[status] ? (
    <div style={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
      {buttonConfig[status]!.map((config, index) => (
        <CustomButton key={index} {...config} />
      ))}
    </div>
  ) : null;
};

export default ActionButtons;
