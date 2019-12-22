import Client from './Client';

const client = new Client();

// 获取图书评论
export function fetchBookComments(bookId, params) {
  const url = `/book_comment/${bookId}`;
  return client.get(url, params);
}

// 创建图书评论
export function createBookComment(bookId, content) {
  const url = `/book_comment/${bookId}`;
  return client.post(url, { content });
}

// 更新图书评论
export function updateBookComment(bookCommentId, content) {
  const url = `/book_comment/${bookCommentId}`;
  return client.put(url, { content });
}

// 赞同或反对评论
export function createBookCommentAction(bookCommentId, action) {
  const url = `/book_comment/${bookCommentId}/action`;
  return client.post(url, { action });
}
