import React, { Fragment, useState } from 'react';
import { Input, Button, message } from 'antd';
import * as api from 'apis/test';

export default function TestRequest(props) {
  const [value, setValue] = useState('');

  async function testGet() {
    try {
      await api.testGet({ value });
      message.success('success');
    } catch (error) {
      console.error(error);
    }
  }

  async function testError() {
    try {
      await api.testError();
      message.success('success');
    } catch (error) {
      console.error(error);
    }
  }

  async function testPost() {
    try {
      const params = { value };
      await api.testPost(params);
      message.success('success');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <Input value={value} onChange={e => setValue(e.target.value)} />
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button onClick={testGet}>test get</Button>
        <Button onClick={testError} style={{ margin: '0 20px' }}>test error</Button>
        <Button onClick={testPost}>test post</Button>
      </div>
    </Fragment>
  );
}
