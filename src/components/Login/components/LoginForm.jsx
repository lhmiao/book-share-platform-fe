import React, { Fragment } from 'react';
import { Form, Input } from 'antd';

const { Item: FormItem } = Form;
const { Password } = Input;

function LoginForm(props) {
  const { getFieldDecorator } = props.form;
  return (
    <Fragment>
      <FormItem>
        {getFieldDecorator('username', {
          initialValue: '',
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input placeholder="请输入用户名" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          initialValue: '',
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Password placeholder="请输入密码" />
        )}
      </FormItem>
    </Fragment>
  );
}

export default Form.create()(LoginForm);
