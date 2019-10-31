import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Checkbox,Select, FormControl,Label,Form,Button,Icon ,Radio } from 'tinper-bee';

import PopDialog from '../../../../components/Pop';

import FormError from '../../../../components/FormError';
import {RefOrgTreeSelect} from '../../../../components/RefViews/RefOrgTreeSelect';

import './index.scss';

const FormItem = Form.FormItem;

interface IPageProps {
    form:any,
    onCloseEdit:()=>void,
    isShow:boolean,
    record?:any
}
interface IPageState {
    record?:any,
    selectedValue:any
}
export  class UserEditPage extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        selectedValue:''
    }
    componentDidMount() {

    }
    onCloseEdit = () => {

        this.props.onCloseEdit();
    }

    submit=()=>{

    }

    render() {
        
        const { getFieldProps, getFieldError } = this.props.form;

        let me=this;
        return ( <PopDialog
            show={this.props.isShow}
            title="用户编辑"
            size='lg'
            autoFocus={false}
            enforceFocus={false}
            close={this.onCloseEdit}
            className="process-all-view-pop"
        >
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
                                    ...getFieldProps('purchasingGroup',{
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
                            {getFieldError('purchasingGroup')}
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
                        <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary" className="login" onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>

        </PopDialog>)
    }
}

export default Form.createForm()(UserEditPage);