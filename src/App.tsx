import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import BangumisView from './containers/bangumis';
import Login from './containers/login';
import Timeline from './containers/timeline';
import Rank from './containers/rank';
import BangumiDetail from './containers/bangumi_detail';

class App extends React.Component<{}, {}> {
    public render() : JSX.Element {
      return (
        <Provider store = {store}>
          <Router>
            <Switch>
              <Route exact path = '/login' component = { Login }/>
              <Route exact path = '/' component = { Home }/>
              <Route exact path = '/bangumi' component = { BangumisView }/>
              <Route exact path = '/timeline' component = { Timeline } />
              <Route exact path = '/rank' component = { Rank } />
              <Route exact path = '/bangumi_detail/:id' component =  { BangumiDetail } />
            </Switch>      
          </Router>
        </Provider>
      );
    }
}

export default App;
