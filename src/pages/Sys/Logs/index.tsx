import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';

import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../../services/Model/Models';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

import PageDlog from '../../../components/PageDlg';
import { getValidateFieldsTrim } from '../../../utils/tools';

import SysService from '../../../services/SysService';

import DatePicker from "bee-datepicker";
import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

class LogsPage extends React.Component<IPageProps,IPageState> {
    
    pageIndex=1
    pageSize=10
    orderBy=[]

    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
        pageModel:new PopPageModel(),
        isPopPage:false,

        isDeleteAlterShow:false
     }

    componentDidMount() {

        this.search();
    }
    search= ()=>{
        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);
            
            if(values.orgId){
                values.orgId=JSON.parse(values.orgId).refpk;
            }

            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }
            if(values.visitorDate){
                values.visitorDate=values.visitorDate[0].format('YYYY-MM-DD')+'~'+values.visitorDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        args['orderby']=this.orderBy;
        let page = await SysService.searchLog(args,this.pageIndex,this.pageSize) as PageModel<any>;
        this.setState({page:page,isLoading:false});
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
     
    export = ()=>{
        console.log('export=======');
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
            { title: '标题', dataIndex: 'title', key: 'title',textAlign:'center', width: 150 },
            
            { title: '内容', dataIndex: 'content', key: 'content',textAlign:'center', width: 300 },
            { title: '操作者', dataIndex: 'trueName', key: 'trueName',textAlign:'center', width: 120 },
         
            { title: '角色', dataIndex: 'roles', key: 'roles',textAlign:'center', width: 120},
            
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            
            { title: '社区', dataIndex: 'deptName', key: 'deptName',textAlign:'center', width: 150 }
          ];

          const toolBtns = [];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      系统管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      日志查询
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true} >
                <FormList size="sm">
                <FormItem
                        label="标题">
                        <FormControl placeholder='请输入标题' {...getFieldProps('title', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="操作者">
                        <RefUserTreeTableSelect  {
                            ...getFieldProps('createUid', {
                                validateTrigger: 'onBlur',
                                initialValue: '',
                                rules: [{ required: false }],message: <span><Icon type="uf-exc-t"></Icon><span>请选择操作者</span></span>
                            }
                    )}/>
                    </FormItem>
                   
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect  {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="创建时间">
                        <DatePicker.RangePicker  {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onChange={()=>{}}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                        />
                    </FormItem>
                </FormList>
                </SearchPanel>

        <Grid
            isLoading={this.state.isLoading}
            isExport={false}
            toolBtns={toolBtns}
            columns={columns}
            page={this.state.page}
            getSelectedDataFunc={this.getSelectedDataFunc}
            pageChange={this.onPageChange}
        />
         <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
          </PageDlog>
        </Panel >)
    }
}

export default Form.createForm()(LogsPage);