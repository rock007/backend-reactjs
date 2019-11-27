import * as React from 'react';
import {Panel,Label,Select, FormControl,Form,Tag,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../../components/Grid';
import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import PageDlog from '../../../components/PageDlg';

import {PageModel, PopPageModel} from '../../../services/Model/Models';

import SelectDict from '../../../components/SelectDict';
import ManCateSelect from '../../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";
import ManService from '../../../services/ManService';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info } from '../../../utils';

const FormItem = FormListItem;
const {Option} = Select;

interface IPageProps {
    form:any,
    history:any,
}
interface IPageState {
    page:PageModel<any>,
    isLoading:boolean,
    checkedRows:Array<any>,

    pageModel: PopPageModel,
    isPopPage:boolean,
}

 class NiaojianSchedulePage extends React.Component<IPageProps,IPageState> {

    pageIndex=1
    pageSize=10
    orderBy=[]

    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
        pageModel:new PopPageModel(),
        isPopPage:false,
    }

    async componentDidMount() {

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
            if(values.testDate){
                values.testDate=values.testDate[0].format('YYYY-MM-DD')+'~'+values.testDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        
        args['orderby']=this.orderBy;
        let page = await ManService.searchNiaojianPlan(args, this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({page:page,isLoading:false});
    }

    getSelectedDataFunc = data => {
        this.setState({checkedRows:data});
    };
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
    
    export = ()=>{
        console.log('export=======');
    }
   
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const me=this;
        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {
                
                return <Label  className='link-go' onClick={()=>{me.go2Page('/niaojian-schedule-detail/'+record.id,'尿检计划详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
            },
            { title: '时间区间', dataIndex: 'startDate', key: 'startDate', textAlign:'center',width: 120,render(text,record,index) {

                return text+'~'+record.endDate;
            }},
            { title: '第几年', dataIndex: 'year', key: 'year', textAlign:'center',width: 80 },
            { title: '状态', dataIndex: 'status', key: 'status', textAlign:'center',width: 80 ,
                render(text,record,index) {

                    if(text==0) return "未到";
                    if(text==1) return <Tag colors="warning">待尿检</Tag>;
                    if(text==2) return <Tag colors="success">已完成</Tag>;
                    if(text==3) return <Tag colors="danger">已过期</Tag>;

                    return text;
            }},
            { title: '完成时间', dataIndex: 'finishDate', key: 'finishDate', textAlign:'center',width: 120 },
            { title: '结果', dataIndex: 'result', key: 'result', textAlign:'center',width: 100 },
           
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c},
            },
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            sorter: (pre, after) => {return pre.c - after.c},
            }
          ];
        
          const toolBtns = [/*{
            value:'生成计划',
            bordered:false,
            colors:'primary',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('生成计划只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/niaojian-generate/'+this.state.checkedRows[0].id,"生成计划",false);

                }else{
                    Info('请选择要生成计划的记录');
                }
            }
        },**/{
            value:'导出',
            iconType:'uf-search',
            onClick:this.export
        }];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      社戒管控
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      尿检计划
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}
            >

                <FormList size="sm">
                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='戒毒人员姓名' {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别">
                        <Select  {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict  {...getFieldProps('level', {initialValue: ''})} type={31}/>
                    </FormItem>

                    <FormItem
                        label="社区" >
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="计划区间"
                    >
                         <DatePicker.RangePicker  {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="状态">
                        <Radio.RadioGroup  {...getFieldProps('status', {initialValue: ''})}>
                            <Radio value="">全部</Radio>
                            <Radio value="0">未到</Radio>
                            <Radio value="1">待尿检</Radio>
                            <Radio value="2">已完成</Radio>
                            <Radio value="3">已过期</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem
                        label="检查类型">
                        <Select  {...getFieldProps('examType', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="0">尿检</Option>
                            <Option value="1">评估</Option>
                            <Option value="2">走访</Option>
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

export default Form.createForm()(NiaojianSchedulePage);