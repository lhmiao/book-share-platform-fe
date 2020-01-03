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

// 修改图书信息
export function editBook(bookId, params) {
  const url = `/book/${bookId}`;
  return client.put(url, params, { useFormData: true });
}

// 获取图书信息
export function fetchBookInfo(bookId) {
  const url = `/book/${bookId}`;
  return client.get(url);
}

// 获取图书记录链
export function fetchBookRecordChain(bookId) {
  const url = `/book/${bookId}/record_chain`;
  return client.get(url);
}

// 购买图书
export function buyBook(bookId) {
  const url = `/book/${bookId}/buy`;
  return client.get(url);
}
