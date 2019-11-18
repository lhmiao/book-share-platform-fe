import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import BaseLayout from 'views/BaseLayout';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename="/dev">
        <BaseLayout />
      </Router>
    </ConfigProvider>
  );
}

export default hot(App);
