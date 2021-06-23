import { Shell } from '@components';
import { getDarkModeState } from '@components/DarkModeButton/DarkModeToggleButton';
import theme from '@utils/theme';
import { Windmill } from '@windmill/react-ui';
import { BrowserRouter } from 'react-router-dom';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import Routes from './routes/routes';

import './assets/main.css';

const App: React.FC = () => {
  return (
    <StyleSheetManager disableVendorPrefixes>
      <ThemeProvider theme={theme}>
        <Windmill dark={getDarkModeState()}>
          <BrowserRouter>
            <Shell>
              <Routes />
            </Shell>
          </BrowserRouter>
        </Windmill>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
