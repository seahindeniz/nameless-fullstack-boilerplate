import { Link } from 'react-router-dom';
import clsx from 'clsx';

type PropsType = {
  to: string;
};

const NavigationBarItem: React.FC<
  PropsType & React.DOMAttributes<HTMLAnchorElement>
> = ({ to, ...props }) => {
  return (
    <li>
      <Link
        to={to}
        className={clsx(
          'lg:p-4 py-3 px-0 block',
          'border-b-2 border-transparent hover:border-indigo-400',
        )}
        {...props}
      />
    </li>
  );
};

export default NavigationBarItem;
