import { getCookie, setCookie } from "../utils";
import { isArray } from "util";

const AppConsts = {

  permissions:Array,
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
  //remoteServiceBaseUrl: 'http://localhost:10000',
  //uploadUrl: 'http://localhost:10007/',
  //websocketUrl: 'http://localhost:10008/',
  //测试
  //remoteServiceBaseUrl: 'http://219.138.150.225:10000',
  //uploadUrl: 'http://219.138.150.225:10002/',
  //websocketUrl: 'http://219.138.150.225:10008/',

  //来凤
  remoteServiceBaseUrl: 'http://58.52.201.117:10000',
  uploadUrl: 'http://58.52.201.117:8080/',
  websocketUrl: 'http://58.52.201.117:10008/',

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

    if(this.permissions==null||this.permissions.length==0) return false;

    if(!isArray(this.permissions)) return false;

    let  list=this.permissions as Array<any>
    
    return list.find((m,i)=>m.attr===permissionName)!=null;
  },

  //人员分类
  MAN_CATE_TYPE_SHEJIE:"101001",
	MAN_CATE_TYPE_SHEKANG:"101002"
};
export default  AppConsts;
