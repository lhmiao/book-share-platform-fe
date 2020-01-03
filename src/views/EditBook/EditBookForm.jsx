import React, { createRef, Fragment } from 'react';
import BookInfoForm from 'components/BookInfoForm';
import { Button, message } from 'antd';
import * as api from 'apis/book';

export default function EditBookForm(props) {
  const { bookInfo } = props;

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
      if (!(params.preview instanceof Blob)) {
        delete params.preview;
      }
      await api.editBook(bookInfo.id, params);
      message.success('修改成功');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <BookInfoForm ref={formRef} {...bookInfo} />
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={() => formRef.current.resetFields()}
        >重置</Button>
        <Button
          type="primary"
          onClick={onConfirm}
          style={{ marginLeft: 10 }}
        >确认</Button>
      </div>
    </Fragment>
  );
}
