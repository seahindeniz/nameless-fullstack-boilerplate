import clsx from 'clsx';
import { FaHatWizard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';

const Header = (): JSX.Element => {
  return (
    <header
      role="banner"
      className={clsx(
        'flex flex-wrap items-center px-6 lg:px-16 py-4 lg:py-0',
        'bg-white dark:bg-black',
      )}
    >
      <div id="logo" className="flex-1 flex items-center text-2xl">
        <Link to="/" className="flex flex-1 items-center">
          <FaHatWizard size="32" />
          <p className="px-2 font-sans">Nameless</p>
        </Link>
      </div>
      <NavigationBar />
    </header>
  );
};

export default Header;
