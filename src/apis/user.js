import Client from './Client';

const client = new Client();

export function login(params) {
  const url = '/user/login';
  return client.post(url, params);
}

export function logout() {
  const url = '/user/logout';
  return client.get(url);
} 

export function getSessionInfo() {
  const url = '/user/session';
  return client.get(url);
}
