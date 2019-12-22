import React from 'react';
import { Typography } from 'antd';
import styled from '@emotion/styled';
import { getBookPreviewSrc } from '@/utils';
import BookPrice from 'components/BookPrice';

const { Paragraph } = Typography;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;

  .book-info-preview {
    flex: 0 0 ;
    width: 200px;
    margin-right: 20px;
  }

  .book-info-items {
    flex: 1 1;

    .book-info-item {
      margin-bottom: 8px;

      .book-info-item-label {
        color: rgba(0, 0, 0, .85);
      }
    }
  }
`;

const BookInfoItem = ({ label, children }) => (
  <div className="book-info-item">
    <span
      className="book-info-item-label"
    >{label}: </span>
    {children}
  </div>
);

export default function BookInfo(props) {
  const {
    id, intro, author, onSell, price, style, className,
  } = props;

  const bookPreviewSrc = getBookPreviewSrc(id);

  return (
    <Container
      style={style}
      className={className}
    >
      <img
        alt="图书预览图"
        src={bookPreviewSrc}
        className="book-info-preview"
      />
      <div className="book-info-items">
        <BookInfoItem label="作者">{author}</BookInfoItem>
        <BookInfoItem label="内容简介">
          <Paragraph
            className="book-info-intro"
            ellipsis={{ rows: 3, expandable: true }}
          >{intro}</Paragraph>
        </BookInfoItem>
        <BookPrice onSell={onSell}>{price}</BookPrice>
      </div>
    </Container>
  );
}
