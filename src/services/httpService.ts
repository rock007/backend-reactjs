import axios from 'axios';
import AppConsts from './../lib/appconst';
import {JsonBody} from './Model/Models';
import { Warning ,Info,Error} from '../utils';

const qs = require('qs');

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  }
});

http.interceptors.request.use(
  function(config) {
    
    if (!!AppConsts.getToken()) {
      config.headers.common['Authorization'] = 'Bearer ' + AppConsts.getToken();
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

      if(resp.result==-401){
        console.log('请重新登录');
        
        AppConsts.clearToken();

        window.location.href='/#/account/login';

        return;
      }

      Warning(resp.data||resp.msg);
      return Promise.reject(resp);
    }

    /** 
    if(resp.result < 0){

      if(resp.result==-401){
        console.log('请重新登录');
        
        AppConsts.authorization.token='';
        window.location.href='/#/account/login';
      }
      
      Message.destroy();
      Message.create({content: resp.msg, color: 'warn'});
      return Promise.reject(resp);
    }
    ***/

    if(resp.msg!=='success'){
      Info(resp.msg)
    }

    return resp.data;
  },
  error => {

    console.log('请求返回:'+JSON.stringify(error.response));

    //Message.destroy();
    
    if(error.response!=null&&error.response.data!=null){

      let resp=error.response.data as JsonBody<any>;

      //Message.create({content: resp.msg, color: 'danger'});

      if(resp.result==-401){

        AppConsts.clearToken();
        window.location.href='/#/account/login';
      }else{

        Error(resp.data||resp.msg);
        //return Promise.reject(resp);
      }

    }else{

      Error('请求失败');
      //Message.create({content: '请求失败', color: 'danger'});
    }
  
    return Promise.reject(error);
  }
);

export default http;
