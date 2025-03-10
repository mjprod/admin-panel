import styles from "./TopBar.module.css";
import AssetsPack from "../../../../util/AssetsPack";
import { QuestionStatus } from "../../../../util/QuestionStatus";

interface TopBarProps {
  total: number;
  questionStatus: QuestionStatus;
};

const TopBar = ({ total, questionStatus }: TopBarProps) => {
  const ICONS_MAP = {
    [QuestionStatus.Rejected]: AssetsPack.icons.ICON_REJECT.default,
    [QuestionStatus.PreApproved]: AssetsPack.icons.ICON_PRE_APPROVED.default,
    [QuestionStatus.NeedApproval]: AssetsPack.icons.ICON_NEED_APPROVAL.default
  };

  return (
    <div className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["icon-need-approval"]}>
            <img src={ICONS_MAP[questionStatus]} alt="icon" />
          </div>
          <p>{questionStatus}</p>
        </div>
        <div className={styles["rightcol"]}>
          <div className={styles["question-count"]}>
            <p>Total {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
