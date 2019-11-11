import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Icon, Button, Label, FormControl, Form ,Panel,LoadingState} from 'tinper-bee';
import request from '../../../utils/request';

import './index.scss';
import { Redirect } from 'react-router-dom';
import AccountStore from '../../../stores/AccountStore';
import Store from '../../../stores/StoreIdentifier';
import { Warning } from '../../../utils';

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

    }
    submit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            
            if (err) {
                console.log('校验失败', values);
                Warning("输入验证失败");
            } else {
                console.log('提交成功', values);
                this.props.accountStore.login(values.username,values.password);
            }

        });
    }

    doLogin = async () => {
        this.setState({
            isWaiting:true,
        })
        let ajax={
            url: 'http://localhost:10007/oauth/token?username=admin&password=123456&grant_type=password&scope=all',
        };
        let results = await request(ajax.url,{method:'get',data:{uid:'001'}});
        let treeData = [];
        debugger;
        if (!results || !results.data.length){
          this.setState({ 
            isWaiting:false
          });
          return false;
        }

    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        //let { from } = this.props.location.state || { from: { pathname: '/' } };
        //if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

        return ( <div className="login-page">
        <Panel style={{width:"450px",margin:"30px"}}>
        <Form >
            <Form.FormItem>
                <Label>用户名</Label>
                <FormControl placeholder="请输入用户名"
                    {...getFieldProps('username', {
                        validateTrigger: 'onBlur',
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