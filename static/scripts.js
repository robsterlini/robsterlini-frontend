function setFontsLoaded() {
  document.documentElement.className += " fonts-loaded";
}

function getFontFace(name, weight) {
  const source = `url('./fonts/${name}-${weight}.woff2') format('woff2')`;
  return new FontFace(name, source, { weight: weight });
}

function initFonts() {
  if (!("fonts" in document)) {
    setFontsLoaded();
    return;
  }

  Promise.all([
    getFontFace("body", 400).load(),
    getFontFace("body", 600).load(),
    getFontFace("heading", 600).load(),
    getFontFace("heading-sc", 600).load(),
  ])
    .then(function (loadedFonts) {
      // Render them at the same time
      loadedFonts.forEach(function (font) {
        document.fonts.add(font);
      });

      setFontsLoaded();
    })
    .catch(function () {
      setFontsLoaded();
    });
}

const THEME_LOCAL_KEY = "rs-theme-selector-v5";
const THEMES = ["mind", "dark", "light", "rs"];
// These are both set to Mind while I'm fundraising
const DEFAULT_DARK_THEME = "mind";
const DEFAULT_LIGHT_THEME = "mind";

const HEADING_MAP = {
  mind: "mind",
  rs: "rs",
};

const favicon = document.getElementById("favicon");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_LOCAL_KEY, theme);
  favicon.setAttribute("href", `./favicon-${theme}.svg`);

  const currentHeading =
    document.querySelector("[data-heading][aria-hidden='false']") || document.querySelector("[data-heading='default']");
  if (currentHeading) {
    currentHeading.setAttribute("aria-hidden", "true");
  }

  const headingId = HEADING_MAP[theme] || "default";
  const newHeading = document.querySelector("[data-heading='" + headingId + "']");
  if (newHeading) {
    newHeading.setAttribute("aria-hidden", "false");
  }

  if (theme === "rs") {
    Promise.all([getFontFace("gielinor", 600).load()]).then(function (loadedFonts) {
      loadedFonts.forEach(function (font) {
        document.fonts.add(font);
      });
    });
  }
}

function getLocalTheme() {
  const localTheme = localStorage.getItem(THEME_LOCAL_KEY);
  return THEMES.includes(localTheme) ? localTheme : null;
}

function switchTheme() {
  const currentTheme = getLocalTheme();
  const index = THEMES.indexOf(currentTheme);
  const nextIndex = index + 1 === THEMES.length ? 0 : index + 1;
  const nextTheme = THEMES[nextIndex];
  setTheme(nextTheme);
}

const LIGHT_PATH =
  "M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z";

const DARK_PATH =
  "M405.8 373.8c-1.4 0-2.8.3-4.3.9-23.2 10.5-47.3 15.4-70.8 15.4-75.9 0-146.6-50.8-166-129.3-14.6-59.2 4-121.4 48.7-163.3 6.7-6.3 2.1-17.5-7-17.5h-.6c-13.3.8-26.6 2.7-39.5 5.8C49.4 114.1-22.3 231 6.3 347c24.3 98.7 113.4 165 211.6 165 17.1 0 34.5-2 51.8-6.2C335 490 387.4 446.1 415 388.3c3.4-7.1-2.3-14.5-9.2-14.5zm-147.4 85.3c-13.3 3.2-27 4.9-40.5 4.9-78.5 0-146.4-52.8-165-128.5-10.7-43.3-3.8-88.2 19.4-126.4 12.7-20.9 29.4-38.4 49.1-51.8-11.3 36.8-12.8 76.5-3.3 115 22.4 91 99.8 156.3 192.1 164.8-15.7 10.1-33.1 17.5-51.8 22zm200.3-277.8L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208l-53.3-26.7zM304 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32z";

const RS_PATH =
  "M507.31 462.06L448 402.75l31.64-59.03c3.33-6.22 2.2-13.88-2.79-18.87l-17.54-17.53c-6.25-6.25-16.38-6.25-22.63 0L420 324 112 16 18.27.16C8.27-1.27-1.42 7.17.17 18.26l15.84 93.73 308 308-16.69 16.69c-6.25 6.25-6.25 16.38 0 22.62l17.53 17.54a16 16 0 0 0 18.87 2.79L402.75 448l59.31 59.31c6.25 6.25 16.38 6.25 22.63 0l22.62-22.62c6.25-6.25 6.25-16.38 0-22.63zm-149.36-76.01L60.78 88.89l-5.72-33.83 33.84 5.72 297.17 297.16-28.12 28.11zm65.17-325.27l33.83-5.72-5.72 33.84L340.7 199.43l33.94 33.94L496.01 112l15.84-93.73c1.43-10-7.01-19.69-18.1-18.1l-93.73 15.84-121.38 121.36 33.94 33.94L423.12 60.78zM199.45 340.69l-45.38 45.38-28.12-28.12 45.38-45.38-33.94-33.94-45.38 45.38-16.69-16.69c-6.25-6.25-16.38-6.25-22.62 0l-17.54 17.53a16 16 0 0 0-2.79 18.87L64 402.75 4.69 462.06c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L109.25 448l59.03 31.64c6.22 3.33 13.88 2.2 18.87-2.79l17.53-17.54c6.25-6.25 6.25-16.38 0-22.63L188 420l45.38-45.38-33.93-33.93z";

const MIND_PATH =
  "M165.3 15.34s-138.98 179.52-64 178.74c55.88-.58 31.42-174.6-44.52-170.5-21.06 1.14-39.4 27.91 4.27 49.02 29.04 14.03 121.5 32.67 128.44 72.72 7.5 43.3-182.5-62.78-174.82-12.47 6.56 42.87 165.95 7.92 178.7-40.19";

function initTheme() {
  const themeSelector = document.getElementById("theme-selector");

  themeSelector.innerHTML = `
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
      <path class="theme-selector__path--light" d="${LIGHT_PATH}" />
    </svg>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path class="theme-selector__path--dark" d="${DARK_PATH}" />
      <path class="theme-selector__path--rs" d="${RS_PATH}" />
    </svg>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211 210">
      <path class="theme-selector__path--mind" d="${MIND_PATH}" stroke-width="20" />
    </svg>
  `;

  themeSelector.setAttribute("aria-label", "Switch theme");
  themeSelector.setAttribute("title", "Switch theme");

  themeSelector.addEventListener("click", switchTheme);

  const localTheme = getLocalTheme();

  if (localTheme) {
    setTheme(localTheme);
    return;
  }

  if (!window.matchMedia) {
    setTheme("light");
    return;
  }

  const colorSchemeMatch = window.matchMedia("(prefers-color-scheme: dark)");
  setTheme(colorSchemeMatch.matches ? DEFAULT_LIGHT_THEME : DEFAULT_LIGHT_THEME);
}

(function () {
  initTheme();
  initFonts();
})();
