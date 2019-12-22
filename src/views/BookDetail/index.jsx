import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Skeleton, Divider, Button } from 'antd';
import * as api from 'apis/book';
import UserContactPopover from 'components/UserContactPopover';
import openRecordChainModal from 'components/RecordChain';
import BookInfo from './components/BookInfo';
import CommentList from './components/CommentList';

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
          style={{ padding: 0, marginBottom: 24 }}
          extra={this.getExtra()}
        />
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
