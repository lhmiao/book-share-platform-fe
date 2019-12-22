import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import RecordChainModal from './RecordChainModal';

export default function openRecordChainModal(chain = []) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const destory = () => {
    const unmountResult = unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const render = visible => {
    const onCancel = () => render(false);

    ReactDOM.render(
      <RecordChainModal
        visible={visible}
        afterClose={destory}
        chain={chain}
        onCancel={onCancel}
      />,
      div,
    );
  };

  render(true);
}
