import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserInfo } from 'actions/user';
import * as api from 'apis/user';

const { Item: FormItem } = Form;

function Info(props) {
  const { userInfo, form, setUserInfo } = props;
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
      const userInfo = await api.modifyUserInfo(params);
      setUserInfo(userInfo);
      message.success('修改成功');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <FormItem label="用户名">
        {getFieldDecorator('username', {
          initialValue: userInfo?.username,
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input placeholder="请输入用户名" />
        )}
      </FormItem>
      <FormItem label="电话号码">
        {getFieldDecorator('phone', {
          initialValue: userInfo?.phone,
          rules: [{
            validator(rule, value, callback) {
              const qq = form.getFieldValue('qq');
              const wechat = form.getFieldValue('wechat');
              if (value || qq || wechat) {
                callback();
                return;
              }
              callback('电话号码、QQ号码、微信号码至少填一个');
            },
          }],
        })(
          <Input placeholder="请输入电话号码" />
        )} 
      </FormItem>
      <FormItem label="QQ号码">
        {getFieldDecorator('qq', {
          initialValue: userInfo?.qq,
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
          initialValue: userInfo?.wechat,
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
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={() => form.resetFields()}
        >重置</Button>
        <Button
          type="primary"
          onClick={onSave}
          style={{ marginLeft: 10 }}
        >保存</Button>
      </div>
    </div>
  );
}

export default compose(
  connect(null, dispatch => ({
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
  })),
  Form.create()
)(Info);
