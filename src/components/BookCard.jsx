import React, { Fragment } from 'react';
import { Card, Typography, Tooltip, Icon, Modal, message } from 'antd';
import { css } from 'emotion';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserContactPopover from 'components/UserContactPopover';
import { getBookPreviewSrc, noop } from '@/utils';
import BookPrice from 'components/BookPrice';
import * as api from 'apis/book';

const { Meta: CardMeta } = Card;
const { Paragraph } = Typography;
const { confirm } = Modal;

const bookCardDefaultClass = css`
  .book-cover {
    text-align: center;

    .book-cover-preview {
      width: 120px;
      height: 120px;
      margin: 24px 0;
    }
  }

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
    onSell, showActions, refresh, history, ...restProps
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
    if (!loginUser) {
      message.info('请先登录');
      return;
    }

    if (loginUser?.id === keeper?.id) {
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

  const toBookDetailPage = () => {
    if (!loginUser) {
      message.info('请先登录');
      return;
    }
    history.push(`/book/${id}`);
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
      <Icon
        type="file-text"
        onClick={toBookDetailPage}
      />
    </Tooltip>
  );

  const bookPreviewSrc = getBookPreviewSrc(id);

  const cover = (
    <div className="book-cover">
      <img
        alt="图书预览图"
        src={bookPreviewSrc}
        className="book-cover-preview"
      />
    </div>
  );

  return (
    <Card
      hoverable
      style={style}
      className={`${bookCardDefaultClass} ${className}`}
      cover={cover}
      actions={[sellerInfo, buyBtn, detailInfo]}
      onClick={toBookDetailPage}
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

export default compose(
  connect(state => ({ loginUser: state.user })),
  withRouter,
)(BookCard);
