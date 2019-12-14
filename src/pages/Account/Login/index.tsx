import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Icon, Button, Label, FormControl, Form ,Panel,LoadingState} from 'tinper-bee';
import request from '../../../utils/request';
import axios from 'axios';

import './index.scss';
import { Redirect } from 'react-router-dom';
import AccountStore from '../../../stores/AccountStore';
import Store from '../../../stores/StoreIdentifier';
import { Error, Warning,Info ,setCookie,getCookie} from '../../../utils';
import AppConsts from '../../../lib/appconst';
import { JsonBody } from '../../../services/Model/Models';

interface IPageProps {
    form:any,
    history: any;
    location: any;
    accountStore?:AccountStore
}
interface IPageState {
    isWaiting:boolean
}

@inject(Store.AccountStore)
@observer
export class Login extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        isWaiting:false
    }

    componentDidMount() {

       let  login_name=getCookie('login_name');
       let  login_pwd=getCookie('login_pwd');

       this.props.accountStore.initLogin(login_name,login_pwd);
    }
    submit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            
            if (err) {
                console.log('校验失败', values);
                Warning("输入验证失败");
            } else {
                console.log('提交成功', values);
                //this.props.accountStore.login(values.username,values.password);
                this.doLogin(values.username,values.password);
            }

        });
    }

    doLogin = async (username:string,password:string) => {
        
        const me=this;
        this.setState({
            isWaiting:true,
        })
      
        var reqData = "grant_type=password&username="+username+"&password="+password;

        axios.request({
            url: AppConsts.remoteServiceBaseUrl+ "/web/oauth/token?"+reqData,
            method: "get",
           // data:reqData,
            headers: { 
                //"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: 'Basic dGVzdDE6dGVzdDExMTE=' 
            }
        }).then(function(res:any) {
          
            console.log(res);  
            debugger;
            const response=res.data;

            if( response['msg']!=null ){

                Warning((response as JsonBody<any>).msg);
                
            }else if(response.access_token!=null){

                Info("用户登录验证成功");

                setCookie('login_name',username);
                setCookie('login_pwd',password);
    
                setCookie('login_token',response.access_token);
                AppConsts.authorization.token=response.access_token;
    
                console.log('in :'+AppConsts.authorization.token);
                console.log('out :'+getCookie('login_token'));
    
                window.location.href='/#/';
            }else{
                Error("请求失败，出现异常");
            }

        }).catch(function (error) {
            // handle error
            Error("登录验证失败");
            console.log(error);
          })
          .then(function () {
            //always executed
            //Error("网络请求失败");
            me.setState({isWaiting:false});
          });

    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        let { from } = this.props.location.state || { from: { pathname: '/' } };

        //if (AppConsts.authorization.token!='') return <Redirect to={from} />;

        return ( <div className="login-page">
        <Panel style={{width:"450px",margin:"30px"}}>
        <Form >
            <Form.FormItem>
                <Label>用户名</Label>
                <FormControl placeholder="请输入用户名"
                    {...getFieldProps('username', {
                        validateTrigger: 'onBlur',
                        initialValue:this.props.accountStore.loginInfo.username,
                        rules: [{
                            required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                        }],
                    }) }
                />
                <span className='error'>
                    {getFieldError('username')}
                </span>
            </Form.FormItem>
            <Form.FormItem>
                <Label>密码</Label>
                <FormControl placeholder="请输入密码" type='password'
                    {...getFieldProps('password', {
                        validateTrigger: 'onBlur',
                        initialValue:this.props.accountStore.loginInfo.password,
                        rules: [{
                            required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入密码</span></span>,
                        }],
                    }) }
                />
                <span className='error'>
                    {getFieldError('password')}
                </span>
            </Form.FormItem>
            <Form.FormItem style={{'paddingLeft':'106px'}}>
                <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
                
                <LoadingState
				    onClick={ this.submit }
                    colors="primary"
                    className="login"
				    show={ this.state.isWaiting }
				    loadingText="登录中...">
				    登录
			    </LoadingState>

            </Form.FormItem>
        </Form>
        </Panel>
    </div>
            )
    }
}

export default Form.createForm()(Login);