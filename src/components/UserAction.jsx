import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon, message, Tooltip } from 'antd';
import * as api from 'apis/user';
import { setUserInfo, clearUserInfo } from 'actions/user';
import { HOME_PATH } from '@/constant';

const { Item: MenuItem } = Menu;

const iconStyle = {
  color: '#1890ff',
};

function UserAction(props) {
  const { loginUser, setUserInfo, clearUserInfo, history } = props;

  if (!loginUser) return null;

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

  function toMyBookPage() {
    history.push('/my_book');
  }

  async function refreshLoginUserInfo(e) {
    try {
      e.stopPropagation();
      const userInfo = await api.checkLogin();
      setUserInfo(userInfo);
      message.success('已刷新图书币余额');
    } catch (error) {
      console.error(error);
    }
  }

  const menu = (
    <Menu>
      <MenuItem onClick={toUserInfoPage}>
        <Icon type="idcard" style={iconStyle} />
        我的信息
      </MenuItem>
      <MenuItem onClick={toMyBookPage}>
        <Icon type="book" style={iconStyle} />
        我的图书
      </MenuItem>
      <MenuItem onClickCapture={refreshLoginUserInfo}>
        <Tooltip
          title="点击可刷新图书币余额"
          placement="left"
        >
          <Icon type="pay-circle" style={{ marginRight: 8, ...iconStyle }} />
          图书币余额：{loginUser.coinNumber}
        </Tooltip>
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
    state => ({ loginUser: state.user }),
    dispatch => ({
      setUserInfo: bindActionCreators(setUserInfo, dispatch),
      clearUserInfo: bindActionCreators(clearUserInfo, dispatch),
    })
  ),
  withRouter,
)(UserAction);
