// Определяем путь к корню в зависимости от глубины папки
function getRootPath() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/").filter(part => part !== "" && part !== "index.html");

    // Если файл в корне (например, /index.html или /), возвращаем ./
    if (pathParts.length === 0) {
        return "./";
    }

    // Если файл в подпапке, считаем кол-во уровней вверх
    let depth = pathParts.length - 1;
    return depth > 0 ? "../".repeat(depth) : "./";
}

const rootPath = getRootPath();

// Функция для перехода на главную
function goToHome() {
    window.location.href = rootPath + "index.html";
}

// Загружаем навигацию
document.getElementById("navbar-container").innerHTML = `
    <nav class="navbar">
        <a href="javascript:void(0);" onclick="goToHome()" class="navbar-left">
            <div class="logo">
                <img src="Programs/Crowbar/img/NEO_Organization.jpg" alt="NEO Organization Logo">
            </div>
            <div class="org-name">NEO Organization</div>
        </a>
        <div class="navbar-right">
            <div class="theme-toggle">
                <span>Изменить тему:</span>
                <button class="theme-btn active" id="light-theme-btn" onclick="setTheme('light')">☀️ Светлая</button>
                <button class="theme-btn" id="dark-theme-btn" onclick="setTheme('dark')">🌙 Тёмная</button>
            </div>
        </div>
    </nav>
`;

// Загружаем футер
document.getElementById("footer-container").innerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <div class="copyleft">
                Copyleft NEO Organization 🄯 2022 - 2026 (NEON Life, Mini Life и operawifi.mini.net.win - являются неактуальными названиями.)
            </div>
            <div class="social-links">
                <a href="https://github.com/AnonimNEO" title="GitHub" target="_blank">🄯</a>
                <a href="https://t.me/Links_NEO_Organization" title="Telegram" target="_blank">TG️</a>
                <a href="https://www.youtube.com/channel/UCZvOEU_IDRsfK5j-JoNAVWg" title="Youtube Departament K" target="_blank">Y</a>
                <a href="mailto:operawifi.mini.net.win.2000@gmail.com" title="Email">📧</a>
            </div>
        </div>
    </footer>
`;

// Функция для переключения темы
function setTheme(theme) {
    const body = document.body;
    const lightBtn = document.getElementById("light-theme-btn");
    const darkBtn = document.getElementById("dark-theme-btn");

    if (theme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        lightBtn.classList.add("active");
        darkBtn.classList.remove("active");
    } else if (theme === "dark") {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkBtn.classList.add("active");
        lightBtn.classList.remove("active");
    }

    localStorage.setItem("theme", theme);
}

// Проверка сохранённой темы при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});
