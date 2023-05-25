const themes = ["light", "dark"] as const;
type Theme = typeof themes[number];
const DEFAULT_THEME = "dark";

export const getExplicitPreference = () => localStorage.getItem("theme");
export const setExplicitPreference = (theme: Theme) => localStorage.setItem("theme", theme);
export const resetExplicitPreference = () => localStorage.removeItem("theme");


/**
 * This function applies a give theme name to the webpage
 * @param theme Can be else "dark" or "light"
 */
export function applyTheme (theme: Theme) {
  if (!themes.includes(theme)) throw `Unsupported color theme "${theme}"`;
  document.body.classList.remove("dark");
  if (theme === "dark") document.body.classList.add("dark");
}

/**
 * This function retrieves the user's preferred theme, else return the default one
 * @returns Else "dark" or "light"
 */
export function findTheme (): Theme {
  // If the user has explicitly set a preference during this visit or the previous ones
  const userPreference = getExplicitPreference();
  if (userPreference) return userPreference as Theme;

  // Else if the user's OS give a preferred color scheme
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  }

  // Else return default theme
  return DEFAULT_THEME;
}

