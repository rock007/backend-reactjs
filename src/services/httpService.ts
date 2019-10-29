import axios from 'axios';
import AppConsts from './../lib/appconst';
import { Modal ,Message} from 'tinper-bee';
import {JsonBody} from './Model/Models';

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
    
    if (!!AppConsts.authorization.token) {
      config.headers.common['Authorization'] = 'Bearer ' + AppConsts.authorization.token;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {

    let resp=response.data as JsonBody<any>;

    if(resp.result < 0){
      Message.destroy();
      Message.create({content: resp.msg, color: 'danger'});

      return Promise.reject(resp);
    }
    return resp.data;
  },
  error => {

    Message.destroy();
    
    if(error.response!=null&&error.response.data!=null){
      console.log('error happen:'+JSON.stringify(error.response.data));
    }
    
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
      //Modal.error({ content: 'UnknownError' });
      Message.create({content: '请求失败', color: 'danger'});
    }

    return Promise.reject(error);
  }
);

export default http;
