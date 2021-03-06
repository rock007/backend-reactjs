import * as React from 'react';

import { Checkbox,Panel,Loading,Breadcrumb, FormControl,Label,Form,Button,Icon ,Radio } from 'tinper-bee';

import FormError from '../../../../components/FormError';
import {RefOrgTreeSelect} from '../../../../components/RefViews/RefOrgTreeSelect';

import './index.scss';
import { IPageDetailProps, IPageDetailState, PageModel } from '../../../../services/Model/Models';
import SysService from '../../../../services/SysService';
import { Warning, getValidateFieldsTrim, Info } from '../../../../utils';
import UploadFile from '../../../../components/UploadFile';
import AppConsts from '../../../../lib/appconst';
import { convertFile } from '../../../../utils/tools';
import { isArray } from 'util';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    isEdit:boolean
    selectedValue:string,
    roles:Array<any>
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;


export  class UserEditPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    avatar:string=''

    state:IPageState={
        selectedValue:'',
        record:{},
        isEdit:false,
        isLoading:false,
        roles:[]
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

            //this.loadData(this.id);
        }
        this.loadData(this.id);
    }

    loadData=async (id)=>{

        let  data=[];
        if(this.id!=null&&this.id!='0'){
              data=await SysService.getAccountById(id);
        }
       
        const  rolePage=await SysService.searchRole({}) as PageModel<any>;
      
        this.setState({record:data,roles:rolePage.data,isLoading:false});
    }

    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }
    handler_uploadChange=(files:Array<any>,where:string)=>{

        if(files.length>0){

            this.avatar= files[0].url.replace(AppConsts.uploadUrl,'');
        }else{
            this.avatar='';
        }
    }
    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            if (err) {
                console.log('校验失败', values);
                Warning("请检查输入数据，验证失败");
            } else {

                if(values.orgId&&values.orgId!=''){

                    let oo=JSON.parse(values.orgId);
                    values.orgId=oo.refpk;
                    values.orgName=oo.refname;
                }

                if(values.roleIds&&isArray(values.roleIds)){

                    values.roleIds=values.roleIds.join(',');
                }

                values['id']=this.id!=='0'?this.id:null;
                values['avatar']=this.avatar;
                
                this.setState({isLoading:true});
                SysService.submitAccount(values)
                    .then((resp)=>{
    
                        this.goBack(1);
                    })
                    .catch((resp)=>{
    
                        this.setState({isLoading:false});
                       // Warning(resp.data);
                });
            }
        });

    }
    
    render() {
        
        const { getFieldProps, getFieldError } = this.props.form;

        let me=this;

        if(this.id!=='0'&&this.state.record.id==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }

        const roleOptions=this.state.roles.map(
            (item,index)=>{

                if(AppConsts.session.roles.indexOf('系统管理员')!==-1){

                    return  { label:item.roleName,'value':item.id, disabled: false}

                }else if(AppConsts.session.roles.indexOf('社区管理员')!==-1){

                    if(item.roleName==='系统管理员'){
                        return  { label:item.roleName,'value':item.id, disabled: true}
                    }else{
                        return  { label:item.roleName,'value':item.id, disabled: false}
                    }

                }else{

                    if(AppConsts.session.roles.indexOf( item.roleName)!==-1){
                        return  { label:item.roleName,'value':item.id, disabled: false}
                    }else{
                        return  { label:item.roleName,'value':item.id, disabled: true}
                    }
                }

               //return  { label:item.roleName,'value':item.id, disabled: false}
            });

        return ( <Panel>

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
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
              </Breadcrumb>:null
              }
            <Form className='edit_form_pop'>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>头像</Label></div>
                        <div>
                            <UploadFile maxSize={1}   uploadChange={this.handler_uploadChange} 
                             defaultFileList={convertFile(this.state.record.avatar)}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>用户名</Label>
                        <FormControl placeholder="请输入用户名"
                            {...getFieldProps('userName', {
                                validateTrigger: 'onBlur',
                                initialValue: this.state.record.userName,
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                                }, {
                                    pattern: /^\w{3,18}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>账号只能由数字、字母或者下划线组成，长度在3-18之间</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('userName')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>姓名</Label>
                        <FormControl placeholder="请输入姓名(不超过20个汉字)"
                            {...getFieldProps('realName', {
                                validateTrigger: 'onBlur',
                                initialValue: this.state.record.trueName,
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入姓名</span></span>,
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
                            {
                            ...getFieldProps('sex', {
                                initialValue: this.state.record.sex+'',
                                rules: [{ required: true }]
                            }
                            ) }>
                            <Radio value="1" >男</Radio>
                            <Radio value="0" >女</Radio>
                        </Radio.RadioGroup>
                        <FormError errorMsg={getFieldError('sex')}/>
                    </FormItem>
                    <FormItem>
                        <Label>手机号</Label>
                        <FormControl placeholder="请输入手机号(仅数字11位)"
                            {...getFieldProps('mobile', {
                                validateTrigger: 'onBlur',
                                initialValue: this.state.record.mobile,
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入手机号</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('mobile')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>组织部门</Label>
                        <RefOrgTreeSelect  {
                            ...getFieldProps('orgId', {
                                initialValue: JSON.stringify({refpk:this.state.record.orgId,refname:this.state.record.orgName}),
                                rules: [{ required: true ,
                                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/,
                                    message: <span><Icon type="uf-exc-t"></Icon><span>请选择组织部门</span></span>}]
                            })
                    }/>
                        
                        <FormError errorMsg={getFieldError('orgId')}/>
                    </FormItem>
                    <FormItem style={{display:'flex'}}>
                        <Label>角色</Label>
                        <div style={{display:'inline-block',width:'auto'}}>
                        <Checkbox.CheckboxGroup    options={roleOptions}
                                {
                                    ...getFieldProps('roleIds',{
                                        initialValue:this.state.record.roleIds!=null?this.state.record.roleIds.split(','):'',
                                        rules: [{ required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请选择角色</span></span> }]
                                    })
                                }>
                           
                        </Checkbox.CheckboxGroup>
                        </div>
                        <span className='error'>
                            {getFieldError('roleIds')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>状态</Label>
                        <Radio.RadioGroup
                            {
                            ...getFieldProps('status', {
                                initialValue: this.state.record.status+'',
                                rules: [{ required: true }]
                            }) }>
                            <Radio value="1" >正常</Radio>
                            <Radio value="0" >禁用</Radio>
                        </Radio.RadioGroup>
                        <FormError errorMsg={getFieldError('status')}/>
                    </FormItem>
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border"  onClick={this.goBack.bind(this,1)} style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>

        </Panel>)
    }
}

export default Form.createForm()(UserEditPage);