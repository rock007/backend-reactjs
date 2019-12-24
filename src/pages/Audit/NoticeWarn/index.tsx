import * as React from 'react';
import {Panel,Loading,Tag ,Label,Icon,Radio,Select,Form,FormControl, Breadcrumb } from 'tinper-bee';
import DatePicker from "bee-datepicker";

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';
import SelectDict from '../../../components/SelectDict';
import ManCateSelect from '../../../components/ManCateSelect';

import {getValidateFieldsTrim, convertWarnTypeText} from '../../../utils/tools';
import BussService from '../../../services/BussService';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../../components/PageDlg';
import { Info } from '../../../utils';

const FormItem = FormListItem;
const {Option} = Select;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

/**
 * 通知函审核
 */
 class NoticeWarnPage extends React.Component<IPageProps,IPageState> {

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
        let page = await BussService.searchWarn(args,this.pageIndex,this.pageSize) as PageModel<any>;

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
    
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const me=this;
        const columns = [
            { title: '姓名', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 150 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/audit/warn-view/'+record.id,'查看',false)}}>{text}</Label>;
                
              }},
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 },
            { title: '类型', dataIndex: 'warnType', key: 'warnType',textAlign:'center', width: 100 ,
                render(text,record,index) {

                return convertWarnTypeText(text);
              }},
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 200 },
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 150,render(text,record,index) {
                  
                return text==0?<Tag colors="danger">未接收</Tag>:(text==1?<Tag colors="info">进行中</Tag>:text==2?<Tag colors="success">已完成</Tag>:<Tag colors="warning">未知</Tag>);

            } },
            { title: '流程', dataIndex: 'wfProcId', key: 'wfProcId',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/sys/flow/'+text,'跟踪',false)}}>跟踪</Label>;
                
            }},
            { title: '社工', dataIndex: 'linkName', key: 'linkName',textAlign:'center', width: 150 },
            { title: '民警', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '处理结果', dataIndex: 'mjResp', key: 'mjResp',textAlign:'center', width: 200 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];
        
          const toolBtns = [{
                    value:'操作',
                    bordered:false,
                    colors:'primary',
                    disabled:this.state.checkedRows.length>1?true:false,
                    onClick:()=>{
                        
                        if(this.state.checkedRows.length>1){
        
                            Info('操作只能选择一条记录');
        
                        }else if(this.state.checkedRows.length==1){
        
                            this.go2Page('/audit/warn-view/'+this.state.checkedRows[0].id,"通知函操作",false);
        
                        }else{
                            Info('请选择要操作的记录');
                        }
                    }
                },{
                    value:'回复',
                    disabled:this.state.checkedRows.length>1?true:false,
                    onClick:()=>{
                        
                        if(this.state.checkedRows.length>1){
        
                            Info('回复只能选择一条记录');
        
                        }else if(this.state.checkedRows.length==1){
        
                            this.go2Page('/forhelp-edit/'+this.state.checkedRows[0].id,"通知函回复",false);
        
                        }else{
                            Info('请选择要回复的记录');
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
			      通知函
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}>
                <FormList size="sm">
                <FormItem
                        label="姓名" >
                        <FormControl placeholder='请输入戒毒人员姓名'  {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式" >
                        <FormControl placeholder='请输入联系方式'  {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号">
                        <FormControl placeholder='请输入身份证号'  {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别">
                        <Select  {...getFieldProps('sex', {initialValue: ''})}>
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict {...getFieldProps('level', {initialValue: ''})} type={31}/>
                    </FormItem>
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="类型">
                        <Select {...getFieldProps('warnType', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="1">未报到</Option>
                            <Option value="2">尿检阳性</Option>
                            <Option value="3">拒绝检查</Option>
                            <Option value="4">失联</Option>
                            <Option value="5">其它</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
                        <DatePicker.RangePicker
                         {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="状态"  >
                        <Radio.RadioGroup {...getFieldProps('status', {initialValue: '0'})}>
                           <Radio value="0">待接收</Radio>
                            <Radio value="1">处理中</Radio>
                            <Radio value="2">已完成</Radio>
                        </Radio.RadioGroup>
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
                    onClose={(flag:number)=>{this.setState({isPopPage:false});if(flag==1)this.search();}} >
                </PageDlog>
        </Panel >)
    }
}

export default Form.createForm()(NoticeWarnPage);