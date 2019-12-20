import Client from './Client';

const client = new Client();

// 获取图书列表
export function fetchBookList(params) {
  const url = '/book';
  return client.get(url, params);
}

// 创建图书
export function createBook(params) {
  const url = '/book';
  return client.post(url, params, { useFormData: true });
}
