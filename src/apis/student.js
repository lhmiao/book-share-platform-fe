import Client from './Client';

const client = new Client();

export function fetchStudent(params) {
  const url = '/student';
  return client.get(url, params);
}

export function addStudent(params) {
  const url = '/student';
  return client.post(url, params);
}

export function editStudent(params) {
  const url = '/student';
  return client.put(url, params);
}

export function deleteStudent(params) {
  const url = '/student';
  return client.delete(url, params);
}
