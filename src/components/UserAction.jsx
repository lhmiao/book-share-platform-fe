import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon, message } from 'antd';
import * as api from 'apis/user';
import { clearUserInfo } from 'actions/user';
import { HOME_PATH } from '@/constant';

const { Item: MenuItem } = Menu;

const iconStyle = {
  color: '#1890ff',
};

function UserAction(props) {
  const { userInfo, clearUserInfo, history } = props;

  if (!userInfo) return null;

  async function logout() {
    try {
      await api.logout();
      history.replace(HOME_PATH);
      clearUserInfo();
      message.success('当前账号已登出');
    } catch (error) {
      console.error(error);
    }
  }

  function toUserInfoPage() {
    history.push('/user');
  }

  const menu = (
    <Menu>
      <MenuItem onClick={toUserInfoPage}>
        <Icon type="idcard" style={iconStyle} />
        我的信息
      </MenuItem>
      <MenuItem>
        <Icon type="pay-circle" style={iconStyle} />
        图书币余额：{userInfo.coinNumber}
      </MenuItem>
      <MenuItem onClick={logout}>
        <Icon type="logout" style={iconStyle} />
        登出
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Avatar
        style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.2)' }}
        icon="user"
      />
    </Dropdown>
  );
}

export default compose(
  connect(
    state => ({ userInfo: state.user }),
    dispatch => ({
      clearUserInfo: bindActionCreators(clearUserInfo, dispatch),
    })
  ),
  withRouter,
)(UserAction);
