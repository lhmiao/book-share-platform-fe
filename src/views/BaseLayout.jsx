import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo } from 'actions/user';
import Header from 'components/Header';
import * as userApi from 'apis/user';
import User from './User';

const { Content } = Layout;

const Container = styled.div`
  min-height: calc( 100vh - 124px );
  padding: 24px;
  background: #fff;
`;

const viewCenterClass = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

@connect(
  null,
  dispatch => ({ setUserInfo: bindActionCreators(setUserInfo, dispatch) }),
)
export default class BaseLayout extends PureComponent {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.checkLogin();
  }

  async checkLogin() {
    try {
      const { setUserInfo } = this.props;
      const userInfo = await userApi.checkLogin();
      setUserInfo(userInfo);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) return (
      <Spin
        size="large"
        tip="正在加载数据"
        className={viewCenterClass}
      />
    );

    return (
      <Layout>
        <Header />
        <Content style={{ padding: 30 }}>
          <Container>
            <Switch>
              <Route
                exact
                path="/user"
                component={User}
              />
            </Switch>
          </Container>
        </Content>
      </Layout>
    );
  }
}