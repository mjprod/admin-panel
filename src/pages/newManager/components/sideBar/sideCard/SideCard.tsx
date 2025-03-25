import React from "react";
import styles from "./SideCard.module.css";
import AssetsPack from "../../../../../util/AssetsPack";
import clsx from "clsx";
import { SideCardType } from "../../../../../util/QuestionStatus";
import { useTranslation } from "react-i18next";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface SideCardProps {
  type: SideCardType;
  number?: number;
  classNameStyle: string;
}

const SideCard: React.FC<SideCardProps> = ({ type, classNameStyle,}) => {
  const { statusClicked, setStatusClicked } = useConversationsContext();
  const getIcon = (type: SideCardType) => {
    switch (type) {
      case SideCardType.NeedApproval:
      case SideCardType.MaxPanel:
        return AssetsPack.icons.ICON_NEED_APPROVAL.default;
      case SideCardType.PreApproved:
        return AssetsPack.icons.ICON_PRE_APPROVED.default;
      case SideCardType.Rejected:
        return AssetsPack.icons.ICON_REJECT.default;
      case SideCardType.Core:
        return AssetsPack.icons.ICON_CORE.default;
      default:
        return null;
    }
  };
  const icon = getIcon(type);

  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        styles["timeline-card"],
        classNameStyle,
        statusClicked == type ? styles["active"] : styles["de-active"]
      )}
      onClick={() => setStatusClicked(type)}
    >
      {type != SideCardType.Core && (
        <div className={styles["row01"]}>
          {type == SideCardType.MaxPanel ? "MAX ONLY" : ""}
        </div>
      )}
      <div className={styles["row02"]}>
        <div
          className={clsx(
            styles["icon"],
            type == SideCardType.Rejected && styles["rejected"]
          )}
        >
          {icon && <img src={`${icon}`} />}
        </div>
        <p
          className={clsx(type == SideCardType.Rejected && styles["rejected"])}
        >
          {t(`sidecard.${type}`)}
        </p>
      </div>
    </div>
  );
};

export default SideCard;
