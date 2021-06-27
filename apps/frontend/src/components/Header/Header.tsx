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
      <div id="logo" className="flex flex-1 items-center">
        <Link to="/" className="flex items-center">
          <FaHatWizard size="32" />
          <h1 className="px-2 font-sans text-2xl">Nameless</h1>
        </Link>
      </div>
      <NavigationBar />
    </header>
  );
};

export default Header;
