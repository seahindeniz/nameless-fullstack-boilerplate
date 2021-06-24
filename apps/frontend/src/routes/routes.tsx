import { Route, Switch } from 'react-router-dom';
import { About, Home, NoMatch } from './views';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact render={() => <Home />} />
    <Route path="/about" render={() => <About />} />
    <Route path="*" render={() => <NoMatch />} />
  </Switch>
);

export default Routes;
