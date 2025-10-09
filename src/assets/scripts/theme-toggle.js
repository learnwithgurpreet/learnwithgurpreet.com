const storageKey = 'theme-preference';
const lightLabel = '{{ meta.themeSwitch.light }}';
const darkLabel = '{{ meta.themeSwitch.dark }}';

const theme = {
  value: getColorPreference()
};

window.onload = () => {
  const themeToggle = document.querySelector('#theme-toggle');

  if (!themeToggle) {
    return;
  }

  reflectPreference();

  themeToggle.addEventListener('click', () => onClick(theme.value));
  themeToggle.querySelector('span').innerText =
    theme.value === 'light' ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', theme.value === 'dark');
};

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches: isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });

function onClick(themeValue) {
  theme.value = themeValue === 'light' ? 'dark' : 'light';
  document
    .querySelector('#theme-toggle')
    .setAttribute('aria-pressed', themeValue === 'light');
  document.querySelector('#theme-toggle > span').innerText =
    theme.value === 'light' ? 'dark' : 'light';
  setPreference();
}

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', theme.value);
}

// set early so no page flashes / CSS is made aware
reflectPreference();
