import React from "react";
import Language from "./Language";
import style from "./Language.module.css";

interface LanguageListProps {
  languages: Array<string>;
  showTitle?: boolean;
}

const LanguageList: React.FC<LanguageListProps> = ({
  languages,
  showTitle = false,
}) => {
  return (
    <div className={style["language-selector"]}>
      {showTitle && <p>Language</p>}
      <div className={style["language-badge-container"]}>
        {languages.map((lang) => (
          <Language lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default LanguageList;
