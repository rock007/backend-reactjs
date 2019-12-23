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
import { getValidateFieldsTrim } from '../../../utils';
import ManService from '../../../services/ManService';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class ManReleasePage extends React.Component<IPageProps,IPageState> {

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
  
            this.setState({isLoading:true});
            this.loadData(values);
        });
    }
  
    loadData=async (args:any)=>{
        
        args['orderby']=this.orderBy;
        let page = await ManService.searchBack(args,this.pageIndex,this.pageSize) as PageModel<any>;
        
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
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/checkin-detail/'+record.id,'签到详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
             },
             { title: '原因', dataIndex: 'remarks', key: 'remarks', textAlign:'center',width: 250 },
             { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 120,
             render(text,record,index) {
                   
                 return text==0?<Tag colors="warning">未处理</Tag>:(text==1?<Tag colors="success">通过</Tag>:text==-1?<Tag colors="warning">未通过</Tag>:<Tag colors="warning">未知</Tag>);
 
             }},
            { title: '时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 180,sorter: (pre, after) => {return pre.c - after.c},},
            { title: '创建者', dataIndex: 'createUser', key: 'createUser', textAlign:'center',width: 100 },
          ];
          
        const toolBtns = [];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      业务审核
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      解除戒毒
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true} >
                <FormList size="sm">
                <FormItem
                        label="身份证号"  >
                        <FormControl placeholder='精确查询' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="姓名"  >
                        <FormControl placeholder='模糊查询' {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式">
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="性别">
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
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
                        <SelectDict  type={31} {...getFieldProps('level', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="创建时间">
                        <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                            {...getFieldProps('createDate', {initialValue: ''})}
                        />
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

        </Panel >)
    }
}

export default Form.createForm()(ManReleasePage);