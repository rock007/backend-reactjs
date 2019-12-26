import * as React from 'react';

import {Panel, Tag,Tabs,Icon,Select, FormControl,Button,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';

import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../../services/Model/Models';

import PageDlog from '../../../components/PageDlg';
import { getValidateFieldsTrim, Info, Warning } from '../../../utils';
import SysService from '../../../services/SysService';

import { convertBussTypeText, convertWarnTypeText } from '../../../utils/tools';
import PopDialog from '../../../components/Pop';
import AppConsts from '../../../lib/appconst';
import FlowPanel from '../../../components/WorkFlow';
import { isArray } from 'util';

const FormItem = FormListItem;
interface IOtherProps {
    
} 

interface IOtherState {
  
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

export  class ToDoPage extends React.Component<IPageProps,IPageState> {

    pageIndex=1
    pageSize=10
    orderBy=[]
    
    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
        pageModel:new PopPageModel(),
        isPopPage:false,

        isDeleteAlterShow:false,
        
     }

    componentDidMount() {
        this.search();
    }

    search= ()=>{
        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);
           
            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{

        let data = await SysService.myTodo(args);

        if(data[args.bussType]!=null){

            let page=new PageModel<any>();
            page.data=data[args.bussType];
            page.dataCount=data[args.bussType].length;

            this.setState({isLoading:false,page:page});
        }else{
            this.setState({isLoading:false,page:new PageModel<any>()});
        }
    }

    getSelectedDataFunc = data => {
        this.setState({checkedRows:data});
    }
    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.orderBy=orderBy;
        this.search();
    }

    clear=()=>{
        this.props.form.resetFields()
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

    render() {

        const { getFieldProps, getFieldError } = this.props.form;
        const me=this;
        const columns = [
            { title: '类型', dataIndex: 'msgType', key: 'msgType',textAlign:'center', width: 120,
            render: (text, record, index) => {
                return convertBussTypeText(text);
            }},
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 120 ,
            render: (text, record, index) => {
                return text==1?(<Tag colors={"success"}>已读</Tag>):(
                  <Tag colors={"info"}>未读</Tag>
                );
            }},
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 300 },
            { title: '发送者', dataIndex: 'sendFrom', key: 'sendFrom',textAlign:'center', width: 120 },
            { title: '时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 , sorter: (pre, after) => {return pre.c - after.c}},
           
          ];
         
          const warnColumns = [
            { title: '姓名', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },

            { title: '类型', dataIndex: 'warnType', key: 'warnType',textAlign:'center', width: 100 ,
                render(text,record,index) {

                return convertWarnTypeText(text);
              }},
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 200 },
            { title: '节点', dataIndex: 'tasks', key: 'tasks',textAlign:'center', width: 150,render(text,record,index) {
                  
                if(isArray(text)&&text.length>0){
                    
                    return <Tag colors="info">{text[0].name}</Tag>
                }
                return <Tag colors="info">{text}</Tag>
    
            } },
            { title: '流程', dataIndex: 'wfProcId', key: 'wfProcId',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/sys/flow/'+text,'跟踪',false)}}>跟踪</Label>;
                
            }},
            { title: '社工', dataIndex: 'linkName', key: 'linkName',textAlign:'center', width: 150 },
            { title: '民警', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];

          const toolBtns = [{
            value:'审批',
            bordered:false,
            colors:'primary',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
  
                if(this.state.checkedRows.length==0){

                    Info('请选择要审批的记录');
                    return;
                }
                //this.setState({isPopPage:true});
                //me.go2Page('/sys/flow/'+this.state.checkedRows[0].wfProcId,'审批',AppConsts.getOpenModel(),'lg');
                me.go2Page('/audit/warn-view/'+this.state.checkedRows[0].id,'通知函',AppConsts.getOpenModel(),'lg');

            }
        }];

        /** 
        <Select.Option value="">全部</Select.Option>
        <Select.Option value="1">{convertBussTypeText(1)}</Select.Option>
        <Select.Option value="2">{convertBussTypeText(2)}</Select.Option>
        <Select.Option value="3">{convertBussTypeText(3)}</Select.Option>
        
        <Select.Option value="5">{convertBussTypeText(5)}</Select.Option>
        <Select.Option value="6">{convertBussTypeText(6)}</Select.Option>
        <Select.Option value="7">{convertBussTypeText(7)}</Select.Option>
        <Select.Option value="8">{convertBussTypeText(8)}</Select.Option>
        <Select.Option value="9">{convertBussTypeText(9)}</Select.Option>
        */

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      我的待办
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true} >
                <FormList size="sm">

                    <FormItem
                        label="类别">
                        <Select  {...getFieldProps('bussType', {initialValue: '4'})}>
                            <Select.Option value="4">{convertBussTypeText(4)}</Select.Option>
                        </Select>
                    </FormItem>
                   
                </FormList>
                </SearchPanel>

        <Grid
            isLoading={this.state.isLoading}
            isExport={false}
            toolBtns={toolBtns}
            columns={warnColumns}
            page={this.state.page}
            getSelectedDataFunc={this.getSelectedDataFunc}
            pageChange={this.onPageChange}
        />
       
       <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={(flag:number)=>{this.setState({isPopPage:false});if(flag==1)this.search();}} >
        </PageDlog>
        </Panel >)
    
    }
}

export default Form.createForm()(ToDoPage);