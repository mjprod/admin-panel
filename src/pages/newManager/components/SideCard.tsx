import React from "react";
import styles from "./SideCard.module.css";
import AssetsPack from "../../../util/AssetsPack";
import clsx from "clsx";

export enum SideCardStatus {
  NeedApproval = "Need Approval",
  PreApproval = "Pre-Approved",
  Rejected = "Rejected",
}

interface SideCardProps {
  status: SideCardStatus;
  number: number;
}

const SideCard: React.FC<SideCardProps> = ({ status, number }) => {
  const getIcon = (status: SideCardStatus) => {
    switch (status) {
      case SideCardStatus.NeedApproval:
        return AssetsPack.icons.ICON_NEED_APPROVAL.default;
      case SideCardStatus.PreApproval:
        return AssetsPack.icons.ICON_PRE_APPROVED.default;
      case SideCardStatus.Rejected:
        return AssetsPack.icons.ICON_REJECT.default;
      default:
        return null;
    }
  };
  const icon = getIcon(status);

  return (
    <div className={styles["timeline-card"]}>
      <div className={styles["row01"]}>
        <p>{number}</p>
      </div>
      <div className={styles["row02"]}>
        <div
          className={clsx(
            styles["icon"],
            status == SideCardStatus.Rejected && styles["rejected"]
          )}
        >
          {icon && <img src={`${icon}`} />}
        </div>
        <p className={clsx(status == SideCardStatus.Rejected && styles["rejected"])}>{status}</p>
      </div>
    </div>
  );
};

export default SideCard;
