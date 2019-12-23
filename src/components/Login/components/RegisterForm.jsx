import React, { Fragment } from 'react';
import { Form, Input } from 'antd';

const { Item: FormItem } = Form;
const { Password } = Input;

function RegisterForm(props) {
  const { form } = props;
  const { getFieldDecorator } = form;

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
          rules: [{
            validator(rule, value, callback) {
              const qq = form.getFieldValue('qq');
              const wechat = form.getFieldValue('wechat');
              if (!value && !qq && !wechat) {
                callback('电话号码、QQ号码、微信号码至少填一个');
                return;
              }
              if (value && !/^\d{11}$/.test(value)) {
                callback('电话号码必须由11位数字组成');
                return;
              }
              callback();
            },
          }],
        })(
          <Input placeholder="请输入电话号码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('qq', {
          initialValue: '',
          rules: [{
            validator(rule, value, callback) {
              const phone = form.getFieldValue('phone');
              const wechat = form.getFieldValue('wechat');
              if (value || phone || wechat) {
                callback();
                return;
              }
              callback('电话号码、QQ号码、微信号码至少填一个');
            },
          }],
        })(
          <Input placeholder="请输入QQ号码" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('wechat', {
          initialValue: '',
          rules: [{
            validator(rule, value, callback) {
              const phone = form.getFieldValue('phone');
              const qq = form.getFieldValue('qq');
              if (value || qq || phone) {
                callback();
                return;
              }
              callback('电话号码、QQ号码、微信号码至少填一个');
            },
          }],
        })(
          <Input placeholder="请输入微信号码" />
        )}
      </FormItem>
    </Fragment>
  );
}

export default Form.create()(RegisterForm);
