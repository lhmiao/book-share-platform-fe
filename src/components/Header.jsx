import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import HeaderAction from 'components/HeaderAction';

const { Header: AntdHeader } = Layout;

const logoClass = css`
  display: inline-block;
  height: 31px;
  margin: 16px 24px 16px 0;
  line-height: 31px;
  font-size: 24px;
  font-style: italic;
  color: #fff;
`;

export default function Header(props) {
  return (
    <AntdHeader>
      <Link to="/" className={logoClass}>book share</Link>
      <HeaderAction />
    </AntdHeader>
  );
}
