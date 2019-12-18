import React, { PureComponent, Children, cloneElement, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, message } from 'antd';
import TextButton from 'components/TextButton';
import ModifyPasswordForm from 'components/ModifyPasswordForm';
import * as api from 'apis/user';
import { setUserInfo, clearUserInfo } from 'actions/user';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

@connect(
  state => ({ userInfo: state.user }),
  dispatch => ({
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    clearUserInfo: bindActionCreators(clearUserInfo, dispatch),
  })
)
export default class Login extends PureComponent {
  state = {
    mode: 'login',
    visible: false,
  }

  loginFormRef = createRef()

  registerFormRef = createRef()

  modifyPasswordFormRef = createRef()

  openModal = () => this.setState({ visible: true })

  closeModal = () => this.setState({ visible: false })

  onModeChange = mode => this.setState({ mode })

  getCurrentModeForm() {
    const { mode } = this.state;

    switch (mode) {
      case 'login': return this.loginFormRef.current;
      case 'register': return this.registerFormRef.current;
      case 'modifyPassword': return this.modifyPasswordFormRef.current;
      default: return null;
    }
  }

  resetForm = () => {
    const form = this.getCurrentModeForm();
    form.resetFields();
  }

  validateForm() {
    const form = this.getCurrentModeForm();
    return new Promise((resolve, reject) => {
      form.validateFields((error, value) => {
        error ? reject('表单校验不通过') : resolve(value);
      });
    });
  }

  onOk = async () => {
    try {
      const params = await this.validateForm();
      const { setUserInfo, clearUserInfo } = this.props;
      const { mode } = this.state;
      if (mode === 'login') {
        const userInfo = await api.login(params);
        setUserInfo(userInfo);
        message.success('登录成功');
        this.closeModal();
      } else if (mode === 'register') {
        const userInfo = await api.register(params);
        setUserInfo(userInfo);
        message.success('注册成功，已使用注册账号登录');
        this.closeModal();
      } else if (mode === 'modifyPassword') {
        await api.modifyPassword(params);
        clearUserInfo();
        message.success('重置密码成功');
        this.setState({ mode: 'login' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleKeyDown = e => e.key === 'Enter' && this.onOk()

  getTitle() {
    const { mode } = this.state;

    switch (mode) {
      case 'login': return '登录';
      case 'register': return '注册';
      case 'modifyPassword': return '重置密码';
      default: return '';
    }
  }

  buildContent() {
    const { mode } = this.state;

    switch (mode) {
      case 'login': return <LoginForm ref={this.loginFormRef} />;
      case 'register': return <RegisterForm ref={this.registerFormRef} />;
      case 'modifyPassword': return <ModifyPasswordForm ref={this.modifyPasswordFormRef} />;
      default: return null;
    }
  }

  buildTip() {
    const { mode } = this.state;

    if (mode === 'login') {
      return (
        <div>
          没有账号？
          <TextButton
            onClick={() => this.onModeChange('register')}
          >注册</TextButton>
          <TextButton
            style={{ float: 'right' }}
            onClick={() => this.onModeChange('modifyPassword')}
          >忘记密码</TextButton>
        </div>
      );
    } else if (mode === 'register') {
      return (
        <TextButton
          onClick={() => this.onModeChange('login')}
        >已有账号登录</TextButton>
      );
    } else if (mode === 'modifyPassword') {
      return (
        <Fragment>
          <TextButton
            onClick={() => this.onModeChange('login')}
          >返回登录</TextButton>
          <span style={{ float: 'right' }}>
            没有账号？
            <TextButton
              onClick={() => this.onModeChange('register')}
            >注册</TextButton>
          </span>
        </Fragment>
      );
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    const btnBindClick = Children.map(
      children,
      btn => cloneElement(btn, { onClick: this.openModal }),
    );

    const title = this.getTitle();

    return (
      <Fragment>
        {btnBindClick}
        <Modal
          title={title}
          onOk={this.onOk}
          onCancel={this.closeModal}
          maskClosable={false}
          visible={visible}
          width={450}
          afterClose={this.resetForm}
        >
          <div onKeyDown={this.handleKeyDown}>
            {this.buildContent()}
            {this.buildTip()}
          </div>
        </Modal>
      </Fragment>
    );
  }
}
