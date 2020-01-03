import React, { Fragment, useEffect, useState } from 'react';
import { PageHeader, Divider, Skeleton } from 'antd';
import * as api from 'apis/book';
import { getBookPreviewSrc } from '@/utils';
import EditBookForm from './EditBookForm';

export default function EditBook(props) {
  const { history, match } = props;
  const { params: { bookId } } = match;

  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookInfo() {
      try {
        const bookInfo = await api.fetchBookInfo(bookId);
        bookInfo.preview = getBookPreviewSrc(bookId);
        setBookInfo(bookInfo);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBookInfo();
  }, []); // eslint-disable-line

  if (loading) {
    return (
      <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 5 }}
          title={{ width: '30%' }}
          avatar={{ shape: 'square', size: 'large' }}
      />
    );
  }

  return (
    <Fragment>
      <PageHeader
        title="修改图书信息"
        onBack={() => history.goBack()}
        style={{ padding: 0 }}
      />
      <Divider />
      <EditBookForm bookInfo={bookInfo} />
    </Fragment>
  );
}