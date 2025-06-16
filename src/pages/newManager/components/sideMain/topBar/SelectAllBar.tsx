import { useEffect, useState } from "react";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import AssetsPack from "../../../../../util/AssetsPack";
import { SideCardType } from "../../../../../util/QuestionStatus";
import styles from "./SelectAllBar.module.css";
import { useTranslation } from "react-i18next";
import { KowledgeContentBulkDelete } from "../../../../../api/apiCalls";
import { showConsoleError } from "../../../../../util/ConsoleMessage";
import clsx from "clsx";
/* eslint-disable complexity */

const SelectAllBar = () => {
  const {
    setUpdateConversationList,
    conversations,
    statusClicked,
    setConversations,
  } = useConversationsContext();
  const [checked, setChecked] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const anySelected = conversations.some((conv) => conv.isSelected);
    const allSelected = conversations.every((conv) => conv.isSelected);

    setShowActionButton(anySelected);
    setChecked(allSelected && conversations.length > 0);
  }, [conversations]);

  const handleBulkAction = async () => {
    const selectedIds = conversations
      .filter((c) => c.isSelected)
      .map((c) => c.id);

    try {
      if (statusClicked === SideCardType.Rejected) {
        await KowledgeContentBulkDelete(selectedIds);
      }
    } catch (e) {
      showConsoleError(e);
    }

    setConversations(conversations.map((c) => ({ ...c, isSelected: false })));
    setUpdateConversationList(true);
  };

  const handleSelectAll = () => {
    setConversations(
      conversations.map((c) => ({ ...c, isSelected: !checked }))
    );
  };

  const icon = AssetsPack.icons.ICON_CLOSE.default;

  return (
    <div className={styles["all-container"]}>
      {statusClicked !== SideCardType.Context && (
        <div className={clsx(styles["select-all-box"], styles.delete)}>
          <input
            type="checkbox"
            className={clsx(styles.checkbox, styles.delete)}
            onChange={handleSelectAll}
            checked={checked}
          />
          <p>{t("selectAllBar.select_all")}</p>
        </div>
      )}

      {showActionButton && (
        <button
          className={clsx(styles["bulk-button"], styles.delete)}
          onClick={handleBulkAction}
        >
          <img src={icon} alt="" />
          {t("selectAllBar.delete_all_selected")}
        </button>
      )}
    </div>
  );
};

export default SelectAllBar;
