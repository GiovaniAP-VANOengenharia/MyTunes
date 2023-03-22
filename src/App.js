import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Pages/Login';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import Search from './Pages/Search';
import NotFound from './Pages/NotFound';
import Loading from './Pages/Loading';
import Provider from './Context/MyProvider';

const App = () => (
  <AppContainer>
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
  </AppContainer>
);

const AppContainer = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1100px;
`;

export default App;
