import { Router as WouterRouter, Route, Switch } from 'wouter';
import Store from '@/components/Store';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import Orders from '@/components/Orders';

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={Store} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/orders" component={Orders} />
        <Route>
          <Store />
        </Route>
      </Switch>
    </WouterRouter>
  );
}

export default App;
