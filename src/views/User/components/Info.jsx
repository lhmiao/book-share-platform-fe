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
          initialValue: userInfo.username,
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input placeholder="请输入用户名" />
        )}
      </FormItem>
      <FormItem label="电话号码">
        {getFieldDecorator('phone', {
          initialValue: userInfo.phone,
        })(
          <Input placeholder="请输入电话号码" />
        )} 
      </FormItem>
      <FormItem label="qq号码">
        {getFieldDecorator('qq', {
          initialValue: userInfo.qq,
        })(
          <Input placeholder="请输入qq号码" />
        )}
      </FormItem>
      <FormItem label="微信号码">
        {getFieldDecorator('wechat', {
          initialValue: userInfo.wechat,
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
