import React, { Fragment } from 'react';
import { Popover, Icon, message } from 'antd';
import styled from '@emotion/styled';

const ContactItemContainer = styled.div`
  margin-bottom: 4px;
  
  .contact-item-label {
    margin-right: 4px;
  }

  .contact-item-value {
    transition: all .2s;
    cursor: pointer;

    &:hover {
      color: #1890ff;
    }
  }
`;

const ContactItem = ({ label, children }) => {
  if (!children) return null;

  const copyContact = () => {
    let input = document.createElement('input');
    document.body.appendChild(input);
    input.value = children;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    input = null;
    message.success('已复制该联系方式至剪贴板');
  };

  return (
    <ContactItemContainer>
      <span className="contact-item-label">{label} </span>
      <span
        className="contact-item-value"
        onClick={copyContact}
      >
        {children}
      </span>
    </ContactItemContainer>
  );
};

export default function UserContactPopover(props) {
  const { phone, qq, wechat, children, placement } = props;

  const content = (
    <Fragment>
      <ContactItem label={<Icon type="phone" />}>
        {phone}
      </ContactItem>
      <ContactItem label={<Icon type="qq" />}>
        {qq}
      </ContactItem>
      <ContactItem label={<Icon type="wechat" />}>
        {wechat}
      </ContactItem>
      <div style={{ color: 'rgba(0, 0, 0, .45)' }}>Tips: 点击可复制联系方式</div>
    </Fragment>
  );

  return (
    <Popover
      title="联系卖家"
      content={content}
      placement={placement}
    >
      {children}
    </Popover>
  );
}

UserContactPopover.defaultProps = {
  placement: 'top',
};