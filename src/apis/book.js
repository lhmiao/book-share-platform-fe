import Client from './Client';

const client = new Client();

export function fetchBookList(params) {
  const url = '/book';
  return client.get(url, params);
}
