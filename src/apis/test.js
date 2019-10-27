import Client from './Client';

const client = new Client({ baseURL: '/api' });

export function testGet(params) {
  const url = '/test1';
  return client.get(url);
}

export function testPost(params) {
  const url = '/testpost';
  return client.post(url, params);
}

export function testError() {
  const url = '/testerror';
  return client.get(url);
}
