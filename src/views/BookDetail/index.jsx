import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Skeleton, Divider, Button, Modal, message } from 'antd';
import * as api from 'apis/book';
import UserContactPopover from 'components/UserContactPopover';
import openRecordChainModal from 'components/RecordChain';
import BookInfo from './components/BookInfo';
import CommentList from './components/CommentList';

const { confirm } = Modal;

@connect(state => ({ loginUser: state.user }))
export default class BookDetail extends PureComponent {
  constructor(props) {
    super(props);

    const bookId = props?.match?.params?.bookId;
    this.bookId = bookId;

    this.state = {
      bookInfo: null,
      loading: true,
      bookRecordChain: [],
    };
  }

  componentDidMount() {
    this.fetchBookInfo();
    this.fetchBookRecordChain();
  }

  async fetchBookInfo() {
    try {
      this.setState({ loading: true });
      const bookInfo = await api.fetchBookInfo(this.bookId);
      this.setState({ bookInfo });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async fetchBookRecordChain() {
    try {
      const bookRecordChain = await api.fetchBookRecordChain(this.bookId);
      this.setState({ bookRecordChain });
    } catch (error) {
      console.error(error);
    }
  }

  buyBook = async () => {
    try {
      await api.buyBook(this.bookId);
      message.success('购买成功');
      this.fetchBookInfo();
    } catch (error) {
      console.error(error);
    }
  }

  buyBookConfirm = () => {
    const { loginUser } = this.props;
    const { bookInfo } = this.state;

    if (loginUser.id === bookInfo?.keeper?.id) {
      message.info('你已拥有该图书');
      return;
    }

    confirm({
      title: '确认购买？',
      content: (
        <div>
          确认以
          <strong style={{ color: 'rgba(0, 0, 0, .85)' }}>「{bookInfo?.price}个图书币」</strong>
          的价格购买
          <strong style={{ color: 'rgba(0, 0, 0, .85)' }}>《{bookInfo?.bookName}》</strong>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: this.buyBook,
    });
  }

  getExtra() {
    const { bookInfo, bookRecordChain } = this.state;

    if (!bookInfo) return null;

    return (
      <Fragment>
        <UserContactPopover
          {...bookInfo?.keeper}
          placement="left"
          title={bookInfo?.keeper?.username}
        >
          <Button>联系卖家</Button>
        </UserContactPopover>
        <Button
          onClick={() => openRecordChainModal(bookRecordChain)}
        >记录链</Button>
        <Button
          icon="shopping-cart"
          type="primary"
          onClick={this.buyBookConfirm}
        >购买</Button>
      </Fragment>
    );
  }

  render() {
    const { history } = this.props;
    const { loading, bookInfo } = this.state;

    return (
      <Fragment>
        <PageHeader
          title={bookInfo ? bookInfo?.bookName : '图书详情'}
          onBack={() => history.goBack()}
          style={{ padding: 0 }}
          extra={this.getExtra()}
        />
        <Divider />
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 5 }}
          title={{ width: '30%' }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          <BookInfo
            style={{ marginBottom: 20 }}
            {...bookInfo}
          />
        </Skeleton>
        <Divider orientation="left">评论</Divider>
        <CommentList bookId={this.bookId} />
      </Fragment>
    );
  }
}
