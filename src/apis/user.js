import Client from './Client';

const client = new Client();

// 检查登录
export function checkLogin() {
  const url = '/user/check_login';
  return client.get(url, undefined, { useErrorTip: false });
}

// 获取安全问题答案
export function fetchSecurityQuestion(params) {
  const url = '/user/security_question';
  return client.get(url, params);
}

// 登录
export function login(params) {
  const url = '/user/login';
  return client.post(url, params);
}

// 注册
export function register(params) {
  const url = '/user/register';
  return client.post(url, params);
}

// 登出
export function logout() {
  const url = '/user/logout';
  return client.get(url);
}

// 修改密码
export function modifyPassword(params) {
  const url = '/user/password';
  return client.put(url, params);
}

// 修改用户信息
export function modifyUserInfo(params) {
  const url = '/user';
  return client.patch(url, params);
}
