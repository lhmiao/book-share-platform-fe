import axios from 'axios';
import { notification } from 'antd';
import { getCsrfToken, isCsrfSafeMethod } from '../utils';

const clientOpts = {
  baseURL: '/api/v1',
  timeout: 10000,
};

export default class Client {
  constructor(userOpts) {
    const options = { ...clientOpts, ...userOpts };
    this.client = this.getAxiosClient(options);
  }

  getAxiosClient(options) {
    const client = axios.create(options);
    client.interceptors.request.use((config) => {
      const { method } = config;
      if (!isCsrfSafeMethod(method)) {
        const csrfToken = getCsrfToken();
        csrfToken && (config.headers['x-csrf-token'] = csrfToken); 
      }
      return Promise.resolve(config);
    });
    client.interceptors.response.use(
      (res) => {
        const { data, config } = res;
        if (data.code !== 0) {
          const { useErrorTip = true } = config;
          if (useErrorTip) {
            notification.error({
              message: data.code,
              description: data.message,
            });
          }
          return Promise.reject(data);
        }
        return Promise.resolve(data.data);
      },
      (error) => {
        const { response: { status, statusText }, config } = error;
        const { useErrorTip = true } = config;
        const reject = {
          code: status,
          message: statusText,
        };
        if (useErrorTip) {
          notification.error({
            message: status,
            description: statusText,
          });
        }
        return Promise.reject(reject);
      }
    );
    return client;
  }

  get(url, params, config = {}) {
    const options = {
      url,
      method: 'get',
      params,
      ...config,
    };
    return this.client.request(options);
  }

  delete(url, params, config = {}) {
    return this.get(url, params, { ...config, method: 'delete' });
  }

  post(url, data, config = { useFormData: false }) {
    const options = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
      ...config,
    };
    if (config.useFormData) {
      const form = new FormData();
      Object.entries(data).forEach(([key, value]) => form.append(key, value));
      options.headers['Content-Type'] = 'multipart/form-data';
      options.data = form;
    }
    return this.client.request(options);
  }

  put(url, data, config = { useFormData: false }) {
    return this.post(url, data, { ...config, method: 'put' });
  }

  patch(url, data, config = { useFormData: false }) {
    return this.post(url, data, { ...config, method: 'patch' });
  }
}