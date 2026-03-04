function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const icon = document.getElementById("themeIcon");
  if(icon) icon.textContent = (theme === "dark") ? "☀" : "🌙";
}

function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

(function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved){
    applyTheme(saved);
    return;
  }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
})();
