import clsx from 'clsx';

const Footer: React.FC = () => {
  return (
    <footer
      className={clsx(
        'relative w-full h-32 mt-24 p-4',
        'flex justify-center items-center',
        'text-center bg-gray-300 dark:bg-gray-700',
      )}
    >
      <p>Copyrights Reserved &copy; 2021</p>
    </footer>
  );
};

export default Footer;
