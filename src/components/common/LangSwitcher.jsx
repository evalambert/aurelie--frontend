import { useState } from "react";
import { navigate } from "astro:transitions/client";

const LangSwitcher = ({ currentLang, currentPath }) => {
  const [isHovered, setIsHovered] = useState(false);

  const otherLang = currentLang === "fr" ? "en" : "fr";

  const cleanPath = currentPath.replace(/^\/(fr|en)/, "");

  const handleLanguageChange = () => {
    const newPath = `/${otherLang}${cleanPath}`;
    navigate(newPath, { history: "push" });
  };

  return (
    <button
      onClick={handleLanguageChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shrink-0 w-[35px] cursor-pointer"
    >
      {isHovered ? `(${otherLang})` : `(${currentLang})`}
    </button>
  );
};

export default LangSwitcher;
