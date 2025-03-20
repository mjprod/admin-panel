import React from "react";
import style from "./Language.module.css";
import clsx from "clsx";
import { LanguageCode } from "../../api/responsePayload/KnowledgeResponse";

export interface LanguageProps {
  id?: number;
  lang: LanguageCode;
  langLabel?: string;
  isSolid?: boolean;
  isCompleted?: boolean;
  status?: string;
  showLangLabel?: boolean;
  onLanguageSelected?: (lang: LanguageCode) => void
}

const Language: React.FC<LanguageProps> = ({
  lang,
  langLabel,
  isSolid = false,
  isCompleted = false,
  showLangLabel = false,
  onLanguageSelected
}) => {
  return (
    <div className={style["language-container"]}>
      <div
        className={clsx(
          style["language-indicator"],
          isSolid && style["language-indicator-solid"],
          isCompleted && style["language-indicator-complete"]
        )}
        onClick={() => onLanguageSelected?.(lang)}
      >
        {lang.code}
      </div>
      {showLangLabel && `\u00A0${langLabel}`}
    </div>
  );
};

export default Language;
