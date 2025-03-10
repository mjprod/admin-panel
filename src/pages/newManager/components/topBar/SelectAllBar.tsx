import styles from "./SelectAllBar.module.css";
import { QuestionStatus } from "../../../../util/QuestionStatus";
import AssetsPack from "../../../../util/AssetsPack";

interface SelectAllBarProps {
    checkBoxLabel?: string;
    saveAllButtonText?: string;
    topBarType: QuestionStatus;
    checked: boolean;
    onSaveAllClicked?: (checked: boolean) => void;
    onSelectAllClick?: () => void;
};

const SelectAllBar = ({
    checkBoxLabel = "Select All",
    saveAllButtonText = "Save All Selected",
    checked, onSaveAllClicked = () => { },
    onSelectAllClick = () => { },
    topBarType
}: SelectAllBarProps) => {

    const ICONS_MAP = {
        [QuestionStatus.Rejected]: AssetsPack.icons.ICON_CLOSE.default,
        [QuestionStatus.PreApproved]: AssetsPack.icons.ICON_TICK.default
    };

    const containerClass = topBarType === QuestionStatus.PreApproved ? styles["write-all-container"] : styles["delete-all-container"];
    const selectAllClass = topBarType === QuestionStatus.PreApproved ? styles["select-all-to-write"] : styles["select-all-to-delete"];
    const buttonClass = topBarType === QuestionStatus.PreApproved ? styles["pre-approve"] : styles["dismiss"];
    const checkboxId = topBarType === QuestionStatus.PreApproved ? styles["select-all-write"] : styles["select-all-delete"];
    const buttonId = topBarType === QuestionStatus.PreApproved ? styles["write-all-button"] : styles["delete-all-button"];

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSaveAllClicked(e.target.checked);
    };

    if (topBarType !== QuestionStatus.NeedApproval) {
        return (
            <div className={containerClass}>
                <div className={selectAllClass}>
                    <input type="checkbox" name="" id={checkboxId} onChange={handleCheckboxChange} checked={checked} />
                    <p>{checkBoxLabel}</p>
                </div>
                <button className={buttonClass} id={buttonId} style={checked ? { display: "flex" } : { display: "none" }} onClick={onSelectAllClick}>
                    <img src={ICONS_MAP[topBarType]} />
                    {saveAllButtonText}
                </button>
            </div>
        );
    }
    return <></>;
};

export default SelectAllBar;
