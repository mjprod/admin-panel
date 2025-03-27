import { useEffect, useState } from "react";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import AssetsPack from "../../../../../util/AssetsPack";
import { SideCardType } from "../../../../../util/QuestionStatus";
import styles from "./SelectAllBar.module.css";
import { useTranslation } from "react-i18next";
import { KowledgeContentBulkUpdateStatus, KowledgeContentBulkDelete } from "../../../../../api/auth";
import { showConsoleError } from "../../../../../util/ConsoleMessage";
/* eslint-disable complexity */

interface SelectAllBarProps {
  checkBoxLabel?: string;
  saveAllButtonText?: string;
}

const SelectAllBar = ({
}: SelectAllBarProps) => {
  const {setUpdateConversationList, conversations, statusClicked, setConversations} = useConversationsContext()
  const [showActionButton, setShowActionButton] = useState(false);
  const [checked, setChecked] = useState(false);

    useEffect(() => {
      conversations.some((conv) => conv.isSelected)
        ? setShowActionButton(true)
        : setShowActionButton(false);
      conversations.some((conv) => !conv.isSelected)
        ? setChecked(false)
        : setChecked(true);
  
      if (conversations.length == 0) setChecked(false);
    }, [conversations]);

    const handleBulkAction = async () => {
      const conversationIds: number[] = conversations
        .filter((con) => con.isSelected === true)
        .map((con) => con.id);
  
      if (statusClicked == SideCardType.PreApproved) {
        try {
          await KowledgeContentBulkUpdateStatus(conversationIds, 3);
        } catch (e) {
          showConsoleError(e);
        }
      }
  
      if (statusClicked == SideCardType.Rejected) {
        try {
          await KowledgeContentBulkDelete(conversationIds);
        } catch (e) {
          showConsoleError(e);
        }
      }
  
      setConversations((conversations) =>
        conversations.map((con) => {
          con.isSelected = false;
          return con;
        })
      );
  
      setUpdateConversationList(true);
    };

  const getIcon = (type: SideCardType) => {
    switch (type) {
      case SideCardType.Rejected:
        return AssetsPack.icons.ICON_CLOSE.default;
      default:
        return AssetsPack.icons.ICON_TICK.default;
    }
  };
  const icon = getIcon(statusClicked);

  const containerClass =
  statusClicked === SideCardType.PreApproved
      ? styles["write-all-container"]
      : styles["delete-all-container"];
  const selectAllClass =
  statusClicked === SideCardType.PreApproved
      ? styles["select-all-to-write"]
      : styles["select-all-to-delete"];
  const buttonClass =
  statusClicked === SideCardType.PreApproved
      ? styles["pre-approve"]
      : styles["dismiss"];
  const checkboxId =
  statusClicked === SideCardType.PreApproved
      ? styles["select-all-write"]
      : styles["select-all-delete"];
  const buttonId =
  statusClicked === SideCardType.PreApproved
      ? styles["write-all-button"]
      : styles["delete-all-button"];

  const handleCheckboxChange = () => {
    setConversations((conversations) =>
      conversations.map((con) => {
        con.isSelected = !checked;
        return con;
      })
    );
  };

  const {t} = useTranslation()

  if (statusClicked !== SideCardType.NeedApproval && statusClicked !== SideCardType.MaxPanel ) {
    return (
      <div className={containerClass}>
        <div className={selectAllClass}>
          <input
            type="checkbox"
            name=""
            id={checkboxId}
            onChange={handleCheckboxChange}
            checked={checked}
          />
          <p>{t("selectAllBar.select_all")}</p>
        </div>
        <button
          className={buttonClass}
          id={buttonId}
          style={showActionButton ? { display: "flex" } : { display: "none" }}
          onClick={handleBulkAction}
        >
          {icon && <img src={`${icon}`} />}
          {statusClicked === SideCardType.PreApproved
            ? t("selectAllBar.approve_all")
            : t("selectAllBar.delete_all_selected")}
        </button>
      </div>
    );
  }
  return <></>;
};

export default SelectAllBar;
