import Menu from '@assets/logo/menu.svg';
import { Button } from '@windmill/react-ui';
import clsx from 'clsx';
import { useRef } from 'react';
import { FaHatWizard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DarkModeToggleButton from '../DarkModeButton/DarkModeToggleButton';
import NavigationBar from '../NavigationBar/NavigationBar';
import NavigationBarItem from '../NavigationBar/NavigationBarItem';

const Header = (): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => navRef.current?.classList.add('hidden');
  const toggleMenu = () => navRef.current?.classList.toggle('hidden');

  return (
    <header
      role="banner"
      className={clsx(
        'flex flex-wrap items-center px-6 lg:px-16 py-4 lg:py-0',
        'bg-white dark:bg-black',
      )}
    >
      <div id="logo" className="flex flex-1 items-center">
        <Link to="/" className="flex items-center">
          <FaHatWizard size="32" />
          <p className="px-2 font-sans text-2xl">Nameless</p>
        </Link>
      </div>

      <Button
        icon={() => <Menu />}
        size="small"
        layout="link"
        aria-label="Menu"
        className="lg:hidden"
        onClick={toggleMenu}
      />
      <NavigationBar ref={navRef}>
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
      </NavigationBar>
    </header>
  );
};

export default Header;
