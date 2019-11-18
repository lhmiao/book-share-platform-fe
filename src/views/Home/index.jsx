import React, { PureComponent, Fragment } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import queryString from 'query-string';
import * as api from 'apis/student';
import Filter from './Filter';
import EditModal from './EditModal';

const QUERY_TYPE = ['name', 'student_id'];

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    const params = this.parseParamsFromURL();
    this.state = {
      studentList: [],
      loading: false,
      total: 0,
      ...params,
    };
  }

  componentDidMount() {
    this.fetchStudentList();
  }

  fetchStudentList = async () => {
    try {
      this.updateParamsToURL();
      this.setState({ loading: true });
      const { searchKey, searchValue, page, page_size } = this.state;
      const params =  { page, page_size };
      searchKey && (params[searchKey] = searchValue);
      const { student_list, page_info: { total } } = await api.fetchStudent(params);
      this.setState({
        studentList: student_list,
        total,
      }, () => {
        const lastPage = Math.ceil(total / page_size) || 1;
        if (lastPage < page) this.onPageChange(lastPage, page_size);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  parseParamsFromURL() {
    const { location: { search } } = this.props;
    const { page = 1, page_size = 10, ...rest } = queryString.parse(search);
    const params = {
      searchKey: '',
      searchValue: '',
      page,
      page_size,
    };
    for (const [key, value] of Object.entries(rest)) {
      if (QUERY_TYPE.includes(key)) {
        params.searchKey = key;
        params.searchValue = value;
        break;
      }
    }
    return params;
  }

  updateParamsToURL() {
    const { history, match: { path } } = this.props;
    const { searchKey, searchValue, page, page_size } = this.state;
    const params = { page, page_size };
    if (QUERY_TYPE.includes(searchKey)) {
      params[searchKey] = searchValue;
    }
    history.replace(`${path}?${queryString.stringify(params)}`);
  }

  onChange = (params, effect = () => {}) => this.setState(params, effect)
  
  onPageChange = (page, pageSize) => this.setState(
    { page, page_size: pageSize },
    this.fetchStudentList,
  )

  deleteStudent = async (id) => {
    try {
      await api.deleteStudent({ id });
      message.success('删除成功');
      this.fetchStudentList();
    } catch (error) {
      console.error(error);
    }
  }

  buildTable() {
    const columns = [
      {
        key: 'student_id',
        title: '学号',
        dataIndex: 'student_id',
      },
      {
        key: 'name',
        title: '姓名',
        dataIndex: 'name',
      },
      {
        key: 'phone',
        title: '电话',
        dataIndex: 'phone',
      },
      {
        key: 'operate',
        title: '操作',
        render: (record) => {
          const { id } = record;

          return (
            <Fragment>
              <EditModal
                mode="edit"
                {...record}
                refresh={this.fetchStudentList}
              >
                <Button
                  ghost
                  type="primary"
                  size="small"
                >修改</Button>
              </EditModal>
              <Popconfirm
                title="确认删除该学生信息？"
                onConfirm={() => this.deleteStudent(id)}
              >
                <Button
                  ghost
                  type="danger"
                  size="small"
                  style={{ marginLeft: 8 }}
                >删除</Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ];

    const { studentList, page, page_size, total } = this.state;
    const pagination = {
      total,
      current: page,
      pageSize: page_size,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50'],
      onChange: this.onPageChange,
      onShowSizeChange: this.onPageChange,
    };

    return (
      <Table
        columns={columns}
        dataSource={studentList}
        pagination={pagination}
        size="middle"
        style={{ marginTop: 20 }}
      />
    );
  }

  render() {
    const { searchKey, searchValue } = this.state;

    return (
      <Fragment>
        <Filter
          searchKey={searchKey}
          searchValue={searchValue}
          onChange={this.onChange}
          fetchStudentList={this.fetchStudentList}
        />
        <EditModal
          mode="create"
          refresh={this.fetchStudentList}
        >
          <Button
            icon="plus"
            type="primary"
            style={{ marginLeft: 20 }}
          >新增</Button>
        </EditModal>
        {this.buildTable()}
      </Fragment>
    );
  }
}
