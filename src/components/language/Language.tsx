import React from "react";
import style from "./Language.module.css";
import clsx from "clsx";

export interface LanguageProps {
  id?: number;
  lang: string;
  langLabel?: string;
  isSolid?: boolean;
  isCompleted?: boolean;
  status?: string;
  showLangLabel?: boolean;
}

const Language: React.FC<LanguageProps> = ({
  lang,
  langLabel,
  isSolid = false,
  isCompleted = false,
  showLangLabel = false
}) => {
  return (
    <div className={style["language-container"]}>
      <div
        className={clsx(
          style["language-indicator"],
          isSolid && style["language-indicator-solid"],
          isCompleted && style["language-indicator-complete"]
        )}
      >
        {lang}
      </div>
      {showLangLabel && `\u00A0${langLabel}`}
    </div>
  );
};

export default Language;
