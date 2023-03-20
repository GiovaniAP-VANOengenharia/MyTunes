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
  <div>
    <Provider>
      <AppContainer>
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
      </AppContainer>
    </Provider>
  </div>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

export default App;
