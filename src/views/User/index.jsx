import React, { Fragment } from 'react';
import { Tabs, PageHeader } from 'antd';
import UserInfo from './components/UserInfo';
import ModifyPassword from './components/ModifyPassword';

const { TabPane } = Tabs;

export default function User(props) {
  const { history } = props;

  return (
    <Fragment>
      <PageHeader
        title="我的信息"
        onBack={() => history.goBack()}
        style={{ padding: 0, marginBottom: 10 }}
      />
      <Tabs>
        <TabPane tab="个人信息" key="userInfo">
          <UserInfo />
        </TabPane>
        <TabPane tab="修改密码" key="modifyPassword">
            <ModifyPassword />
          </TabPane>
      </Tabs>
    </Fragment>
  );

}
