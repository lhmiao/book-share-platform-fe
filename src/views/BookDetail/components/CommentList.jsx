import React, { PureComponent, Fragment } from 'react';
import { Input, Pagination, Button, message } from 'antd';
import * as api from 'apis/bookComment';
import CommentItem from './commentItem';

const { TextArea } = Input;

export default class CommentList extends PureComponent {
  state = {
    comments: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loginUserComment: '',
  }

  componentDidMount() {
    this.fetchBookComments();
  }

  fetchBookComments = async () => {
    try {
      const { bookId } = this.props;
      const { page, pageSize } = this.state;
      const params = { page, pageSize };
      const { bookCommentList, pageInfo } = await api.fetchBookComments(bookId, params);
      this.setState({ comments: bookCommentList, total: pageInfo.total });
    } catch (error) {
      console.error(error);
    }
  }

  createComment = async () => {
    try {
      const { bookId } = this.props;
      const { loginUserComment } = this.state;
      if (!loginUserComment.trim()) {
        message.info('评论不能为空');
        return;
      }
      await api.createBookComment(bookId, loginUserComment);
      message.success('创建评论成功');
      this.fetchBookComments();
    } catch (error) {
      console.error(error);
    }
  }

  onChange = changeObj => this.setState(changeObj)

  buildComments() {
    const { comments, page, total } = this.state;

    if (!comments.length) {
      const emptyTipStyle = {
        textAlign: 'center',
        margin: '20px 0',
        color: 'rgba(0, 0, 0, .25)',
      };

      return <p style={emptyTipStyle}>暂无用户评论</p>;
    }

    const paginationProps = {
      current: page,
      total,
      size: 'small',
      onChange(page) {
        this.setState({ page });
      },
      style: {
        textAlign: 'right',
        marginBottom: 20,
      },
    };

    return (
      <Fragment>
        {comments.map(item => <CommentItem {...item} refresh={this.fetchBookComments} />)}
        <Pagination {...paginationProps} />
      </Fragment>
    );
  }

  render() {
    const { className, style } = this.props;
    const { loginUserComment } = this.state;

    return (
      <div
        style={style}
        className={className}
      >
        {this.buildComments()}
        <TextArea
          rows={4}
          value={loginUserComment}
          onChange={e => this.onChange({ loginUserComment: e.target.value })}
          placeholder="请输入你对本书的评论"
          style={{ marginBottom: 20 }}
        />
        <Button
          type="primary"
          onClick={this.createComment}
        >确认</Button>
      </div>
    );
  }
}