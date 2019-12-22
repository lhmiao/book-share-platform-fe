import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Comment, Input, Button, message, Avatar, Tooltip, Icon,
} from 'antd';
import UserContactPopover from 'components/UserContactPopover';
import * as api from 'apis/bookComment';

const { TextArea } = Input;

@connect(state => ({ loginUser: state.user }))
export default class CommentItem extends PureComponent {
  state = {
    isEdit: false,
    newContent: '',
  };

  updateComment = async () => {
    try {
      const { newContent } = this.state;
      if (!newContent.trim()) {
        message.info('修改后的评论不能为空');
        return;
      }
      const { id, refresh } = this.props;
      await api.updateBookComment(id, newContent);
      message.success('修改成功');
      refresh();
    } catch (error) {
      console.error(error);
    }
  }

  createCommentAction = async (action) => {
    try {
      const { id, refresh, loginUserAction } = this.props;
      if (action === loginUserAction) return;
      await api.createBookCommentAction(id, action);
      refresh();
    } catch (error) {
      console.error(error);
    }
  }

  changeIsEdit = () => {
    const { content } = this.props;
    const { isEdit } = this.state;

    this.setState({ isEdit: !isEdit, newContent: content });
  }

  getAvatar() {
    const { commentUser } = this.props;
    const username = commentUser?.username;

    return (
      <UserContactPopover
        {...commentUser}
        placement="right"
        title={username}
      >
        <Avatar>{username[0].toUpperCase()}</Avatar>
      </UserContactPopover>
    );
  }

  getActions() {
    const {
      commentUser, loginUser, loginUserAction, likeUserNumber, dislikeUserNumber,
    } = this.props;

    const likeBtn = (
      <Fragment>
        <Tooltip title="赞同">
          <Icon
            type="like"
            style={{ cursor: 'pointer' }}
            theme={loginUserAction === 'like' ? 'filled' : 'outlined'}
            onClick={() => this.createCommentAction('like')}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likeUserNumber}</span>
      </Fragment>
    );

    const dislikeBtn = (
      <Fragment>
        <Tooltip title="反对">
          <Icon
            type="dislike"
            style={{ cursor: 'pointer' }}
            theme={loginUserAction === 'dislike' ? 'filled' : 'outlined'}
            onClick={() => this.createCommentAction('dislike')}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikeUserNumber}</span>
      </Fragment>
    );

    const editBtn = (
      <Tooltip title="修改评论">
        <Icon
          type="edit"
          style={{ cursor: 'pointer' }}
          onClick={this.changeIsEdit}
        />
      </Tooltip>
    );

    const actions = [likeBtn, dislikeBtn];

    if (commentUser.id === loginUser.id) actions.push(editBtn);

    return actions;
  }

  render() {
    const { commentUser, content, createdAt, updatedAt } = this.props;
    const { isEdit, newContent } = this.state;
    const username = commentUser?.username;

    if (isEdit) {
      return (
        <div style={{ margin: '16px 0' }}>
          <TextArea
            rows={3}
            value={newContent}
            onChange={e => this.setState({ newContent: e.target.value })}
            style={{ marginBottom: 10 }}
          />
          <Button
            size="small"
            onClick={this.changeIsEdit}
          >取消</Button>
          <Button
            size="small"
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={this.updateComment}
          >确认</Button>
        </div>
      );
    }

    const datetimeTooltipTitle = (
      <Fragment>
        <div>创建于：{moment(createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>
        {updatedAt && <div>更新于：{moment(updatedAt).format('YYYY-MM-DD hh:mm:ss')}</div>}
      </Fragment>
    );

    const datetime = (
      <Tooltip title={datetimeTooltipTitle}>
        <span style={{ cursor: 'pointer' }}>
          {moment(updatedAt || createdAt).fromNow()}
        </span>
      </Tooltip>
    );

    return (
      <Comment
        author={username}
        avatar={this.getAvatar()}
        content={content}
        actions={this.getActions()}
        datetime={datetime}
      />
    );
  }
}