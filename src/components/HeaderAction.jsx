import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Login from 'components/Login';
import UserAction from 'components/UserAction';

function HeaderAction(props) {
  const { loginUser } = props;

  return (
    <div style={{ float: 'right' }}>
      {loginUser
        ? <UserAction />
        : (
          <Login>
            <Button
              ghost
              type="link"
            >登录</Button>
          </Login>
        )}
    </div>
  );
}

export default connect(state => ({ loginUser: state.user }))(HeaderAction);
