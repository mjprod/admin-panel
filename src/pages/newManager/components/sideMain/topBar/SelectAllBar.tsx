import { useContext, useEffect, useState } from "react";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import AssetsPack from "../../../../../util/AssetsPack";
import { SideCardType } from "../../../../../util/QuestionStatus";
import styles from "./SelectAllBar.module.css";
import { useTranslation } from "react-i18next";
import {
  KowledgeContentBulkUpdateStatus,
  KowledgeContentBulkDelete,
} from "../../../../../api/apiCalls";
import { showConsoleError } from "../../../../../util/ConsoleMessage";
import { AuthContext } from "../../../../../context/AuthContext";
import clsx from "clsx";
/* eslint-disable complexity */


const SelectAllBar = () => {
  const { setUpdateConversationList, conversations, statusClicked, setConversations } = useConversationsContext();
  const [checked, setChecked] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const anySelected = conversations.some((conv) => conv.isSelected);
    const allSelected = conversations.every((conv) => conv.isSelected);

    setShowActionButton(anySelected);
    setChecked(allSelected && conversations.length > 0);
  }, [conversations]);

  const handleBulkAction = async () => {
    const selectedIds = conversations.filter((c) => c.isSelected).map((c) => c.id);

    try {
      if (statusClicked === SideCardType.PreApproved) {
        await KowledgeContentBulkUpdateStatus(selectedIds, 3);
      } else if (statusClicked === SideCardType.Rejected) {
        await KowledgeContentBulkDelete(selectedIds);
      }
    } catch (e) {
      showConsoleError(e);
    }

    setConversations(conversations.map((c) => ({ ...c, isSelected: false })));
    setUpdateConversationList(true);
  };

  const handleSelectAll = () => {
    setConversations(conversations.map((c) => ({ ...c, isSelected: !checked })));
  };

  if (
    statusClicked === SideCardType.NeedApproval ||
    statusClicked === SideCardType.MaxPanel ||
    (statusClicked === SideCardType.PreApproved && user?.is_superuser)
  ) {
    return null;
  }

  const isDelete = statusClicked === SideCardType.Rejected;
  const icon = isDelete
    ? AssetsPack.icons.ICON_CLOSE.default
    : AssetsPack.icons.ICON_TICK.default;

  return (
    <div className={styles["all-container"]}>
      <div
        className={clsx(styles["select-all-box"], isDelete && styles.delete)}
      >
        <input
          type="checkbox"
          className={clsx(styles.checkbox, isDelete && styles.delete)}
          onChange={handleSelectAll}
          checked={checked}
        />
        <p>{t("selectAllBar.select_all")}</p>
      </div>

      {showActionButton && (
        <button
          className={clsx(styles["bulk-button"], isDelete ? styles.delete : styles.approve)}
          onClick={handleBulkAction}
        >
          <img src={icon} alt="" />
          {isDelete
            ? t("selectAllBar.delete_all_selected")
            : t("selectAllBar.approve_all")}
        </button>
      )}
    </div>
  );
};

export default SelectAllBar;