import React, { useContext } from "react";
import useTranslation from "../../../custom/useTranslation/useTranslation";
import { TranslateContext } from "../../../services/translationContext/translation.context";

const ToggleLanguageButton = () => {
  const { language, changeLanguageHandler } = useContext(TranslateContext);
  const translate = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    changeLanguageHandler(newLanguage);
  };

  return (
    <button className="btn btn-violet me-3" onClick={toggleLanguage}>
      {language === "es" ? translate("Es") : translate("En")}
    </button>
  );
};

export default ToggleLanguageButton;
