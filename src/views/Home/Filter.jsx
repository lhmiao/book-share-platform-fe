import React from 'react';
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

export default function Filter(props) {
  const { searchKey, searchValue, fetchStudentList, onChange } = props;

  function onSelectChange(searchKey) {
    if (searchKey === '') {
      onChange({ searchKey, searchValue: '' }, fetchStudentList);
      return;
    }
    onChange({ searchKey, searchValue: '' });
  }

  const selectBefore = (
    <Select
      value={searchKey}
      style={{ width: 70 }}
      onChange={onSelectChange}
    >
      <Option value="">全部</Option>
      <Option value="student_id">学号</Option>
      <Option value="name">姓名</Option>
    </Select>
  );

  return (
    <Search
      style={{ width: 500 }}
      value={searchValue}
      addonBefore={selectBefore}
      onChange={e => onChange({ searchValue: e.target.value })}
      onSearch={value => fetchStudentList()}
    />
  );
}
