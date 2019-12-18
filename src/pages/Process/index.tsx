import * as React from 'react';
import { Link } from 'react-router-dom';
import {Tag ,Panel,Breadcrumb, Select, FormControl,Row, Col,Form,Radio } from 'tinper-bee';

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import OrgPanel from '../../pages/Sys/Org/Panel';
import Alert from '../../components/Alert';

import DatePicker from "bee-datepicker";

import ManService from '../../services/ManService';
import {PageModel, PopPageModel} from '../../services/Model/Models';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';
import PageDlog from '../../components/PageDlg';

import { getValidateFieldsTrim ,deepClone} from '../../utils/tools';

import './index.scss';
import { Info } from '../../utils';

const FormItem = FormListItem;

interface IPageProps {
    form:any,
    params:any;
    history: any,
    location:any
}
interface IPageState {
    isViewerShow:boolean,
    page:PageModel<any>
    isLoading:boolean,
    dataNumIndex:number,
    
    checkedRows:any[];

    isAlterShow:boolean,
    isPopPage:boolean,
    pageModel: PopPageModel,

    isDeleteAlterShow:boolean
}
export  class ProcessPage extends React.Component<IPageProps,IPageState> {

    orgId='';
    pageIndex:number=1
    pageSize:number=10
    rowSelect=[]

    state:IPageState={
        isViewerShow:false,
        page:new PageModel<any>(),
        isLoading:false,
        dataNumIndex:0,
        
        checkedRows:[],

        isAlterShow:false,
        isPopPage:false,
        pageModel:new PopPageModel(),
        isDeleteAlterShow:false
    }
    componentDidMount() {
        
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
    search=()=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            values['orgId']=this.orgId;

            if(values.cellId&&values.cellId!=''){

                let oo=JSON.parse(values.cellId);
                values.cellId=oo.refpk;
                values.cellName=oo.refname;
            }

            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }
            if(values.registDate){
                values.registDate=values.registDate[0].format('YYYY-MM-DD')+'~'+values.registDate[1].format('YYYY-MM-DD');
            }

            console.log('Search:'+JSON.stringify(values));

            //let queryParam = deepClone(this.props.queryParam);
           // let {pageParams} = queryParam;
           // pageParams.pageIndex = 0;
           
           this.loadata(values);
        });
      }

      loadata= async (arg:any)=>{
      
        this.setState({isLoading:true});
        let page = await ManService.searchProces(arg,this.pageIndex,this.pageSize) as PageModel<any>;
        
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


    getSelectedDataFunc = (selectData, record, index) => {
        
        this.setState({checkedRows:selectData});
    }

    export = ()=>{
        console.log('export=======');
    }
    
    gotoDetail=(id)=>{
        this.props.history.push('/process-view/'+id);
    }

    onPageChange=(pageIndex:number,pageSize:number)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.search();
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

    handler_org_selected=(rec)=>{

        if(rec!=null&&rec.length>0){

            this.orgId=rec[0];
            this.search();
        }
    }
    render() {

        let me=this;
        const { getFieldProps, getFieldError } = this.props.form;

        const {Option} = Select;

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Link to={'/process-view/'+record.processId}>{text}</Link>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
               },
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
            { title: '应报到时间', dataIndex: 'registSetDate', key: 'registSetDate',textAlign:'center', width: 160 , sorter: (pre, after) => {return pre.c - after.c}},
            { title: '实际报到时间', dataIndex: 'registDate', key: 'registDate',textAlign:'center', width: 160 , sorter: (pre, after) => {return pre.c - after.c}},
            { title: '执行天数', dataIndex: 'dayCost', key: 'dayCost',textAlign:'center', width: 120 , sorter: (pre, after) => {return pre.c - after.c}},
            { title: '风险等级', dataIndex: 'level', key: 'level',textAlign:'center', width: 100 },
            { title: '人员分类', dataIndex: 'cateTypeText', key: 'cateTypeText',textAlign:'center', width: 150 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 160 },
            { title: '所属社工', dataIndex: 'linkSgName', key: 'linkSgName',textAlign:'center', width: 120 },
            { title: '所属民警', dataIndex: 'linkMjName', key: 'linkMjName',textAlign:'center', width: 120 },
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 120 , render(text,record,index) {

                return text==0?<Tag colors="danger">未报到</Tag>:(text==1?<Tag colors="success">执行中</Tag>:(text==100?<Tag colors="success">已完成</Tag>:<Tag colors="warning">未知状态</Tag>));

                }},
            { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 }
           
          ];
        
          const toolBtns = [{
            value:'社区报到',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {
                //this.setState({isViewerShow:true});

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-regist/'+this.state.checkedRows[0].processId,"社区报到",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'尿检计划',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/niaojian-schedule/'+this.state.checkedRows[0].processId,"尿检计划",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'发告诫书',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-notice/'+this.state.checkedRows[0].processId,"发告诫书",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'发通知函',
            disabled:this.state.checkedRows.length>1?true:false,
            colors:'default',
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-warn/'+this.state.checkedRows[0].processId,"发通知函",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'变更社区',
            disabled:this.state.checkedRows.length>1?true:false,
            colors:'default',
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-trans/'+this.state.checkedRows[0].processId,"变更社区",false);

                }else{
                    Info('请选择记录');
                }

            }
        },{
            value:'解除戒毒',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-release/'+this.state.checkedRows[0].processId,"解除戒毒",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'执行强戒',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/process-reback/'+this.state.checkedRows[0].processId,"执行强戒",false);

                }else{
                    Info('请选择记录');
                }
            }
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        }];

        return (

            <Panel>
                 <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      社戒管理
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
                        label="姓名">
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
                        label="网格"
                    >
                        <RefGridTreeTableSelect {...getFieldProps('cellId', {initialValue: ''})}/>
                        
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
                        label="报到时间"
                    >
                         <DatePicker.RangePicker {...getFieldProps('registDate', {initialValue: ''})}
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
                            <Radio value="0">未报到</Radio>
                            <Radio value="1">执行中</Radio>
                            <Radio value="100">已完成</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Grid
                    toolBtns={toolBtns}
                    columns={columns}
                    isLoading={this.state.isLoading}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    pageChange={this.onPageChange}
                />
               
                </Col>
            </Row>
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={(flag:number)=>{
                        this.setState({isPopPage:false});
                        if(flag==1) this.search();
                    }} >
            </PageDlog>
            <Alert show={this.state.isAlterShow} context="是否要删除 ?"
                           confirmFn={() => {
                             this.handler_delete();
                           }}
                           cancelFn={() => {
                              this.setState({isAlterShow:false})
                           }}
            />
            </Panel>
        )
    }
}

export default Form.createForm()(ProcessPage);