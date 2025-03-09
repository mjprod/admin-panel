import styles from "./TopBar.module.css";
import AssetsPack from "../../../../util/AssetsPack";
import { QuestionStatus } from "../../../../util/QuestionStatus";

interface TopBarProps {
  total: number;
  topBarType: QuestionStatus;
};

const TopBar = ({total, topBarType }: TopBarProps) => {

  const getIcon = (type: QuestionStatus) => {
    switch (type) {
      case QuestionStatus.PreApproved:
        return AssetsPack.icons.ICON_PRE_APPROVED.default;
      case QuestionStatus.Rejected:
        return AssetsPack.icons.ICON_REJECT.default;
      default:
        return AssetsPack.icons.ICON_NEED_APPROVAL.default;
    }
  };

  return (
    <div className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["icon-need-approval"]}>
          <img src={getIcon(topBarType)} />
          </div>
          <p>{topBarType}</p>
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
