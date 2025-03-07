import React from "react";
import styles from "./TopBar.module.css";
import AssetsPack from "../../util/AssetsPack";
interface TopBarProps {
  total: number;
  topBarType: TopBarType;
};

export enum TopBarType {
  PreApproved = "Pre-Approved",
  Rejected = "Rejected",
  NeedApproval = "Need Approval",
}

const TopBar = ({total, topBarType }: TopBarProps) => {

  const getIcon = (type: TopBarType) => {
    switch (type) {
      case TopBarType.PreApproved:
        return AssetsPack.icons.ICON_PRE_APPROVED.default;
      case TopBarType.Rejected:
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
