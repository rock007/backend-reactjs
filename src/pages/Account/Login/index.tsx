import * as React from 'react';
import { Icon, Button, Label, FormControl, Form ,Panel,Col,Row} from 'tinper-bee';
import './index.scss';

export class Login extends React.Component<any> {
    componentDidMount() {

    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('提交成功', values)
            }
        });
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

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
                <Button colors="primary" className="login" onClick={this.submit}>登录</Button>
            </Form.FormItem>
        </Form>
        </Panel>
    </div>
            )
    }
}

export default Form.createForm()(Login);