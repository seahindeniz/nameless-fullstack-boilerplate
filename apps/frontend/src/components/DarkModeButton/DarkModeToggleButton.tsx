import { isColorSchemeDark, storage } from '@utils';
import { Button } from '@windmill/react-ui';
import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { TiAdjustBrightness } from 'react-icons/ti';

function getStoredDarkModeState() {
  return storage<boolean>('darkMode');
}

function storeDarkModeState(darkModeState: boolean) {
  return storage('darkMode', darkModeState);
}

export function getDarkModeState(): boolean {
  const storedDarkModeState = getStoredDarkModeState();

  if (storedDarkModeState === null) return isColorSchemeDark();

  return storedDarkModeState;
}

const toggleMethods: ('add' | 'remove')[] = ['add', 'remove'];

function changeMode(darkModeState: boolean) {
  let [method1, method2] = toggleMethods;

  if (!darkModeState) [method2, method1] = toggleMethods;

  document.documentElement.classList[method1]('dark');
  document.documentElement.classList[method2]('light');
}

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

  useEffect(() => changeMode(darkModeState), [darkModeState]);

  return (
    <Button
      layout="link"
      size="large"
      icon={() =>
        darkModeState ? (
          <TiAdjustBrightness
            size={24}
            className="fill-current text-yellow-400"
          />
        ) : (
          <FaMoon size={24} />
        )
      }
      onClick={handleToggleClick}
    />
  );
};

export default DarkModeToggleButton;
