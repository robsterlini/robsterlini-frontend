const setTheme = theme => {
  const body = document.querySelector(`body`);

  body.setAttribute(`data-theme`, theme);
};

const changeTheme = theme => {
  localStorage.setItem(`rsaTheme`, theme);

  setTheme(theme);
};

export const setupTheme = () => {
  const buttons = document.querySelectorAll(`[data-theme-change]`);

  buttons.forEach(button => {
    const theme = button.getAttribute(`data-theme-change`);

    button.addEventListener(`click`, () => changeTheme(theme), false);
  });

  const persistingTheme = localStorage.getItem(`rsaTheme`)

  setTheme(persistingTheme || `default`);
};
