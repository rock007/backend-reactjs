import axios from 'axios';
import AppConsts from './../lib/appconst';
//import { L } from 'src/lib/abpUtility';
import { Modal ,Icon, Button} from 'tinper-bee';

const qs = require('qs');

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function(config) {
    /** 
    if (!!abp.auth.getToken()) {
      config.headers.common['Authorization'] = 'Bearer ' + abp.auth.getToken();
    }
    **/

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
      Modal.error({
        title: error.response.data.error.message,
        content: error.response.data.error.details,
      });
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
      Modal.error({
        title: 'LoginFailed',
        content: error.response.data.error.message,
      });
    } else if (!error.response) {
      Modal.error({ content: 'UnknownError' });
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
