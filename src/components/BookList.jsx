import React from 'react';
import { Pagination, Empty } from 'antd';
import styled from '@emotion/styled';
import BookCard from 'components/BookCard';
import { noop } from '@/utils';

const Container = styled.div`
  .book-list-cards {
    display: flex;
    flex-flow: row wrap;

    .book-list-empty {
      width: 100%;
      margin: 20px 0;
    }

    .book-list-card {
      width: 250px;
      margin: 10px;
    }
  }

  .book-list-pagination {
    margin-top: 10px;
    text-align: right;
  }
`;

export default function BookList(props) {
  const {
    data, total, page, pageSize, onPageChange, style,
    className, needPagination, bookCardProps,
    // loading,
  } = props;

  
  const mapDataToCards = () => {
    // if (loading) {
    //   const cardStyle = { width: 250, margin: 10 };

    //   return Array
    //     .from({ length: 10 })
    //     .map(() => <Card style={cardStyle} loading={loading} />);
    // }

    if (!data.length) return <Empty />;

    return data.map(item => (
      <BookCard
        key={item.id}
        className="book-list-card"
        {...bookCardProps}
        {...item}
      />
    ));
  };

  const paginationProps = {
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '30', '50'],
    total,
    showSizeChanger: true,
    size: 'small',
    onChange: onPageChange,
    onShowSizeChange: onPageChange,
    showTotal(total) {
      return `共${total}本图书`;
    },
    className: 'book-list-pagination',
  };

  return (
    <Container
      style={style}
      className={className}
    >
      <div className="book-list-cards">
        {mapDataToCards()}
      </div>
      {needPagination && <Pagination {...paginationProps} />}
    </Container>
  );
};

BookList.defaultProps = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  onPageChange: noop,
  loading: false,
  needPagination: true,
  refresh: noop,
};
