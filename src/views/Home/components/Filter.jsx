import React, { Fragment } from 'react';
import { Input, Checkbox, Button } from 'antd';

const { Search } = Input;

export default function Filter(props) {
  const { params, onParamsChange, fetchBookList, history } = props;

  return (
    <Fragment>
      <Search
        style={{ width: 450 }}
        value={params.bookName}
        placeholder="请输入图书名"
        onChange={e => onParamsChange({ bookName: e.target.value })}
        onSearch={fetchBookList}
      />
      <Checkbox
        checked={!!params.onlyOnSell}
        style={{ marginLeft: 20 }}
        onChange={e => onParamsChange({ onlyOnSell: e.target.checked ? 1 : 0 }, true)}
      >仅查看可交易图书</Checkbox>
      <Button
        type="primary"
        style={{ float: 'right' }}
        onClick={() => history.push('/book/create')}
      >我也要分享</Button>
    </Fragment>
  );
}