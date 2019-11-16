import React from 'react';

import {Panel,Breadcrumb,Select,FormControl,Row, Col,Form} from 'tinper-bee';
import { Link } from 'react-router-dom';
import loadsh from  'lodash';

import Grid from '../../components/Grid';
import PopDialog from '../../components/Pop';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import Alert from '../../components/Alert';

import OrgPanel from '../../pages/Sys/Org/Panel';
import ManCateSelect from '../../components/ManCateSelect';
import ManService from '../../services/ManService';
import {PageModel,SearchModel} from '../../services/Model/Models';
import { inject, observer } from 'mobx-react';
import ManStore from '../../stores/ManStore';
import Store from '../../stores/StoreIdentifier';

import SelectDict from '../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';
import RelationShipPanel from '../../components/Buss/RelationShipPanel';
import WorkJobPanel from '../../components/Buss/WorkJobPanel';
import ManContactPanel from '../../components/Buss/ManContactPanel';
import ManStatusModifyPanel from '../../components/Buss/ManStatusModifyPanel';
import TestDlog from './Edit/TestDlg';
//import PageDlog from '../../components/PageDlg';

import './index.scss';
import {Info} from '../../utils/index';

const FormItem = FormListItem;

interface IPageProps {
    form:any,
    history:any,
    manStore:ManStore
}
interface IPageState {
    expanded:boolean,
    editModelVisible:boolean,
    page:PageModel<any>,

    searchModel:SearchModel,
    isLoading:boolean,
    isDeleteAlterShow:boolean,
    isPopRelation:boolean,
    isPopWorkjob:boolean,
    isPopContact:boolean,
    isPopStatusModify:boolean,
    isPopTest:boolean,

    checkedRows:any[];
}

@inject(Store.ManStore)
@observer
export  class Man extends React.Component<IPageProps,IPageState> {

    //checkedRows=[]
    pageIndex=1
    pageSize=10
    orgId='';

    refs:{
        [string: string]: any;
        grid:any;
    }

    state:IPageState={
        page:new PageModel<any>(),
        expanded:false,
        editModelVisible:false,
        searchModel:{orderBy:'manId'},
        isLoading:false,
        isDeleteAlterShow:false,
        isPopRelation:false,
        isPopWorkjob:false,
        isPopContact:false,
        isPopStatusModify:false,
        isPopTest:false,
        checkedRows:[]
    }

    async componentDidMount() {

       this.search();
    }

    handler_org_selected=(rec)=>{

        if(rec!=null&&rec.length>0){

            this.orgId=rec[0];
            this.search();
        }
    }

    go2Page=(url)=>{
        this.props.history.push(url);
    }
    search= ()=>{
        this.props.form.validateFields((err, values) => {

            /** 
            if (err) {
                console.log(err);

            } else {
                console.log('提交成功', values);

                this.loadData();
            }
            **/

            values['orgId']=this.orgId;
            //const search = loadsh.defaults(this.state.searchModel, values);

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (arg)=>{

        let page = await ManService.search(arg,this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({page:page,isLoading:false});
    }

    clear=()=>{
        this.props.form.resetFields()
    }
    
    onChange = () => {
        this.setState({expanded: !this.state.expanded})
    }

    getSelectedDataFunc = (selectData, record, index) => {
        
        //this.checkedRows=selectData;

        /** 
        this.props.manStore.selected(
            _tableData,
            selectData
        )
        ***/
       this.setState({checkedRows:selectData});
    };
  
    onPageChange=(pageIndex:number,pageSize:number)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.search();
    }
   
    onClickShowModel = (btnFlag) => {
        this.setState({editModelVisible: true});
    }

    /**
     * 关闭修改model
     */
    onCloseEdit = () => {
        this.setState({editModelVisible: false});
    }
    
    render() {

        const { getFieldProps, getFieldError } = this.props.form;

        const {Option} = Select;
        const format = "YYYY";

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Link to={'/man-view/'+record.manId}>{text}</Link>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
                sorterClick:(data,type)=>{
              
                console.log("data",data);
            }},
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c},
                sorterClick:(data,type)=>{
                
                console.log("data",data);
                }
            },
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
            { title: '民族', dataIndex: 'nation', key: 'nation',textAlign:'center', width: 100 },
            { title: '婚姻状态', dataIndex: 'marriageStatus', key: 'marriageStatus',textAlign:'center', width: 150 },
            { title: '户籍', dataIndex: 'birthplace', key: 'birthplace',textAlign:'center', width: 120 },
            { title: '居住地 ', dataIndex: 'liveDistrict', key: 'liveDistrict',textAlign:'center', width: 200 },
            { title: '查获时间', dataIndex: 'catchDate', key: 'catchDate',textAlign:'center', width: 120 },
            { title: '查获单位', dataIndex: 'catchUnit', key: 'catchUnit',textAlign:'center', width: 200 },
            { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            { title: '创建人', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            sorter: (pre, after) => {return pre.c - after.c},
            sorterClick:(data,type)=>{
              //type value is up or down
              console.log("data11111",data,type);
            }}
          ];
          
          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary',
            onClick:() => {
                this.go2Page('/man-edit/0');
            }
        },{
            value:'编辑',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-edit/'+this.state.checkedRows[0].manId);

                }else{
                    Info('请选择要删除的记录');
                }

            }
        },{
            value:'删除',
            colors:'default',
            onClick:() => {
                if(this.state.checkedRows.length>0){
                    this.setState({isDeleteAlterShow:true});
                }else{
                    Info('请选择要删除的记录');
                }
            }
        },{
            value:'社戒变更',
            iconType:'uf-personin-o',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{ this.setState({isPopStatusModify:true})}
        },{
            value:'六保一',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {
                this.setState({isPopContact:true})
            }
        },{
            value:'亲属关系',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {
               // this.setState({isPopRelation:true});
                if(this.state.checkedRows.length>1){

                    Info('亲属关系只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-relate/'+this.state.checkedRows[0].manId);

                }else{
                    Info('请选择要查看亲属关系的戒毒人员');
                }
            }
        },{
            value:'工作经历',
            colors:'default',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {
                this.setState({isPopWorkjob:true});
            }
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:()=>{
                this.setState({isPopTest:true});
            }
        },{
            value:'打印',
            iconType:'uf-print'
        }];

        return (

            <Panel>
                <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                    档案库
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
                searchOpen={true}
            >

                <FormList size="sm">
                <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('manName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict onChange={()=>{}} type={31} {...getFieldProps('level', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="网格"
                    >
                        <RefGridTreeTableSelect {...getFieldProps('gridId', {initialValue: ''})}/>
                        
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
                        <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onChange={this.onChange}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                            {...getFieldProps('createDate', {initialValue: ''})}
                        />
                    </FormItem>

                    
                </FormList>
                </SearchPanel>
              
                <Grid
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    isLoading={this.state.isLoading}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    pageChange={this.onPageChange}
                />
                </Col>
            </Row>

            <PopDialog title="亲属关系" size='xlg' show={this.state.isPopRelation} close={()=>this.setState({isPopRelation:false})}>
                <RelationShipPanel/>
            </PopDialog>
            <PopDialog title="工作经历" size='xlg' show={this.state.isPopWorkjob} close={()=>this.setState({isPopWorkjob:false})}>
                <WorkJobPanel/>
            </PopDialog>    
            <PopDialog title="六保一" size='xlg' show={this.state.isPopContact} close={()=>this.setState({isPopContact:false})}>
                <ManContactPanel/>
            </PopDialog>    

            <PopDialog title="社戒变更" size='lg' show={this.state.isPopStatusModify} close={()=>this.setState({isPopStatusModify:false})}>
                <ManStatusModifyPanel/>
            </PopDialog>    

            <TestDlog title="测试下" isShow={this.state.isPopTest} onClose={()=>this.setState({isPopTest:false})} url="www.baidu.com"></TestDlog>
            
            <Alert show={this.state.isDeleteAlterShow} context="是否要删除 ?"
                           confirmFn={() => {
                             //  this.confirmGoBack(1);
                           }}
                           cancelFn={() => {
                              // this.confirmGoBack(2);
                              this.setState({isDeleteAlterShow:false})
                           }}
                    />
            </Panel>
        )
    }
}

export default Form.createForm()(Man);