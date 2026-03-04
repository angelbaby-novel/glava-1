async function injectPart(id, file){
  const el = document.getElementById(id);
  if(!el) return;

  const res = await fetch(file, { cache: "no-store" });
  const html = await res.text();
  el.innerHTML = html;
}

function applyChapterMeta(){
  const title = document.body.getAttribute("data-title") || "";
  const label = document.body.getAttribute("data-label") || "";

  const chapterTitle = document.getElementById("chapterTitle");
  const chapterLabel = document.getElementById("chapterLabel");

  if(chapterTitle && title) chapterTitle.textContent = title;
  if(chapterLabel && label) chapterLabel.textContent = label;
}

function applyNav(){
  const prev = document.body.getAttribute("data-prev") || "";
  const next = document.body.getAttribute("data-next") || "";

  const prevLink = document.getElementById("prevLink");
  const nextLink = document.getElementById("nextLink");

  if(prevLink){
    if(prev){
      prevLink.href = prev;
      prevLink.setAttribute("aria-disabled", "false");
    } else {
      prevLink.href = "#";
      prevLink.setAttribute("aria-disabled", "true");
    }
  }

  if(nextLink){
    if(next){
      nextLink.href = next;
      nextLink.setAttribute("aria-disabled", "false");
    } else {
      nextLink.href = "#";
      nextLink.setAttribute("aria-disabled", "true");
    }
  }
}

/* THEME (как у тебя было) */
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

function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved){
    applyTheme(saved);
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

(async function initSite(){
  initTheme();

  // подгружаем хедер/футер
  await injectPart("site-header", "header.html");
  await injectPart("site-footer", "footer.html");

  // после вставки - применяем метаданные и навигацию
  applyChapterMeta();
  applyNav();

  // обновить иконку темы после инжекта (потому что header вставился позже)
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current);
})();
