import * as React from 'react';

import { Panel,Loading,Row,Breadcrumb,Col,FormControl,Select,Label,Form,Button,Icon } from 'tinper-bee';
import { Warning, Info } from '../../../../utils';
import SysService from '../../..//../services/SysService';
import MenuTreeSelect from '../Panel/MenuTreeSelect';

import './index.scss';
import { IPageDetailProps,IPageDetailState } from '../../../../services/Model/Models';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    isEdit:boolean
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class PermissionEditPage extends React.Component<IPageProps,IPageState> {

    id:string='0'

    state:IPageState={
        record:{},
        isEdit:false,
        isLoading:false,
        selectedValue:''
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/permission-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }

     loadData=async (id)=>{

        const  data=await SysService.getPermissionById(id);
      
        this.setState({record:data,isLoading:false});
    }

    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }

    submit=(e)=>{

        this.props.form.validateFields((err, values) => {

            /** 
            if(this.state.record==null||this.state.record["id"]==null){
                //编辑状态
                if(this.state.selectedValue==null){

                    Warning("请选择权限上一级");
                    return;
                }


                values['parentId']=this.state.selectedValue;
                values['id']=this.id!=='0'?this.id:null;
            }
            ***/

            if (err) {
                console.log('校验失败', values);
                Warning("请检查输入数据，验证失败");
            } else {
                console.log('提交成功', values);

               // values['parentId']=this.state.selectedValue;
                values['id']=this.id!=='0'?this.id:null;
                this.doSave(values);
            }
        });

    }

    async doSave(values){

        this.setState({isLoading:true});
        await SysService.submitPermission(values)
            .then((resp)=>{

                Info(resp);
                this.goBack(1);
            })
            .catch((resp)=>{

                this.setState({isLoading:false});
                Warning(resp.data);
            });
    }

    onMenuTreeClick=(value,label)=>{

        if(value!=null){
            this.setState({selectedValue:value});
        }
    }

    render() {
        
        const { getFieldProps, getFieldError } = this.props.form;

        //const parentType=this.state.selectedValue!=null?this.state.selectedValue.type:100;

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
                      菜单权限
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    {this.id==='0'?"添加":"编辑"}
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack} >返回</a>
              </Breadcrumb>:null
              }
              
            <Row>

                <Col md="12">
                    <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>上一级</Label>
                        <MenuTreeSelect //onSelected={this.onMenuTreeClick}
                              {...getFieldProps('parentId', {
                                initialValue: this.state.record.parentId,
                                rules: [{
                                    required: true, message: '请选择上级',
                                }],
                            })}    
                             //defaultValue={this.state.record.parentId}  
                             allowType={[0,1]} showRoot={true}>
                        </MenuTreeSelect>
                        <span className='error'>
                            {getFieldError('parentId')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>类型</Label>
                        <Select 
                                {...getFieldProps('type', {
                                    initialValue: this.state.record.type,
                                    rules: [{
                                        required: true, message: '请选择类别',
                                    }],
                                })}
                        >
                            <Select.Option value={0}>模块</Select.Option>
                            <Select.Option value={1}>菜单</Select.Option>
                            <Select.Option value={2}>操作</Select.Option>
                        </Select>
                        <span className='error'>
                            {getFieldError('type')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl placeholder="请输入名称(不超过20个汉字)"
                            {...getFieldProps('name', {
                                initialValue: this.state.record.name,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('name')}
                        </span>
                    </FormItem>
                   
                    <FormItem>
                        <Label>URL</Label>
                        <FormControl placeholder="请输入URL地址" 
                            {
                            ...getFieldProps('url', {
                                initialValue: this.state.record.url
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>Method</Label>
                        <Select 
                                {...getFieldProps('method', {
                                    initialValue: this.state.record.method,
                                    rules: [{
                                        required: true, message: '请选择请求方法',
                                    }],
                                })}
                        >
                            <Select.Option value={"post"}>post</Select.Option>
                            <Select.Option value={"get"}>get</Select.Option>
                        </Select>
                        <span className='error'>
                            {getFieldError('method')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>权限值</Label>
                        <FormControl placeholder="请输入权限值(包含数字和字母，8-15位)"
                            {...getFieldProps('attr', {
                                initialValue: this.state.record.attr,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入权限值</span></span>,
                                }, {
                                    pattern: /[a-zA-Z0-9]$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>权限值格式错误</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('attr')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>图标</Label>
                        <FormControl placeholder="请输入图标class" {
                            ...getFieldProps('icon', {
                                initialValue: this.state.record.icon
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl  placeholder="请输入排序值" {
                            ...getFieldProps('index', {
                                initialValue: this.state.record.index,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    pattern: /[0-9]$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>只能输入数字</span></span>,
                                }],
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入说明"
                        {
                            ...getFieldProps('remarks', {
                                initialValue: this.state.record.remarks
                            }) 
                        }
                        />
                    </FormItem>
                   
                    <FormItem>
                        <Label>状态</Label>
                        <Select 
                                {...getFieldProps('status', {
                                    initialValue: this.state.record.status,
                                    rules: [{
                                        required: true, message: '请选择状态',
                                    }],
                                })}
                        >
                            <Select.Option value={0}>停用</Select.Option>
                            <Select.Option value={1}>正常</Select.Option>
                        </Select>
                        <span className='error'>
                            {getFieldError('status')}
                        </span>
                    </FormItem>
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </Panel>)
    }
}

export default Form.createForm()(PermissionEditPage);