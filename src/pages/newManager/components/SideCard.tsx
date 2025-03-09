import React from "react";
import styles from "./SideCard.module.css";
import AssetsPack from "../../../util/AssetsPack";
import clsx from "clsx";
import { QuestionStatus } from "../../../util/QuestionStatus";

interface SideCardProps {
  status: QuestionStatus;
  number: number;
  onSideCardClicked:(status: QuestionStatus) => void;
}

const SideCard: React.FC<SideCardProps> = ({ status, number, onSideCardClicked }) => {
  const getIcon = (status: QuestionStatus) => {
    switch (status) {
      case QuestionStatus.NeedApproval:
        return AssetsPack.icons.ICON_NEED_APPROVAL.default;
      case QuestionStatus.PreApproved:
        return AssetsPack.icons.ICON_PRE_APPROVED.default;
      case QuestionStatus.Rejected:
        return AssetsPack.icons.ICON_REJECT.default;
      default:
        return null;
    }
  };
  const icon = getIcon(status);

  return (
    <div className={styles["timeline-card"]} onClick={() => onSideCardClicked(status)}>
      <div className={styles["row01"]}>
        <p>{number}</p>
      </div>
      <div className={styles["row02"]}>
        <div
          className={clsx(
            styles["icon"],
            status == QuestionStatus.Rejected && styles["rejected"]
          )}
        >
          {icon && <img src={`${icon}`} />}
        </div>
        <p
          className={clsx(
            status == QuestionStatus.Rejected && styles["rejected"]
          )}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default SideCard;
