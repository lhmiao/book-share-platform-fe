import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './Home';

const Container = styled.div`
  width: 200px;
  margin: 100px auto;
`;

export default class BaseLayout extends PureComponent {
  render() {
    return (
      <Container>
        <Switch>
          <Redirect
            exact
            from="/"
            to="/home"
          />
          <Route path="/home" exact>
            <Home />
          </Route>
        </Switch>
      </Container>
    );
  }
}