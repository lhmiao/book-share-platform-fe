import React, { useState, Fragment } from 'react';
import { Modal, Button, Input, message } from 'antd';
import * as api from 'apis/user';

export default function Login(props) {
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('连惠淼');
  const [studentId, setStudentId] = useState('2016220502006');

  function afterClose() {
    setName('连惠淼');
    setStudentId('2016220502006');
  }

  async function login() {
    try {
      const params = { name, student_id: studentId };
      await api.login(params);
      message.success('登录成功');
      setVisible(false);
      setIsLogin(true);
    } catch(error) {
      console.error(error);
    }
  }

  async function logout() {
    try {
      await api.logout();
      message.success('退出登录成功');
      setIsLogin(false);
    } catch(error) {
      console.error(error);
    }
  }

  async function getSessionInfo() {
    try {
      await api.getSessionInfo();
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      {isLogin
        ? (
          <Fragment>
            <Button
              type="primary"
              ghost
              onClick={getSessionInfo}
            >查看session</Button>
            <Button
              style={{ marginLeft: 8 }}
              ghost
              onClick={logout}
            >退出登录</Button>
          </Fragment>
        )
        : (
          <Button
            type="primary"
            ghost
            onClick={() => setVisible(true)}
          >登录</Button>
        )}
      <Modal
        title="登录"
        onOk={login}
        visible={visible}
        onCancel={() => setVisible(false)}
        afterClose={afterClose}
      >
        <Input
          value={name}
          placeholder="姓名"
          onChange={e => setName(e.target.value)}
        />
        <Input
          value={studentId}
          placeholder="学号"
          onChange={e => setStudentId(e.target.value)}
          style={{ marginTop: 20 }}
        />
      </Modal>
    </Fragment>
  );
}