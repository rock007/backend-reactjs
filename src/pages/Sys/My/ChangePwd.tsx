import * as React from 'react';

import { Panel,Breadcrumb ,Loading, FormControl,Icon, Col,Label,Form,Radio,Button  } from 'tinper-bee';

import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import { Warning, getValidateFieldsTrim, Info } from '../../../utils';
import SysService from '../../../services/SysService';
const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class ChangePwd extends React.Component<IPageProps,IPageState> {

    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    state:IPageState={
        isLoading:false,
        record:{},
    }

    componentDidMount() {

    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(0);
        }
    }

    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            if (err) {
                console.log('校验失败', values);
                Warning("请检查输入数据，验证失败");
            } else {

                this.setState({isLoading:true});
                SysService.changePwd(values)
                    .then((resp)=>{
    
                        Info(resp);
                        this.goBack();
                    })
                    .catch((resp)=>{
    
                        this.setState({isLoading:false});
                        Warning(resp.data);
                });
            }
        });

    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return (  <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    个人信息
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    修改密码
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
              </Breadcrumb>:null
              }

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>旧密码</Label>
                        <FormControl placeholder="请输入原来密码"
                            {...getFieldProps('oldPwd', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入原来密码</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>密码格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('oldPwd')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>新密码</Label>
                        <FormControl placeholder="请输入新密码"
                            {...getFieldProps('newPwd', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入新密码</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>新密码格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('newPwd')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>重复密码</Label>
                        <FormControl placeholder="请输入重复密码"
                            {...getFieldProps('rePwd', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入重复密码</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>重复密码格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('rePwd')}
                        </span>
                    </FormItem>
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border"  onClick={this.goBack} style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                    </Form>  
            
            </Panel>)
    }
}

export default Form.createForm()(ChangePwd);