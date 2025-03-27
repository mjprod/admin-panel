import React, { useContext, useEffect } from "react";
import styles from "./Sidebar.module.css";
import QuestionTools from "./questionTools/QuestionTools";
import SideCard from "./sideCard/SideCard";
import CreateNewButton from "./createNewButton/CreateNewButton";
import { SideCardType } from "../../../../util/QuestionStatus";
import { useConversationsContext } from "../../../../context/ConversationProvider";
import { AuthContext } from "../../../../context/AuthContext";
import LanguageList from "../../../../components/language/LanguageList";
import {
  Language,
  LanguageCode,
} from "../../../../api/responsePayload/KnowledgeResponse";
import { useTranslation } from "react-i18next";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const {
    totalKnowledgeCount,
    language,
    setLanguage,
    categoriesFilter,
    filterByCategory,
  } = useConversationsContext();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const selectedLanguage = Object.values(Language).find(
      (lang) => lang.id === user?.language_preference
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage)
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
  };

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  const { t } = useTranslation();

  return (
    <aside className={styles["sidebar"]}>
      <QuestionTools
        total={totalKnowledgeCount}
        categories={categoriesFilter}
        onCategoryClick={filterByCategory}
      />

      <div className={styles["list-container"]}>
        <div className={styles["tools-heading"]}>Cipta/Edit</div>
        { user?.is_superuser && <CreateNewButton /> }
        {/* <SideCard type={SideCardType.Core} classNameStyle={styles["timeline-card"]}/> */}
        <div className={styles["tools-heading"]}>Aliran Kelulusan</div>
        { user?.is_superuser && <SideCard
          type={SideCardType.MaxPanel}
          classNameStyle={styles["timeline-card"]}
        /> }
        <SideCard
          type={SideCardType.NeedApproval}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          type={SideCardType.PreApproved}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          type={SideCardType.Rejected}
          classNameStyle={styles["timeline-card"]}
        />
      </div>

      <div className={styles["bottom"]}>
        <div className={styles["logout"]} onClick={handleLogout}>
          {t("sidebar.logout")}
        </div>
        <LanguageList
          languages={[
            {
              lang: Language.MALAYSIAN,
              isCompleted: language == Language.MALAYSIAN,
            },
            {
              lang: Language.ENGLISH,
              isCompleted: language == Language.ENGLISH,
            },
            {
              lang: Language.CHINESE,
              isCompleted: language == Language.CHINESE,
            },
          ]}
          showTitle={true}
          onLanguageSelected={handleLanguageSelect}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
