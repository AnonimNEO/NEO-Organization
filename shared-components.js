function setCookie(name, value, days = 3650) {
    document.cookie = `${name}=${value};max-age=${days*24*60*60};path=/`;
}

function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1] || null;
}

function loadSettings() {
    return {
        theme: getCookie("theme") || "light",
        fontSize: parseInt(getCookie("fontSize") || "18"),
        fontFamily: getCookie("fontFamily") || "NimbusMonoPS",
        autoScale: getCookie("autoScale") !== "false"
    };
}

function saveSettings(settings) {
    setCookie("theme", settings.theme);
    setCookie("fontSize", settings.fontSize);
    setCookie("fontFamily", settings.fontFamily);
    setCookie("autoScale", settings.autoScale);
}

function calculateAutoFontSize() {
    return Math.max(18, Math.min(72, Math.floor(window.innerWidth / 85)));
}

function applySettings(settings) {
    const fontSize = settings.autoScale ? calculateAutoFontSize() : settings.fontSize;
    document.documentElement.style.setProperty("--font-size", fontSize + "px");
    document.body.className = settings.theme + "-theme";
    document.body.style.fontFamily = `"${settings.fontFamily}", serif`;
    document.getElementById("font-size-value").textContent = fontSize;
    document.getElementById("font-size-slider").value = fontSize;
}

function loadNavbar(logoPath, indexPath) {
    const settings = loadSettings();

    document.getElementById("navbar-container").innerHTML = `
        <nav class="navbar">
            <a href="${indexPath}" class="navbar-left">
                <div class="logo"><img src="${logoPath}" alt="NEO Logo"></div>
                <div class="org-name">NEO Organization</div>
            </a>
            <div class="navbar-right">
                <div class="settings-menu">
                    <button class="settings-btn" onclick="toggleSettings()">⚙️ Настройки</button>
                    <div class="settings-dropdown" id="settings-dropdown">
                        <div class="setting-item">
                            <label>Тема:</label>
                            <select id="theme-select" onchange="changeSetting('theme', this.value)">
                                <option value="light">☀️ Светлая</option>
                                <option value="dark">🌙 Тёмная</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>Размер шрифта: <span id="font-size-value">${settings.autoScale ? calculateAutoFontSize() : settings.fontSize}</span>px</label>
                            <input type="range" id="font-size-slider" min="12" max="72" value="${settings.autoScale ? calculateAutoFontSize() : settings.fontSize}" onchange="changeSetting('fontSize', this.value)" ${settings.autoScale ? "disabled" : ""}>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="auto-scale-checkbox" ${settings.autoScale ? "checked" : ""} onchange="changeSetting('autoScale', this.checked)">
                                Авто масштаб
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>Шрифт:</label>
                            <select id="font-family-select" onchange="changeSetting('fontFamily', this.value)">
                                <option value="NimbusMonoPS">NimbusMonoPS</option>
                                <option value="Arial">Arial</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;

    document.getElementById("theme-select").value = settings.theme;
    document.getElementById("font-family-select").value = settings.fontFamily;
    applySettings(settings);
}

function toggleSettings() {
    document.getElementById("settings-dropdown").classList.toggle("active");
}

function changeSetting(type, value) {
    const settings = loadSettings();

    if (type === "fontSize") {
        settings.fontSize = parseInt(value);
    } else if (type === "theme") {
        settings.theme = value;
    } else if (type === "fontFamily") {
        settings.fontFamily = value;
    } else if (type === "autoScale") {
        settings.autoScale = value;
        document.getElementById("font-size-slider").disabled = value;
    }

    saveSettings(settings);
    applySettings(settings);
}

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const settings = loadSettings();
        if (settings.autoScale) applySettings(settings);
    }, 250);
});

document.getElementById("footer-container").innerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <div class="copyleft">Copyleft NEO Organization 🄯 2022 - 2026 (NEON Life, Mini Life и operawifi.mini.net.win - являются неактуальными названиями.)</div>
            <div class="social-links">
                <a href="https://github.com/AnonimNEO" title="GitHub" target="_blank">🄯</a>
                <a href="https://t.me/Links_NEO_Organization" title="Telegram" target="_blank">TG️</a>
                <a href="https://www.youtube.com/channel/UCZvOEU_IDRsfK5j-JoNAVWg" title="Youtube Departament K" target="_blank">Y</a>
                <a href="mailto:neo.organization.official@gmail.com" title="Email">📧</a>
            </div>
        </div>
    </footer>
`;

// Закрытие меню при клике вне его
document.addEventListener("click", (e) => {
    const menu = document.getElementById("settings-dropdown");
    if (!e.target.closest(".settings-menu")) {
        menu?.classList.remove("active");
    }
});