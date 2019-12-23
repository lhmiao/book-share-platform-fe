import React, { createRef, Fragment } from 'react';
import BookInfoForm from 'components/BookInfoForm';
import { Button, message, PageHeader, Divider } from 'antd';
import * as api from 'apis/book';
import { HOME_PATH } from '@/constant';

export default function CreateBook(props) {
  const { history } = props;

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
      await api.createBook(params);
      message.success('创建成功');
      history.replace(HOME_PATH);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <PageHeader
        title="分享图书"
        onBack={() => history.goBack()}
        style={{ padding: 0 }}
      />
      <Divider />
      <BookInfoForm ref={formRef} />
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          onClick={onConfirm}
        >确认</Button>
      </div>
    </Fragment>
  );
}