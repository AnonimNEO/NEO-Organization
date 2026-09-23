// Cookie функции
function setCookie(name, value, days = 3650) {
    document.cookie = `${name}=${value};max-age=${days*24*60*60};path=/`;
}

function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1] || null;
}

// Переключение темы
function setTheme(theme) {
    const body = document.body;
    document.getElementById("light-theme-btn")?.classList.toggle("active", theme === "light");
    document.getElementById("dark-theme-btn")?.classList.toggle("active", theme === "dark");
    body.className = theme + "-theme";
    setCookie("theme", theme, 365);
}

// Загрузка навигации
function loadNavbar(logoPath, indexPath) {
    document.getElementById("navbar-container").innerHTML = `
        <nav class="navbar">
            <a href="${indexPath}" class="navbar-left">
                <div class="logo"><img src="${logoPath}" alt="NEO Organization Logo"></div>
                <div class="org-name">NEO Organization</div>
            </a>
            <div class="navbar-right">
                <div class="theme-toggle">
                    <span>Тема:</span>
                    <button class="theme-btn active" id="light-theme-btn" onclick="setTheme('light')">☀️</button>
                    <button class="theme-btn" id="dark-theme-btn" onclick="setTheme('dark')">🌙</button>
                </div>
            </div>
        </nav>
    `;
    setTheme(getCookie("theme") || "light");
}

// Нижний колонтитул
document.getElementById("footer-container").innerHTML = `
    <footer class="footer">
        <div class="footer-content">
        <div class="copyleft">Copyleft NEO Organization 🄯 2022 - 2026 (NEON Life, Mini Life и operawifi.mini.net.win - являются неактуальными названиями.)</div>
            <div class="social-links">
                <a href="https://github.com/AnonimNEO" title="GitHub" target="_blank">🄯</a>
                <a href="https://t.me/Links_NEO_Organization" title="Telegram" target="_blank">TG️</a>
                <a href="https://www.youtube.com/channel/UCZvOEU_IDRsfK5j-JoNAVWg" title="Youtube Departament K" target="_blank">Y</a>
                <a href="mailto:operawifi.mini.net.win.2000@gmail.com" title="Email">📧</a>
            </div>
        </div>
    </footer>
`;