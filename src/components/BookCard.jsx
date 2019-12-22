import React, { Fragment } from 'react';
import { Card, Typography, Tooltip, Icon } from 'antd';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import UserContactPopover from 'components/UserContactPopover';
import { getBookPreviewSrc } from '@/utils';
import BookPrice from 'components/BookPrice';

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
`;

export default function BookCard(props) {
  const {
    id, bookName, intro, author, price, className, style, keeper,
    onSell, showActions, ...restProps
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
    <UserContactPopover {...keeper} title="联系卖家">
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
      <Link to={`/book/${id}`}>
        <Icon type="file-text" />
      </Link>
    </Tooltip>
  );

  const bookPreviewSrc = getBookPreviewSrc(id);

  return (
    <Card
      hoverable
      style={style}
      className={`${bookCardDefaultClass} ${className}`}
      cover={<img alt="图书预览图" src={bookPreviewSrc} />}
      actions={showActions ? [sellerInfo, buyBtn, detailInfo] : null}
      {...restProps}
    >
      <CardMeta
        title={bookName}
        description={description}
      />
      <BookPrice onSell={onSell}>{price}</BookPrice>
    </Card>
  );
}

BookCard.defaultProps = {
  bookName: '',
  intro: '',
  author: '',
  price: 0,
  keeper: {},
  onSell: false,
  showActions: true,
};