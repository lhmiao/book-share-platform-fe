import Client from './Client';

const client = new Client();

// 获取图书列表
export function fetchBookList(params) {
  const url = '/book';
  return client.get(url, params);
}
