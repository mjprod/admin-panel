import React from "react";
import Language from "./Language";
import style from "./Language.module.css";

interface LanguageListProps {
  languages: Array<string>;
}

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => {
  return (
    <div className={style["language-badge-container"]}>
      {languages.map((lang) => (
        <Language lang={lang} />
      ))}
    </div>
  );
};

export default LanguageList;
