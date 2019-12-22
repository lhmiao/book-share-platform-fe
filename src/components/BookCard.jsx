import React, { Fragment } from 'react';
import { Card, Typography, Tooltip, Icon } from 'antd';
import { css } from 'emotion';
import UserContactPopover from 'components/UserContactPopover';

const { Meta: CardMeta } = Card;
const { Paragraph } = Typography;

const bookCardDefaultClass = css`
  .book-author {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, .65);
  }

  .book-intro {
    height: 36px;
    color: rgba(0, 0, 0, .45);
  }

  .book-price {
    color: #fa541c;
    font-weight: bold;
    font-size: 15px;

    &::before {
      content: "¥";
    }
  }
`;

export default function BookCard(props) {
  const {
    id, bookName, intro, author, price, className, style, keeper,
  } = props;

  const description = (
    <Fragment>
      <div className="book-author">
        <span>作者: </span>
        {author}
      </div>
      <Paragraph
        className="book-intro"
        ellipsis={{ rows: 2 }}
      >{intro}</Paragraph>
    </Fragment>
  );

  const sellerInfo = (
    <UserContactPopover {...keeper}>
      <Icon type="user" />
    </UserContactPopover>
  );

  const buyBtn = (
    <Tooltip title="购买">
      <Icon type="shopping-cart" />
    </Tooltip>
  );

  const detailInfo = (
    <Tooltip title="查看详情">
      <Icon type="file-text" />
    </Tooltip>
  );

  return (
    <Card
      hoverable
      style={style}
      className={`${bookCardDefaultClass} ${className}`}
      cover={<img alt="图书预览图" src={`/book/${id}/preview`} />}
      actions={[sellerInfo, buyBtn, detailInfo]}
    >
      <CardMeta
        title={bookName}
        description={description}
      />
      <div className="book-price">{price}</div>
    </Card>
  );
}

BookCard.defaultProps = {
  bookName: '',
  intro: '',
  author: '',
  price: 0,
  keeper: {},
};