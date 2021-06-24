import Menu from '@assets/logo/menu.svg';
import { Button } from '@windmill/react-ui';
import clsx from 'clsx';
import { useRef } from 'react';
import DarkModeToggleButton from '../DarkModeButton/DarkModeToggleButton';
import NavigationBarItem from './NavigationBarItem';

const NavigationBar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => navRef.current?.classList.add('hidden');
  const toggleMenu = () => navRef.current?.classList.toggle('hidden');

  return (
    <>
      <Button
        icon={() => <Menu />}
        size="small"
        layout="link"
        aria-label="Menu"
        className="lg:hidden"
        onClick={toggleMenu}
      />

      <nav
        role="navigation"
        ref={navRef}
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
      >
        <ul
          className={clsx(
            'lg:flex items-center justify-between pt-4 lg:pt-0',
            // 'text-base',
          )}
        >
          <NavigationBarItem to="/" onClick={closeMenu}>
            Home
          </NavigationBarItem>
          <NavigationBarItem to="/about" onClick={closeMenu}>
            About
          </NavigationBarItem>
          <NavigationBarItem to="/what" onClick={closeMenu}>
            404
          </NavigationBarItem>
          <li className="lg:px-4 py-2">
            <DarkModeToggleButton />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
