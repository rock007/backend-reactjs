import * as React from 'react';
import {Panel,Row,Col, Loading,Radio,Select,Label, FormControl,Form,Tag, Breadcrumb ,Checkbox} from 'tinper-bee';
import Alert from '../../../components/Alert';
import Grid from '../../../components/Grid';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import SysService from '../../../services/SysService';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import { getValidateFieldsTrim } from '../../../utils/tools';

import OrgPanel from '../../../pages/Sys/Org/Panel';
import RefOrgTreeSelect from '../../../components/RefViews/RefOrgTreeSelect';
import AppConsts from '../../../lib/appconst';
import { Info } from '../../../utils';
import PageDlog from '../../../components/PageDlg';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IOtherProps {
    
} 

interface IOtherState {
    roles:Array<any>,
    isResetAlterShow:boolean
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class UserPage extends React.Component<IPageProps,IPageState> {
    
    orgId:string=''

    orderBy=[]

    pageIndex:number=1
    pageSize:number=10

    refs:{
        [string: string]: any;
        grid:any;
    }
    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
      
        pageModel:new PopPageModel(),
        isPopPage:false,
      
        isDeleteAlterShow:false,
        isResetAlterShow:false,
        roles:[]
    }
    componentDidMount() {
        this.search();
    }

    search=async ()=>{
      
        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);
           
            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }
            values['orgIdSelected']=this.orgId;
            //console.log('Search:'+JSON.stringify(values));

            //let queryParam = deepClone(this.props.queryParam);
         
           this.pageIndex=1;
           this.loadData(values);
        });
      }

      loadData= async (args)=>{
       
        args['orderby']=this.orderBy;
        //args['isMan']=0;

        this.setState({isLoading:true});
        let page = await SysService.searchAccount(args,this.pageIndex,this.pageSize) as PageModel<any>;

        const  rolePage=await SysService.searchRole({}) as PageModel<any>;

        this.setState({page:page,roles:rolePage.data,isLoading:false});
      }

      onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.orderBy=orderBy;
        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.search();
     }

      clear=()=>{
        this.props.form.resetFields();

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            //!!let queryParam = deepClone(this.props.queryParam);
            //!!let {whereParams} = queryParam;

            let arrayNew = [];
            for (let field in values) {
                arrayNew.push({key: field});
            }

            console.log('resetSearch:'+JSON.stringify(arrayNew));

        });
      }

    getSelectedDataFunc = (data, record, index) => {

        this.setState({checkedRows:data});
    }
    go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
        if(isPage){
            this.props.history.push(url);
        }else{
            const model=new PopPageModel(title,url);
  
            model.size=size;
  
            this.setState({isPopPage:true,pageModel:model});
        }
    }
    export = ()=>{
        console.log('export=======');
        this.refs.grid.exportExcel();
    }
    alertDel=()=>{
      
        if(this.state.checkedRows.length==0){
  
          Info('请选择要删除的记录');
          return;
        }
        this.setState({isDeleteAlterShow:true});
  
      }
      handler_delete=async()=>{
  
        this.setState({isLoading:true,isDeleteAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));
        await SysService.deleteAccount(arr.join(','))
          .then((resp)=>{
  
            //Info(resp);
            this.search();
  
          }).catch((err)=>{
  
            Error(err.msg||'删除操作失败！');
           
          }).finally(()=>{this.setState({isLoading:false})});
        
      }

      handler_resetPwd=async()=>{
  
        this.setState({isLoading:true,isResetAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));
        await SysService.resetAccountPwd(arr.join(','))
          .then((resp)=>{
  
            Info(resp);
            this.search();
  
          }).catch((err)=>{
  
            Error(err.msg||'密码重置操作失败！');
           
          }).finally(()=>{this.setState({isLoading:false})});
        
      }
      handler_org_selected=(rec)=>{

        if(rec!=null&&rec.length>0){

            this.orgId=rec[0];
            this.search();
        }
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const me=this;
        const columns = [
            { title: '帐号', dataIndex: 'userName', key: 'userName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label className='link-go' onClick={()=>{me.go2Page('/user-edit/'+record.id,'帐号详细',false)}}>{text}</Label>;

              }},
            { title: '姓名', dataIndex: 'trueName', key: 'trueName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 ,render(m){

                return m==null?'':m==1?'男':'女';
            }},
            { title: '手机', dataIndex: 'mobile', key: 'mobile',textAlign:'center', width: 120 },
            { title: '角色', dataIndex: 'roles', key: 'roles', width: 100,textAlign:'center' ,render(m){

                if(m!=null&&m.length>0){

                   var html=  m.split(',').map(element => {
                        
                        return (<li style={{paddingBottom:'3px'}}>
                            <Tag colors={"success"}>{element}</Tag>
                            </li>
                            )
                    });

                    return (<ul>{html}</ul>)
                }
                return '';
            }},
            { title: '是否戒毒人员', dataIndex: 'manId', key: 'manId', width: 120,textAlign:'center',render(m){

                return m==null||m===''?(<Tag colors={"success"}>否</Tag>):(<Tag colors={"danger"}>是</Tag>)

            } },
            { title: '组织部门', dataIndex: 'orgName', key: 'orgName', width: 200,textAlign:'center' },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            
          ];
      
          const toolBtns = [{
            value:'新增',
            attr:'act_account_add',
            bordered:false,
            colors:'primary',
            onClick:()=>{this.go2Page('/user-edit/0','新增帐号',AppConsts.getOpenModel())}
        },{
            value:'修改',
            attr:'act_account_update',
            iconType:'uf-edit',
            disabled:this.state.checkedRows.length>1?true:false ,
            onClick:()=>{
             
              if(this.state.checkedRows.length==0){

                Info('请选择要编辑的记录');
                return;
              }
              if(this.state.checkedRows.length>1){

                Info('编辑记录只能选择一条');
                return;
              }
              this.go2Page('/user-edit/'+this.state.checkedRows[0].id,'编辑帐号',AppConsts.getOpenModel())
             
            }

        },{
            value:'密码重置',
            attr:'act_account_reset',
            disabled:this.state.checkedRows.length>1?true:false ,
            onClick:()=>{
             
              if(this.state.checkedRows.length==0){

                Info('请选择要密码重置的记录');
                return;
              }
              if(this.state.checkedRows.length>1){

                Info('密码重置记录只能选择一条');
                return;
              }

              this.setState({isResetAlterShow:true});
             
            }
        },{
            value:'删除',
            attr:'act_account_delete',
            iconType:'uf-delete',
            onClick:this.alertDel 
        }];

       
        return ( <Panel>
            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      系统管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      用户管理
			    </Breadcrumb.Item>
			</Breadcrumb>
            <Row>
                <Col md="2">
                    <OrgPanel onClick={this.handler_org_selected}/>
                </Col>
                <Col md="10">
                <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}>

                <FormList size="sm">
                    <FormItem
                        label="帐号">
                        <FormControl placeholder='请输入帐号' {...getFieldProps('userName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="姓名" >
                        <FormControl placeholder='请输入姓名' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="手机号" >
                        <FormControl placeholder='请输入手机号' {...getFieldProps('mobile', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别">
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="创建时间">
                        <DatePicker.RangePicker
                            {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>

                    <FormItem
                        label="戒毒人员">
                        <Radio.RadioGroup
                            {...getFieldProps('isMan', {initialValue: '0'})}>
                            <Radio value="1" >是</Radio>
                            <Radio value="0" >否</Radio>
                        </Radio.RadioGroup>
                    </FormItem>

                    <FormItem
                        label="角色">
                         <Select {...getFieldProps('roleIds', {initialValue: ''})}>
                            
                                {
                                  this.state.roles.map((m,i)=> <Option value={m.id}>{m.roleName}</Option>)
                                }
                        </Select>
                       
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Grid
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    isLoading={this.state.isLoading}
                    isExport={false}
                    pageChange={this.onPageChange}
                />
                 </Col>
            </Row>   

           
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={(flag)=>{
                        this.setState({isPopPage:false});
                        if(flag==1) this.search();
                        }} >
            </PageDlog>
            <Alert show={this.state.isDeleteAlterShow} context="确定要删除记录?"
                           confirmFn={() => {
                               this.handler_delete();
                           }}
                           cancelFn={() => {
                              this.setState({isDeleteAlterShow:false})
                           }}
            />
            <Alert show={this.state.isResetAlterShow} context="确定要重置所选帐号密码?"
                           confirmFn={() => {
                               this.handler_resetPwd();
                           }}
                           cancelFn={() => {
                              this.setState({isResetAlterShow:false})
                           }}
            />
        </Panel >)
    }
}

export default Form.createForm()(UserPage);