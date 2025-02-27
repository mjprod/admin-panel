import React from "react";
import style from "./Language.module.css";
import clsx from "clsx";

interface LanguageProps {
  lang: string;
  isSolid?: boolean;
}

const Language: React.FC<LanguageProps> = ({ lang, isSolid = false }) => {
  return (
    <div
      className={clsx(
        style["language-indicator"],
        isSolid && style["language-indicator-solid"]
      )}
    >
      {lang}
    </div>
  );
};

export default Language;
