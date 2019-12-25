import * as React from 'react';
import {Panel, Tag,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';

import SelectDict from '../../../components/SelectDict';
import ManCateSelect from '../../../components/ManCateSelect';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";
import PageDlog from '../../../components/PageDlg';
import { getValidateFieldsTrim, Info } from '../../../utils';
import ManService from '../../../services/ManService';
import { convertBussModifyTypeText } from '../../../utils/tools';

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
            this.loadData(values);
        });
      }
      
      loadData= async (args)=>{
      
        this.setState({isLoading:true});
        let page =await ManService.searchBussModify(args,this.pageIndex,this.pageSize) as PageModel<any>;

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
   
    handler_audit=async ()=>{

        this.setState({isLoading:true,isDeleteAlterShow:false});
    
        let ids:string='';
        this.state.checkedRows.map((item,index)=>{
            ids=ids+','+item.id;
        });
       await ManService.submitCheckinAudit(ids).then(()=>{
    
            Info('操作成功');
            this.search();
        })
        .catch((err)=>{
            Error('操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 },
            { title: '类型', dataIndex: 'modifyType', key: 'modifyType',textAlign:'center', width: 100 ,
                render(text, record, index){
                    return convertBussModifyTypeText(text);
            }},
            { title: '原值', dataIndex: 'oldText', key: 'oldText', textAlign:'center',width: 200 },
            { title: '修改为', dataIndex: 'newText', key: 'newText',textAlign:'center', width: 150 },
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 200 ,
            render: (text, record, index) => {
                return text==1?(<Tag colors={"success"}>已通过</Tag>):(
                    text==-1?<Tag colors={"danger"}>已拒绝</Tag>:
                    text==0?<Tag colors={"warning"}>未处理</Tag>:text
                );
            }},
            { title: '操作人', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 150 },
            { title: '审核人', dataIndex: 'respUser', key: 'respUser',textAlign:'center', width: 150 },
            { title: '审核回复', dataIndex: 'resp', key: 'resp',textAlign:'center', width: 150 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];
          
          const toolBtns = [{
            value:'审批',
            attr:'act_man_buss_audit',
            bordered:false,
            colors:'primary',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('审批只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/audit/buss-modify/'+this.state.checkedRows[0].id,"社戒修改审批",false);

                }else{
                    Info('请选择要审批的记录');
                }
            }
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
                    onClose={(flag:number)=>{
                            this.setState({isPopPage:false});
                            if(flag==1) this.search();
                        }} >
                </PageDlog>
        </Panel >)
    }
}

export default Form.createForm()(AuditManBussModifyPage);