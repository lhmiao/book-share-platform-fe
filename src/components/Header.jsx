import React from 'react';
import { Layout } from 'antd';
import { css } from 'emotion';
import Login from './Login';

const { Header: AntdHeader } = Layout;

const logoClass = css`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.2);
`;

export default function Header(props) {
  return (
    <AntdHeader>
      <div className={logoClass} />
      <Login />
    </AntdHeader>
  );
}
