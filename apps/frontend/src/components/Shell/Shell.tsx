import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Shell: React.FC = ({ children }) => (
  <div className="bg-gray-200 dark:bg-gray-800 dark:text-white">
    <Header />
    <main role="main" className="min-h-screen mt-4">
      {children}
    </main>
    <Footer />
  </div>
);

export default Shell;
