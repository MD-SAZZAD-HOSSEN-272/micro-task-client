import { use, useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

   useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])

 

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default DarkMode;
