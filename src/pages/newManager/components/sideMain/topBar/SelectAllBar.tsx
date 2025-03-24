import { useConversationsContext } from "../../../../../context/ConversationProvider";
import AssetsPack from "../../../../../util/AssetsPack";
import { SideCardType } from "../../../../../util/QuestionStatus";
import styles from "./SelectAllBar.module.css";
import { useTranslation } from "react-i18next";
/* eslint-disable complexity */

interface SelectAllBarProps {
  checkBoxLabel?: string;
  saveAllButtonText?: string;
  checked: boolean;
  showActionButton?: boolean;
  onBulkActionCommit?: () => void;
  onSelectAllClick?: (checked: boolean) => void;
}

const SelectAllBar = ({
  checked,
  showActionButton = false,
  onBulkActionCommit = () => {},
  onSelectAllClick = () => {},
}: SelectAllBarProps) => {
  const {statusClicked} = useConversationsContext()

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAllClick(e.target.checked);
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
          onClick={onBulkActionCommit}
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
