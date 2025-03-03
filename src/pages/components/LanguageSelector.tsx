import React from "react";
import styles from "./LanguageSelector.module.css";

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
        {languages.map((lang) => (
          <div key={lang} className={styles["language-indicator"]}>
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;