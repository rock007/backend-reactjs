import * as React from 'react';
import {Panel,Select, FormControl,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Alert from '../../components/Alert';
import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import {PageModel, PopPageModel} from '../../services/Model/Models';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../components/PageDlg';

import DatePicker from "bee-datepicker";

import ManService from '../../services/ManService';

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

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

 class NiaojianPage extends React.Component<IPageProps,IPageState> {
    
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
            if(values.testDate){
                values.testDate=values.testDate[0].format('YYYY-MM-DD')+'~'+values.testDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        
        args['orderby']=this.orderBy;
        let page = await ManService.searchNiaojian(args, this.pageIndex,this.pageSize) as PageModel<any>;

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
        const me=this;
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/visit-detail/'+record.id,'尿检详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
             },
            { title: '尿检时间', dataIndex: 'testDate', key: 'testDate', textAlign:'center',width: 120, sorter: (pre, after) => {return pre.c - after.c}, },
            { title: '尿检类型', dataIndex: 'testType', key: 'testType', textAlign:'center',width: 120, sorter: (pre, after) => {return pre.c - after.c} ,render(text,record,index) {

                return text==0?'常规':'随机' ;
              }},
            { title: '是否本地', dataIndex: 'isLocal', key: 'isLocal', textAlign:'center',width: 120, sorter: (pre, after) => {return pre.c - after.c}, render(text,record,index) {

                return text==1?'本地':'异地' ;
              }},
            { title: '尿检地点', dataIndex: 'address', key: 'address', textAlign:'center',width: 200 },
            { title: '结果', dataIndex: 'result', key: 'result', textAlign:'center',width: 100  ,sorter: (pre, after) => {return pre.c - after.c}},
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate', textAlign:'center',width: 120 },

         
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
               
                
            },
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            sorter: (pre, after) => {return pre.c - after.c}
            }
          ];
        
          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary',
            onClick:()=>{
                this.go2Page('/niaojian-edit/0',"尿检新增",false);
            }
        },{
            value:'编辑',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/niaojian-edit/'+this.state.checkedRows[0].id,"尿检编辑",false);

                }else{
                    Info('请选择要编辑的记录');
                }
            }
        },{
            value:'删除',
            onClick:()=>{

                if(this.state.checkedRows.length==0){

                    Info('请选择要删除的记录');
                }else{

                    this.setState({isDeleteAlterShow:true});
                }
            }
        },{
            value:'打印'
        },{
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
			      尿检记录
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
                        <SelectDict {...getFieldProps('level', {initialValue: ''})} type={31}/>
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
                        label="尿检时间"
                    >
                         <DatePicker.RangePicker {...getFieldProps('testDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="结果">
                        <Radio.RadioGroup  {...getFieldProps('result', {initialValue: ''})}>
                            <Radio value="">(请选择)</Radio>
                            <Radio value="阴性">阴性</Radio>
                            <Radio value="阳性">阳性</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem
                        label="尿检类型">
                        <Select {...getFieldProps('testType', {initialValue: ''})} >
                            <Option value="">(请选择)</Option>
                            <Option value="0">常规</Option>
                            <Option value="1">随机</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="是否本地">
                        <Select  {...getFieldProps('isLocal', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
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

export default Form.createForm()(NiaojianPage);