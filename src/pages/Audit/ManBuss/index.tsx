import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';
import SelectDict from '../../../components/SelectDict';
import ManCateSelect from '../../../components/ManCateSelect';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';

import DatePicker from "bee-datepicker";
import PageDlog from '../../../components/PageDlg';
import { getValidateFieldsTrim } from '../../../utils';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

//社戒信息修改
class AuditManBussModifyPage extends React.Component<IPageProps,IPageState> {

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

    search=()=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);
           
            if(values.orgId){
                values.orgId=JSON.parse(values.orgId).refpk;
            }

            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }

            this.pageIndex=1;
            //this.loadData(values);
        });
      }
      
      loadData= async (args)=>{
      
        this.setState({isLoading:true});
        let page =null; //await BussService.searchWarn(args,this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({page:page,isLoading:false});
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
 
    getSelectedDataFunc = data => {
        this.setState({checkedRows:data});
    }

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.orderBy=orderBy;
        this.search();
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
    }
   
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '姓名', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 },
            { title: '类型', dataIndex: 'warnType', key: 'warnType',textAlign:'center', width: 100 },
            { title: '原值', dataIndex: 'content', key: 'content', textAlign:'center',width: 200 },
            { title: '修改为', dataIndex: 'linkName', key: 'linkName',textAlign:'center', width: 150 },
            { title: '状态', dataIndex: 'mjResp', key: 'mjResp',textAlign:'center', width: 200 },
            { title: '操作人', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '审核人', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];
          
          const toolBtns = [{
            value:'审批',
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        }];

      
        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      业务审核
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      社戒修改
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}>

                <FormList size="sm">
                <FormItem
                        label="姓名">
                        <FormControl placeholder='请输入戒毒人员姓名'  {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式">
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号">
                        <FormControl placeholder='请输入身份证号'  {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别" >
                        <Select  {...getFieldProps('sex', {initialValue: ''})}>
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect  {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict  {...getFieldProps('level', {initialValue: ''})} type={31}/>
                    </FormItem>
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
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
                        label="类型">
                        <Select  {...getFieldProps('modifyType', {initialValue: ''})}>
                            <Select.Option value="">(请选择)</Select.Option>
 
                            <Select.Option value="1" >转移社区</Select.Option>
                            <Select.Option value="2" >修改人员分类</Select.Option>
                            <Select.Option value="3" >修改风险等级</Select.Option>
                            <Select.Option value="4" >修改所属网格</Select.Option>
                            <Select.Option value="5" >修改报到时间</Select.Option>

                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Grid
                    isLoading={this.state.isLoading}
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

export default Form.createForm()(AuditManBussModifyPage);