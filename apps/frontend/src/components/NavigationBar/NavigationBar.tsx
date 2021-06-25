const NavigationBar: React.FC<React.ComponentPropsWithRef<'nav'>> = ({
  children,
  ...props
}) => {
  return (
    <nav
      role="navigation"
      className="hidden lg:flex lg:items-center lg:w-auto w-full"
      {...props}
    >
      <ul className="lg:flex items-center justify-between pt-4 lg:pt-0">
        {children}
      </ul>
    </nav>
  );
};

export default NavigationBar;
