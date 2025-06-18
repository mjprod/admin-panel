import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import SideCard from "./sideCard/SideCard";
import CreateNewButton from "./createNewButton/CreateNewButton";
import { SideCardType } from "../../../../util/QuestionStatus";
import { AuthContext } from "../../../../context/AuthContext";
import { useTranslation } from "react-i18next";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const { t } = useTranslation();

  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["list-container"]}>
        <div className={styles["tools-heading"]}>Cipta/Edit</div>
         <CreateNewButton />
         <SideCard type={SideCardType.Brain} classNameStyle={styles["timeline-card"]}/>
        <div className={styles["tools-heading"]}>Aliran Kelulusan</div>
        {(
          <SideCard
            type={SideCardType.Context}
            classNameStyle={styles["timeline-card"]}
          />
        )}
        <SideCard
          type={SideCardType.NeedApproval}
          classNameStyle={styles["timeline-card"]}
        />
        { (
          <SideCard
            type={SideCardType.Rejected}
            classNameStyle={styles["timeline-card"]}
          />
        )}
      </div>

      <div className={styles["bottom"]}>
        <div className={styles["logout"]} onClick={handleLogout}>
          {t("sidebar.logout")}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
