import React from 'react';
import { Tabs } from 'antd';
import UserInfo from './components/UserInfo';
import ModifyPassword from './components/ModifyPassword';

const { TabPane } = Tabs;

export default function User(props) {
  return (
    <Tabs>
      <TabPane tab="个人信息" key="userInfo">
        <UserInfo />
      </TabPane>
      <TabPane tab="修改密码" key="modifyPassword">
          <ModifyPassword />
        </TabPane>
    </Tabs>
  );

}
