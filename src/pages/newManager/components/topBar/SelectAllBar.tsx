import styles from "./SelectAllBar.module.css";
import { QuestionStatus } from "../../../../util/QuestionStatus";
import AssetsPack from "../../../../util/AssetsPack";

interface SelectAllBarProps {
    checkBoxLabel?: string;
    saveAllButtonText?: string;
    questionStatus: QuestionStatus;
    checked: boolean;
    onSaveAllClicked?: (checked: boolean) => void;
    onSelectAllClick?: () => void;
};

const SelectAllBar = ({
    checked, onSaveAllClicked = () => { },
    onSelectAllClick = () => { },
    questionStatus
}: SelectAllBarProps) => {

    const ICONS_MAP = {
        [QuestionStatus.Rejected]: AssetsPack.icons.ICON_CLOSE.default,
        [QuestionStatus.PreApproved]: AssetsPack.icons.ICON_TICK.default
    };

    const containerClass = questionStatus === QuestionStatus.PreApproved ? styles["write-all-container"] : styles["delete-all-container"];
    const selectAllClass = questionStatus === QuestionStatus.PreApproved ? styles["select-all-to-write"] : styles["select-all-to-delete"];
    const buttonClass = questionStatus === QuestionStatus.PreApproved ? styles["pre-approve"] : styles["dismiss"];
    const checkboxId = questionStatus === QuestionStatus.PreApproved ? styles["select-all-write"] : styles["select-all-delete"];
    const buttonId = questionStatus === QuestionStatus.PreApproved ? styles["write-all-button"] : styles["delete-all-button"];

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSaveAllClicked(e.target.checked);
    };

    if (questionStatus !== QuestionStatus.NeedApproval) {
        return (
            <div className={containerClass}>
                <div className={selectAllClass}>
                    <input type="checkbox" name="" id={checkboxId} onChange={handleCheckboxChange} checked={checked} />
                    <p>Select All</p>
                </div>
                <button className={buttonClass} id={buttonId} style={checked ? { display: "flex" } : { display: "none" }} onClick={onSelectAllClick}>
                    <img src={ICONS_MAP[questionStatus]} />
                    {questionStatus === QuestionStatus.PreApproved ? "Save All Selected" : "Delete All Selected"}
                </button>
            </div>
        );
    }
    return <></>;
};

export default SelectAllBar;
