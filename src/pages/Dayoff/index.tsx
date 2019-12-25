import * as React from 'react';
import {Panel,Select, FormControl,Label,Form,Radio,Tag,Breadcrumb } from 'tinper-bee';

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import {PageModel, PopPageModel} from '../../services/Model/Models';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../components/PageDlg';

import DatePicker from "bee-datepicker";

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

import Alert from '../../components/Alert';
import ManService from '../../services/ManService';

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

    isDeleteAlterShow:boolean
}

 class DayoffPage extends React.Component<IPageProps,IPageState> {

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
            if(values.dayoffDate){
                values.dayoffDate=values.dayoffDate[0].format('YYYY-MM-DD')+'~'+values.dayoffDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        
        args['orderby']=this.orderBy;
        let page = await ManService.searchDayoff(args,this.pageIndex,this.pageSize) as PageModel<any>;
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

    handler_delete=async ()=>{

        this.setState({isLoading:true,isDeleteAlterShow:false});

        let ids:string='';
        this.state.checkedRows.map((item,index)=>{
            ids=ids+','+item.id;
        });
       await ManService.deleteNiaojian(ids).then(()=>{

            Info('删除操作成功');
            this.search();
        })
        .catch((err)=>{
            Error('删除操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }
    
    export = ()=>{
        console.log('export=======');
    }
   
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const me=this;
        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/dayoff-detail/'+record.id,'请假详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
            { title: '类别', dataIndex: 'dayoffType', key: 'dayoffType', textAlign:'center',width: 100 ,
                sorter: (pre, after) => {return pre.c - after.c},
             },
            { title: '时间', dataIndex: 'startDate', key: 'startDate', textAlign:'center',width: 150,render(text,record,index) {

                return text+'~'+record.endDate ;
              } },
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 180 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate', textAlign:'center',width: 120,sorter: (pre, after) => {return pre.c - after.c}},
            { title: '状态', dataIndex: 'status', key: 'status', textAlign:'center',width: 100 ,
                render(text,record,index) {

                    return text==0?<Tag colors="warning">未审核</Tag>:(text==1?<Tag colors="success">同意</Tag>:(text==-1?<Tag colors="danger">不同意</Tag>:<Tag colors="warning">未知状态</Tag>));

              },sorter: (pre, after) => {return pre.c - after.c},
            },
            { title: '回复', dataIndex: 'respContent', key: 'respContent', textAlign:'center',width: 120 },
            { title: '回复人', dataIndex: 'respUser', key: 'respUser', textAlign:'center',width: 100 },
            { title: '回复时间', dataIndex: 'respDate', key: 'respDate', textAlign:'center',width: 120 }
          ];
        
          const toolBtns = [{
            value:'审核',
            attr:'act_dayoff_audit',
            bordered:false,
            colors:'primary',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('审核只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/dayoff-edit/'+this.state.checkedRows[0].id,"请假审核",false);

                }else{
                    Info('请选择要审核的记录');
                }
            }

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
			      请假
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
                        label="性别"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
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
                        label="创建时间"
                    >
                        <DatePicker.RangePicker {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>

                    <FormItem
                        label="请假时间">
                         <DatePicker.RangePicker {...getFieldProps('dayoffDate', {initialValue: ''})}
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
                            <Radio value="0">未处理</Radio>
                            <Radio value="1">同意</Radio>
                            <Radio value="-1">不同意</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem
                        label="类型">
                        <Select  {...getFieldProps('dayoffType', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="事假">事假</Option>
                            <Option value="病假">病假</Option>
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
                <Alert show={this.state.isDeleteAlterShow} context="确定要删除记录?"
                           confirmFn={() => {
                               this.handler_delete();
                           }}
                           cancelFn={() => {
                              this.setState({isDeleteAlterShow:false})
                           }}
                />    
        </Panel >)
    }
}

export default Form.createForm()(DayoffPage);