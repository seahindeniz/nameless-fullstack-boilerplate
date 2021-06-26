import Menu from '@assets/logo/menu.svg';
import { Button } from '@windmill/react-ui';
import clsx from 'clsx';
import { useState } from 'react';
import DarkModeToggleButton from '../DarkModeButton/DarkModeToggleButton';
import NavigationBarItem from './NavigationBarItem';

const NavigationBar: React.FC = ({ ...props }) => {
  const [menuInvisible, setMenuInvisibility] = useState(true);

  const closeMenu = () => setMenuInvisibility(true);
  const toggleMenu = () => setMenuInvisibility(!menuInvisible);

  const navClassnames = clsx('lg:flex lg:items-center lg:w-auto w-full', {
    hidden: menuInvisible,
  });

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
      <nav role="navigation" className={navClassnames} {...props}>
        <ul className="lg:flex items-center justify-between pt-4 lg:pt-0">
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
