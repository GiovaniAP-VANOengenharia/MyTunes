import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import Provider from './Context/MyProvider';

const App = () => {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/loading" component={ Loading } />
          <Route component={ NotFound } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
