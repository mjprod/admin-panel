import React from "react";
import styles from "./LanguageSelector.module.css";
import LanguageList from "../../components/language/LanguageList";

interface LanguageProps {
  showTitle?: boolean;
}

const LanguageSelector: React.FC<LanguageProps> = ({
  showTitle = true,
}) => {
  const languages = ["MY", "CN", "TW", "EN"];

  return (
    <div className={styles["language-selector"]}>
      {showTitle && <p>Language</p>}
      <div className={styles["language-badge-container"]}>
        <LanguageList languages={languages}/>
      </div>
    </div>
  );
};

export default LanguageSelector;