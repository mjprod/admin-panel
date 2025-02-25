import React from "react";

const LanguageSelector = () => {
  const languages = ["MY", "CN", "TW", "EN"];

  return (
    <div className="language-selector">
      <p>Language</p>
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