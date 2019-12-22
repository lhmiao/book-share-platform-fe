import React from 'react';
import { Modal, Timeline } from 'antd';
import moment from 'moment';

const { Item: TimelineItem } = Timeline;

export default function RecordChainModal(props) {
  const { visible, afterClose, chain, onCancel } = props;

  const buildContent = () => chain.map(item => (
    <TimelineItem>
      <div>{moment(item.timestamp).format('YYYY-MM-DD hh:mm:ss')}</div>
      <div>{item.data}</div>
    </TimelineItem>
  ));

  return (
    <Modal
      title="记录链"
      visible={visible}
      afterClose={afterClose}
      maskClosable={false}
      footer={null}
      onCancel={onCancel}
    >
      <Timeline>
        {buildContent()}
      </Timeline>
    </Modal>
  );
}

RecordChainModal.defaultProps = {
  visible: false,
  chain: [],
};
