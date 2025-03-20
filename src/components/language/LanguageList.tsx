import React from "react";
import Language, { LanguageProps } from "./Language";
import style from "./Language.module.css";
import { LanguageCode } from "../../api/responsePayload/KnowledgeResponse";
import { useTranslation } from "react-i18next";

interface LanguageListProps {
  languages: Array<LanguageProps>;
  showTitle?: boolean;
  onLanguageSelected?: (lang: LanguageCode) => void
}

const LanguageList: React.FC<LanguageListProps> = ({
  languages,
  showTitle = false,
  onLanguageSelected
}) => {

  const {t} = useTranslation()

  return (
    <div className={style["language-selector"]}>
      {showTitle && <p>{t("languageList.Language")}</p>}
      <div className={style["language-badge-container"]}>
        {languages.map((lang, index) => (
          <Language key={index} {...lang} onLanguageSelected={onLanguageSelected}/>
        ))}
      </div>
    </div>
  );
};

export default LanguageList;
