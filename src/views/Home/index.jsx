import React, { PureComponent, Fragment } from 'react';
import queryString from 'query-string';
import * as api from 'apis/book';
import Filter from './components/Filter';
import BookList from 'components/BookList';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    const params = this.parseParamsFromURL();
    this.state = {
      bookList: [],
      loading: true,
      params,
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchBookList();
  }

  fetchBookList = async () => {
    try {
      this.setState({ loading: true });
      this.updateParamsToURL();
      const { params } = this.state;
      const { bookList, pageInfo } = await api.fetchBookList(params);
      this.setState({ bookList, total: pageInfo.total });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  parseParamsFromURL() {
    const { location } = this.props;
    const { 
      page = 1, pageSize = 10, bookName = '', onlyOnSell = 0,
    } = queryString.parse(location.search);
    const params = {
      page: Number(page),
      pageSize: Number(pageSize),
      bookName,
      onlyOnSell: Number(onlyOnSell),
    };
    return params;
  }

  updateParamsToURL() {
    const { history, location } = this.props;
    const { params } = this.state;
    history.replace(`${location.pathname}?${queryString.stringify(params)}`);
  }

  onParamsChange = (subChangeParams, needFetchBookList = false) => {
    const params = { ...this.state.params, ...subChangeParams };
    const effect = needFetchBookList ? this.fetchBookList : () => {};
    this.setState({ params }, effect);
  }

  onPageChange = (page, pageSize) => this.onParamsChange({ page: page || 1, pageSize }, true)

  render() {
    const { history } = this.props;
    const { params, bookList, total, loading } = this.state;

    return (
      <Fragment>
        <Filter
          params={params}
          history={history}
          onParamsChange={this.onParamsChange}
          fetchBookList={this.fetchBookList}
        />
        <BookList
          data={bookList}
          total={total}
          loading={loading}
          page={params.page}
          pageSize={params.pageSize}
          onPageChange={this.onPageChange}
          style={{ marginTop: 24 }}
        />
      </Fragment>
    );
  }
}