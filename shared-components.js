// Функция для загрузки навигации с параметрами
function loadNavbar(logoPath, indexPath) {
    document.getElementById("navbar-container").innerHTML = `
        <nav class="navbar">
            <a href="${indexPath}" class="navbar-left">
                <div class="logo">
                    <img src="${logoPath}" alt="NEO Organization Logo">
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
}

// Загружаем нижний колонтитул
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