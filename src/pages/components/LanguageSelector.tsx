import React from "react";

interface LanguageProps {
  showTitle?: boolean;
}

const LanguageSelector: React.FC<LanguageProps> = ({
  showTitle = true,
}) => {
  const languages = ["MY", "CN", "TW", "EN"];

  return (
    <div className="language-selector">
      {showTitle && <p>Language</p>}
      <div className="language-badge-container">
        {languages.map((lang) => (
          <div key={lang} className="language-indicator">
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;