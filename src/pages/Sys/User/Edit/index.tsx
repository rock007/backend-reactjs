import * as React from 'react';

import { Checkbox,Panel,Loading,Breadcrumb, FormControl,Label,Form,Button,Icon ,Radio } from 'tinper-bee';

import FormError from '../../../../components/FormError';
import {RefOrgTreeSelect} from '../../../../components/RefViews/RefOrgTreeSelect';

import './index.scss';
import { IPageDetailProps, IPageDetailState } from '../../../../services/Model/Models';
import SysService from '../../../../services/SysService';
import { Warning, getValidateFieldsTrim, Info } from '../../../../utils';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    isEdit:boolean
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;


export  class UserEditPage extends React.Component<IPageProps,IPageState> {

    id:string='0'

    state:IPageState={
        selectedValue:'',
        record:{},
        isEdit:false,
        isLoading:false,
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/user-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        const  data=await SysService.getAccountById(id);
      
        this.setState({record:data,isLoading:false});
    }

    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }

    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            if (err) {
                console.log('校验失败', values);
                Warning("请检查输入数据，验证失败");
            } else {

                values['id']=this.id!=='0'?this.id:null;
                this.setState({isLoading:true});
                SysService.submitAccount(values)
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

        let me=this;
        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    系统管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                      用户管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    {this.id==='0'?"添加":"编辑"}
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
              </Breadcrumb>:null
              }
            <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>用户名</Label>
                        <FormControl placeholder="请输入用户名(包含数字和字母，8-15位)"
                            {...getFieldProps('username', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>用户名格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>姓名</Label>
                        <FormControl placeholder="请输入姓名(不超过20个汉字)"
                            {...getFieldProps('realName', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入姓名</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>姓名输入错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>性别</Label>
                        <Radio.RadioGroup
                            selectedValue={this.state.selectedValue}
                            {
                            ...getFieldProps('sex', {
                                initialValue: '',
                                onChange(value) {
                                    me.setState({ selectedValue: value });
                                },
                                rules: [{ required: true }]
                            }
                            ) }
                        >
                            <Radio value="1" >男</Radio>
                            <Radio value="0" >女</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Label>手机号</Label>
                        <FormControl placeholder="请输入手机号(仅数字11位)"
                            {...getFieldProps('mobile', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入手机号</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)[0-9]{11}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>手机号格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>组织部门</Label>
                        <RefOrgTreeSelect />
                        
                        <FormError errorMsg={getFieldError('dept')}/>
                    </FormItem>
                    <FormItem>
                        <Label>角色</Label>
                        <Checkbox.CheckboxGroup 
                                {
                                    ...getFieldProps('roleIds',{
                                        initialValue:['2'],
                                        rules: [{ required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请选择角色</span></span> }]
                                    })
                                }
                            >
                                <Checkbox value='1'>系统管理员</Checkbox>
                                <Checkbox value='2'>社区管理员</Checkbox>
                                <Checkbox value='3'>专职社工</Checkbox>
                                <Checkbox value='4'>社区民警</Checkbox>
                                <Checkbox value='5'>社区医生</Checkbox>
                        </Checkbox.CheckboxGroup>
                        <span className='error'>
                            {getFieldError('roleIds')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>状态</Label>
                        <Radio.RadioGroup
                            selectedValue={this.state.selectedValue}
                            {
                            ...getFieldProps('importance', {
                                initialValue: '',
                                onChange(value) {
                                    me.setState({ selectedValue: value });
                                },
                                rules: [{ required: true }]
                            }
                            ) }
                        >
                            <Radio value="0" >正常</Radio>
                            <Radio value="1" >禁用</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border"  onClick={this.goBack} style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>

        </Panel>)
    }
}

export default Form.createForm()(UserEditPage);