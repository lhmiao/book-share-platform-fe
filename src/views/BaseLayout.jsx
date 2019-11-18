import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import styled from '@emotion/styled';
import Header from 'components/Header';
import Home from './Home';

const { Content } = Layout;

const Container = styled.div`
  min-height: calc( 100vh - 124px );
  padding: 24px;
  background: #fff;
`;

export default class BaseLayout extends PureComponent {
  render() {
    return (
      <Layout>
        <Header />
        <Content style={{ padding: 30 }}>
          <Container>
            <Switch>
              <Redirect
                exact
                from="/"
                to="/home"
              />
              <Route
                path="/home"
                exact
                component={Home}
              />
          </Switch>
          </Container>
        </Content>
      </Layout>
    );
  }
}