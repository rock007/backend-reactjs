import { getCookie, setCookie } from "../utils";

const AppConsts = {

  //isOpenPageModel:false,//页面加载方式，pop、page
  //open_model 1:page,0:pop
  getOpenModel:()=>{
    let openModel= getCookie('open_model');
    if(openModel==null||openModel=='') openModel='0';
    return openModel==='1';
  },
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'ApbBackend',
  },
  //authorization: {
  //  encrptedAuthTokenName: 'enc_auth_token',
  //  token:"" //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzYwMjU2MjgsInVzZXJfbmFtZSI6IjQwMjg4MWY3M2UxYzRiYTQwMTNlMWM0YzA4NDcwMDAxIiwiYXV0aG9yaXRpZXMiOlsi57O757uf566h55CG5ZGYIl0sImp0aSI6IjEwMjFiZWE4LWRjNjctNDMxZC04ZmU1LWJkNTc2ZDUxN2NiNCIsImNsaWVudF9pZCI6InRlc3QxIiwic2NvcGUiOlsiYWxsIl19.8ebGYhugERRnNHHOxwHn87C_aAbArXYjaDVtnOT3o-E'
  //},
  getToken:()=>{
    return getCookie('login_token'); 
  },
  clearToken:()=>{
    setCookie('login_token','');
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  //remoteServiceBaseUrl: 'https://localhost:10000',
  remoteServiceBaseUrl: 'https://219.138.150.225:10000',
  //uploadUrl: 'http://localhost:10007/',
  uploadUrl: 'http://219.138.150.225:10002/',
  //websocketUrl: 'http://localhost:10008/',
  websocketUrl: 'http://219.138.150.225:10008/',
  session:{
    userId:'',
    userName:'',
    realName:'',
    sex:'',
    orgName:'',
    orgId:'',
    roles:''
  },

  isGranted(permissionName: string): boolean {
    return true;
  }
};
export default AppConsts;
