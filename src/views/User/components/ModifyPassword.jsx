import React, { Fragment, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import ModifyPasswordForm from 'components/ModifyPasswordForm';
import { Button, message } from 'antd';
import { clearUserInfo } from 'actions/user';
import * as api from 'apis/user';
import { HOME_PATH } from '@/constant';

function ModifyPassword(props) {
  const { history, clearUserInfo } = props;
  const formRef = createRef(null);

  function validateForm() {
    return new Promise((resolve, reject) => {
      formRef.current.validateFields((error, value) => {
        error ? reject('表单校验不通过') : resolve(value);
      });
    });
  }

  async function onConfirm() {
    try {
      const params = await validateForm();
      await api.modifyPassword(params);
      history.replace(HOME_PATH);
      clearUserInfo();
      message.success('修改密码成功，请重新登录');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <ModifyPasswordForm ref={formRef} />
      <Button
        type="primary"
        onClick={onConfirm}
      >确定</Button>
    </Fragment>
  );
}


export default compose(
  connect(null, dispatch => ({
    clearUserInfo: bindActionCreators(clearUserInfo, dispatch),
  })),
  withRouter,
)(ModifyPassword);