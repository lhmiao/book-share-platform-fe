import React, { Fragment } from 'react';
import { Form, Input } from 'antd';

const { Item: FormItem } = Form;
const { Password } = Input;

function RegisterForm(props) {
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
      <FormItem>
        {getFieldDecorator('securityQuestion', {
          initialValue: '',
          rules: [{ required: true, message: '请输入安全问题' }],
        })(
          <Input placeholder="请输入安全问题" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('securityAnswer', {
          initialValue: '',
          rules: [{ required: true, message: '请输入安全问题答案' }],
        })(
          <Input placeholder="请输入安全问题答案" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('phone', {
          initialValue: '',
        })(
          <Input placeholder="请输入电话号码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('qq', {
          initialValue: '',
        })(
          <Input placeholder="请输入 qq 号码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('wechat', {
          initialValue: '',
        })(
          <Input placeholder="请输入微信号码" />
        )}
      </FormItem>
    </Fragment>
  );
}

export default Form.create()(RegisterForm);
