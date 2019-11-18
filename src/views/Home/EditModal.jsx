import React, { PureComponent, cloneElement, Children, Fragment } from 'react';
import { Modal, Form, Input, message } from 'antd';
import * as api from 'apis/student';

const { Item: FormItem } = Form;

const fromLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class EditModal extends PureComponent {
  static defaultProps = {
    mode: 'create',
    student_id: '',
    name: '',
    phone: '',
    refresh: () => {},
  }

  state = {
    visible: false,
    loading: false,
  }

  openModal = () => this.setState({ visible: true })

  closeModal = () => this.setState({ visible: false })

  editStudentInfo = async () => {
    try {
      const { mode, form, refresh, id } = this.props;
      await this.validateForm();
      this.setState({ loading: true });
      const params = form.getFieldsValue();
      if (mode === 'create') {
        await api.addStudent(params);
        message.success('新建成功');
      } else {
        params.id = id;
        await api.editStudent(params);
        message.success('修改成功');
      }
      this.closeModal();
      refresh();
    } catch(error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  validateForm = () => new Promise((resolve, reject) => {
    const { form } = this.props;
    form.validateFields(error => {
      if(error) {
        reject('表单校验不通过');
        console.error(error);
        return;
      }
      resolve('表单校验通过');
    });
  })

  render() {
    const { children, form, student_id, name, phone } = this.props;
    const { visible, loading } = this.state;

    const { getFieldDecorator } = form;

    const btnBindClick = Children.map(
      children,
      btn => cloneElement(btn, { onClick: this.openModal }),
    );

    return (
      <Fragment>
        {btnBindClick}
        <Modal
          visible={visible}
          title="新增学生信息"
          onOk={this.editStudentInfo}
          onCancel={this.closeModal}
          confirmLoading={loading}
          afterClose={() => form.resetFields()}
        >
          <FormItem
            label="学号"
            {...fromLayout}
          >
            {getFieldDecorator('student_id', {
              initialValue: student_id,
              rules: [{
                required: true,
                validator(rule, value, callback) {
                  if (!value.trim()) {
                    callback('请输入学号');
                    return;
                  } else if (!/^\d{13}$/.test(value)) {
                    callback('学号只能由13位数字组成');
                    return;
                  }
                  callback();
                },
              }],
            })(<Input placeholder="请输入学号" />)}
          </FormItem>
          <FormItem
            label="姓名"
            {...fromLayout}
          >
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{
                required: true,
                validator(rule, value, callback) {
                  if (!value.trim()) {
                    callback('请输入姓名');
                    return;
                  }
                  callback();
                },
              }],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem
            label="电话"
            {...fromLayout}
          >
            {getFieldDecorator('phone', {
              initialValue: phone,
              rules: [{
                validator(rule, value, callback) {
                  if (value && !/^\d{11}$/.test(value)) {
                    callback('电话只能由13位数字组成');
                    return;
                  }
                  callback();
                },
              }],
            })(<Input placeholder="请输入电话" />)}
          </FormItem>
        </Modal>
      </Fragment>
    );
  }
}

export default Form.create()(EditModal);
