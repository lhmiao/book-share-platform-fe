import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Input } from 'antd';
import TextButton from 'components/TextButton';
import * as api from 'apis/user';

const { Item: FormItem } = Form;
const { Password } = Input;

function ModifyPasswordForm(props) {
  const { userInfo, form } = props;
  const { getFieldDecorator } = form;

  const [securityQuestion, setSecurityQuestion] = useState(userInfo && userInfo.securityQuestion);

  function validateUsername() {
    return new Promise((resolve, reject) => {
      form.validateFields(['username'], (error, value) => {
        error ? reject('username 校验不通过') : resolve(value);
      });
    });
  }

  async function fetchSecurityQuestion() {
    try {
      const params = await validateUsername();
      const { securityQuestion } = await api.fetchSecurityQuestion(params);
      setSecurityQuestion(securityQuestion);
    } catch (error) {
      console.error(error);
    }
  }

  const addonAfter = (
    <TextButton
      onClick={fetchSecurityQuestion}
      style={{ color: 'rgba(0, 0, 0, .65)' }}
    >获取安全问题</TextButton>
  );

  return (
    <Fragment>
      {!userInfo && (
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input placeholder="请输入用户名" addonAfter={addonAfter} />
          )}
        </FormItem>
      )}
      <div style={{ color: 'rgba(0, 0, 0, .85)' }}>{securityQuestion}</div>
      <FormItem>
        {getFieldDecorator('securityAnswer', {
          initialValue: '',
          rules: [{ required: true, message: '请输入安全问题答案' }],
        })(
          <Input placeholder="请输入安全问题答案" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          initialValue: '',
          rules: [{ required: true, message: '请输入新密码' }],
        })(
          <Password placeholder="请输入新密码" />
        )}
      </FormItem>
    </Fragment>
  );
}

export default compose(
  Form.create(),
  connect(state => ({ userInfo: state.user })),
)(ModifyPasswordForm);
