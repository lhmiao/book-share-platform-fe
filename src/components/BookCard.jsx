import React, { Fragment } from 'react';
import { Card, Typography, Tooltip, Icon, Modal, message } from 'antd';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserContactPopover from 'components/UserContactPopover';
import { getBookPreviewSrc, noop } from '@/utils';
import BookPrice from 'components/BookPrice';
import * as api from 'apis/book';

const { Meta: CardMeta } = Card;
const { Paragraph } = Typography;
const { confirm } = Modal;

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

function BookCard(props) {
  const {
    loginUser, id, bookName, intro, author, price, className, style, keeper,
    onSell, showActions, refresh, ...restProps
  } = props;

  const buyBook = async () => {
    try {
      await api.buyBook(id);
      message.success('购买成功');
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const buyBookConfirm = () => {
    if (loginUser.id === keeper.id) {
      message.info('你已拥有该图书');
      return;
    }

    confirm({
      title: '确认购买？',
      content: (
        <div>
          确认以
          <strong style={{ color: 'rgba(0, 0, 0, .85)' }}>「{price}个图书币」</strong>
          的价格购买
          <strong style={{ color: 'rgba(0, 0, 0, .85)' }}>《{bookName}》</strong>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: buyBook,
    });
  };

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
      <Icon
        type="shopping-cart"
        onClick={buyBookConfirm}
      />
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
      actions={[sellerInfo, buyBtn, detailInfo]}
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
  refresh: noop,
};

export default connect(state => ({ loginUser: state.user }))(BookCard);
