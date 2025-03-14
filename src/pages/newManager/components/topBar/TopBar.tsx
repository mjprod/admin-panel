import styles from "./TopBar.module.css";
import AssetsPack from "../../../../util/AssetsPack";
import { QuestionStatus } from "../../../../util/QuestionStatus";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

interface TopBarProps {
  statusClicked: QuestionStatus;
  totalCount: number;
}

const TopBar: React.FC<TopBarProps> = ({ statusClicked, totalCount }) => {
  // const { statusClicked, totalCount } = useConversations();

  const ICONS_MAP = {
    [QuestionStatus.Rejected]: AssetsPack.icons.ICON_REJECT.default,
    [QuestionStatus.PreApproved]: AssetsPack.icons.ICON_PRE_APPROVED.default,
    [QuestionStatus.NeedApproval]: AssetsPack.icons.ICON_NEED_APPROVAL.default,
  };

  const { t } = useTranslation();

  useEffect(() => {
    console.log("statusClicked-----Topbar--", statusClicked);
  }, [statusClicked]);

  return (
    <div className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["icon-need-approval"]}>
            <img src={ICONS_MAP[statusClicked]} alt="icon" />
          </div>
          <p>{t(`newManager.${statusClicked}`)}</p>
        </div>
        <div className={styles["rightcol"]}>
          <div className={styles["question-count"]}>
            <p>
              {t("newManager.total")} {totalCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
