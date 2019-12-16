import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import BaseLayout from 'views/BaseLayout';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <BaseLayout />
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default hot(App);
