import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserInfo } from 'actions/user';
import * as api from 'apis/user';

const { Item: FormItem } = Form;

function Info(props) {
  const { loginUser, form, setUserInfo } = props;
  const { getFieldDecorator } = form;

  function validateForm() {
    return new Promise((resolve, reject) => {
      form.validateFields((error, value) => {
        error ? reject('表单校验不通过') : resolve(value);
      });
    });
  }

  async function onSave() {
    try {
      const params = await validateForm();
      const loginUser = await api.modifyUserInfo(params);
      setUserInfo(loginUser);
      message.success('修改成功');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <FormItem label="用户名">
        {getFieldDecorator('username', {
          initialValue: loginUser?.username,
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input placeholder="请输入用户名" />
        )}
      </FormItem>
      <FormItem label="电话号码">
        {getFieldDecorator('phone', {
          initialValue: loginUser?.phone,
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
      <FormItem label="QQ号码">
        {getFieldDecorator('qq', {
          initialValue: loginUser?.qq,
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
      <FormItem label="微信号码">
        {getFieldDecorator('wechat', {
          initialValue: loginUser?.wechat,
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
      <Button
        onClick={() => form.resetFields()}
      >重置</Button>
      <Button
        type="primary"
        onClick={onSave}
        style={{ marginLeft: 10 }}
      >保存</Button>
    </div>
  );
}

export default compose(
  connect(
    state => ({ loginUser: state.user }),
    dispatch => ({
      setUserInfo: bindActionCreators(setUserInfo, dispatch),
    })),
  Form.create()
)(Info);
