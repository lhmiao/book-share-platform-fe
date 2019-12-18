import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import Info from './components/Info';
import ModifyPassword from './components/ModifyPassword';

const { TabPane } = Tabs;

function User(props) {
  const { userInfo } = props;

  return (
    <Tabs>
      <TabPane tab="个人信息" key="userInfo">
        <Info userInfo={userInfo} />
      </TabPane>
      <TabPane tab="修改密码" key="modifyPassword">
          <ModifyPassword />
        </TabPane>
    </Tabs>
  );

}

export default connect(state => ({ userInfo: state.user }))(User);

