import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import BaseLayout from 'views/BaseLayout';

function App() {
  return (
    <Router basename="/dev">
      <BaseLayout />
    </Router>
  );
}

export default hot(App);
