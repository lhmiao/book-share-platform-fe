import React from 'react';
import { css } from 'emotion';

const bookPriceClass = css`
  font-weight: bold;
  font-size: 15px;

  &::before {
    content: "¥";
  }
`;

export default function BookPrice(props) {
  const { onSell, children, className, style } = props;

  const applyClassName = className
    ? `${bookPriceClass} ${className}`
    : bookPriceClass;

  const applyStyle = {
    color: onSell ? '#fa541c' : '#595959',
    ...style,
  };

  return (
    <span
      className={applyClassName}
      style={applyStyle}
    >
      {children}
      {onSell || '(不可交易)'}
    </span>
  );
}

BookPrice.defaultProps = {
  onSell: false,
};
