import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import QuestionTools, { CategoryProps } from "./QuestionTools";
import SideCard from "./SideCard";
import CreateNewButton from "./CreateNewButton";
import { QuestionStatus } from "../../../util/QuestionStatus";
import { useConversationsContext } from "../../../context/ConversationProvider";
import { AuthContext } from "../../../context/AuthContext";
import LanguageList from "../../../components/language/LanguageList";
import { Language, LanguageCode } from "../../../api/responsePayload/KnowledgeResponse";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  card: QuestionStatus;
  onSideCardClicked: (status: QuestionStatus) => void;
  categories: CategoryProps[];
  onCategoryClick: (category: CategoryProps) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  card,
  onSideCardClicked,
  categories,
  onCategoryClick,
}) => {
  const { totalKnowledgeCount, language, setLanguage } = useConversationsContext();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang)
  }

  const {t} = useTranslation()

  return (
    <aside className={styles["sidebar"]}>
      <QuestionTools
        total={totalKnowledgeCount}
        categories={categories}
        onCategoryClick={onCategoryClick}
      />

      <div className={styles["list-container"]}>
        <CreateNewButton />
        <SideCard
          isActive={card == QuestionStatus.NeedApproval}
          status={QuestionStatus.NeedApproval}
          onSideCardClicked={onSideCardClicked}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          isActive={card == QuestionStatus.PreApproved}
          status={QuestionStatus.PreApproved}
          onSideCardClicked={onSideCardClicked}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          isActive={card == QuestionStatus.Rejected}
          status={QuestionStatus.Rejected}
          onSideCardClicked={onSideCardClicked}
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
              isCompleted: language == Language.MALAYSIAN
            },
            {
              lang: Language.ENGLISH,
              isCompleted: language == Language.ENGLISH
            },
            {
              lang: Language.CHINESE,
              isCompleted: language == Language.CHINESE
            },
          ]}
          showTitle = {true}
          onLanguageSelected={handleLanguageSelect}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
