import AssetsPack from "../../../../../util/AssetsPack";
import { QuestionStatus } from "../../../../../util/QuestionStatus";
import styles from "./SelectAllBar.module.css";
import { useTranslation } from "react-i18next";
/* eslint-disable complexity */

interface SelectAllBarProps {
  checkBoxLabel?: string;
  saveAllButtonText?: string;
  questionStatus: QuestionStatus;
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
  questionStatus,
}: SelectAllBarProps) => {
  const ICONS_MAP = {
    [QuestionStatus.Rejected]: AssetsPack.icons.ICON_CLOSE.default,
    [QuestionStatus.PreApproved]: AssetsPack.icons.ICON_TICK.default,
  };

  const containerClass =
    questionStatus === QuestionStatus.PreApproved
      ? styles["write-all-container"]
      : styles["delete-all-container"];
  const selectAllClass =
    questionStatus === QuestionStatus.PreApproved
      ? styles["select-all-to-write"]
      : styles["select-all-to-delete"];
  const buttonClass =
    questionStatus === QuestionStatus.PreApproved
      ? styles["pre-approve"]
      : styles["dismiss"];
  const checkboxId =
    questionStatus === QuestionStatus.PreApproved
      ? styles["select-all-write"]
      : styles["select-all-delete"];
  const buttonId =
    questionStatus === QuestionStatus.PreApproved
      ? styles["write-all-button"]
      : styles["delete-all-button"];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAllClick(e.target.checked);
  };

  const {t} = useTranslation()

  if (questionStatus !== QuestionStatus.NeedApproval) {
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
          <img src={ICONS_MAP[questionStatus]} />
          {questionStatus === QuestionStatus.PreApproved
            ? t("selectAllBar.approve_all")
            : t("selectAllBar.delete_all_selected")}
        </button>
      </div>
    );
  }
  return <></>;
};

export default SelectAllBar;
