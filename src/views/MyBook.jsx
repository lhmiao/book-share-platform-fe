import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { message, PageHeader, Divider } from 'antd';
import * as api from 'apis/book';
import BookList from 'components/BookList';

@connect(state => ({ loginUser: state.user }))
export default class MyBook extends PureComponent {
  state = {
    bookList: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchMyBookList();
  }

  async fetchMyBookList() {
    try {
      const { loginUser } = this.props;
      if (!loginUser) {
        message.info('请登录后再查看我的图书');
        return;
      }
      this.setState({ loading: true });
      const params = {
        keeperId: loginUser.id,
        page: 1,
        pageSize: 9999,
      };
      const { bookList } = await api.fetchBookList(params);
      this.setState({ bookList });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { history } = this.props;
    const { bookList, loading } = this.state;

    const bookCardProps = { refresh: this.fetchMyBookList };

    return (
      <Fragment>
        <PageHeader
          title="我的图书"
          onBack={() => history.goBack()}
          style={{ padding: 0 }}
        />
        <Divider />
        <BookList
          loading={loading}
          data={bookList}
          needPagination={false}
          bookCardProps={bookCardProps}
        />
      </Fragment>
    );
  }
}