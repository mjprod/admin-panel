import styles from "./TopBar.module.css";
import { useTranslation } from "react-i18next";
import React from "react";
import AssetsPack from "../../../../../util/AssetsPack";
import { SideCardType } from "../../../../../util/QuestionStatus";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = () => {
  const { statusClicked } = useConversationsContext();

    const totalCount = useSelector(
    (state: RootState) => state.pagination.totalCount
  );

  const getIcon = (type: SideCardType) => {
    switch (type) {
      case SideCardType.NeedApproval:
        return AssetsPack.icons.ICON_NEED_APPROVAL.default;
      case SideCardType.Rejected:
        return AssetsPack.icons.ICON_REJECT.default;
      case SideCardType.Brain:
        return AssetsPack.icons.ICON_CORE.default;
      case SideCardType.Context:
        return AssetsPack.icons.ICON_MAX.default;
      default:
        return null;
    }
  };
  const icon = getIcon(statusClicked);

  const { t } = useTranslation();

  return (
    <div className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["icon-need-approval"]}>
            {icon && <img src={`${icon}`} />}
          </div>
          <p>{t(`topbar.${statusClicked}`)}</p>
        </div>
        <div className={styles["rightcol"]}>
          <div className={styles["question-count"]}>
            <p>
              {t("newManager.total")} {totalCount}
            </p>
          </div>
        </div>
      </div>
      {statusClicked == SideCardType.Context && (
          <div className={styles["core-question-notes"]}>
            <p className={styles["notes"]}>
              <strong>Sila ambil perhatian:</strong>Sila semak soalan dan
              jawapan berikut. Ini adalah "soalan teras" yang mungkin berubah
              dan melibatkan perkara seperti masa keluaran dan tempoh menunggu
              pembayaran. Selepas mengemas kini maklumat, sila pastikan anda
              memilih kotak semak dan menekan butang{" "}
              <span className={styles["highlight"]}>
                "Simpan Semua yang Dipilih"
              </span>{" "}
              untuk mengesahkan perubahan anda.
            </p>
          </div>
        )}
    </div>
  );
};

export default TopBar;
