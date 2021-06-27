import { isColorSchemeDark, storage } from '@utils';
import { Button } from '@windmill/react-ui';
import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { TiAdjustBrightness } from 'react-icons/ti';

export const STORAGE_KEY = 'darkMode';

function getStoredDarkModeState() {
  return storage<boolean>(STORAGE_KEY);
}

function storeDarkModeState(darkModeState: boolean) {
  return storage(STORAGE_KEY, darkModeState);
}

export function getDarkModeState(): boolean {
  const storedDarkModeState = getStoredDarkModeState();

  if (storedDarkModeState === null) return isColorSchemeDark();

  return storedDarkModeState;
}

const toggleMethods: ('add' | 'remove')[] = ['add', 'remove'];

function switchDarkMode(darkModeState: boolean) {
  let [method1, method2] = toggleMethods;

  if (!darkModeState) [method2, method1] = toggleMethods;

  document.documentElement.classList[method1]('dark');
  document.documentElement.classList[method2]('light');
}

export const NightIcon = (): JSX.Element => <FaMoon size={24} />;
export const LightIcon = (): JSX.Element => (
  <TiAdjustBrightness size={24} className="fill-current text-yellow-400" />
);

const DarkModeToggleButton = (): JSX.Element => {
  const [darkModeState, setDarkModeState] = useState<boolean>(getDarkModeState);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const eventHandler = (e: MediaQueryListEvent) => {
      if (getStoredDarkModeState() !== null) return;

      setDarkModeState(e.matches);
    };

    mediaQuery.addEventListener('change', eventHandler);

    return () => mediaQuery.removeEventListener('change', eventHandler);
  }, []);

  const handleToggleClick = () => {
    const newDarkModeState = !darkModeState;

    setDarkModeState(newDarkModeState);
    storeDarkModeState(newDarkModeState);
  };

  useEffect(() => switchDarkMode(darkModeState), [darkModeState]);

  return (
    <Button
      layout="link"
      aria-label={darkModeState ? 'Light mode' : 'Dark mode'}
      icon={() => (darkModeState ? <LightIcon /> : <NightIcon />)}
      onClick={handleToggleClick}
    />
  );
};

export default DarkModeToggleButton;
