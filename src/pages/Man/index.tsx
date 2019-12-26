import React from 'react';

import {Panel,Breadcrumb,Select,FormControl,Row, Col,Form} from 'tinper-bee';
import { Link } from 'react-router-dom';

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import Alert from '../../components/Alert';
import OrgPanel from '../../pages/Sys/Org/Panel';
import ManCateSelect from '../../components/ManCateSelect';
import ManService from '../../services/ManService';
import {PageModel,SearchModel,PopPageModel} from '../../services/Model/Models';
import { inject, observer } from 'mobx-react';
import ManStore from '../../stores/ManStore';
import Store from '../../stores/StoreIdentifier';

import SelectDict from '../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';
import PageDlog from '../../components/PageDlg';

import './index.scss';
import {Info} from '../../utils/index';
import { openPage } from '../../utils/tools';
import AppConsts from '../../lib/appconst';

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

    isPopPage:boolean,
    pageModel: PopPageModel,

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
        
        isPopPage:false,
        pageModel:new PopPageModel(),

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

    go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
        if(isPage){
            this.props.history.push(url);
        }else{
            const model=new PopPageModel(title,url);

            model.size=size;

            this.setState({isPopPage:true,pageModel:model});
        }
    }
    search= ()=>{
        this.props.form.validateFields((err, values) => {

            if(values.cellId&&values.cellId!=''){

                let oo=JSON.parse(values.cellId);
                values.cellId=oo.refpk;
                values.cellName=oo.refname;
            }

            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }
        
            values['orgId']=this.orgId;

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
    
    getSelectedDataFunc = (selectData, record, index) => {
      
       this.setState({checkedRows:selectData});
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
            ids=ids+','+item.manId;
        });
       await ManService.deleteManByIds(ids).then(()=>{

            Info('删除操作成功');
            this.search();
        })
        .catch((err)=>{
            Error('删除操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
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
            },
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160,
             sorter: (pre, after) => {return pre.c - after.c}},
            { title: '民族', dataIndex: 'nation', key: 'nation',textAlign:'center', width: 100 },
            { title: '婚姻状态', dataIndex: 'marriageStatus', key: 'marriageStatus',textAlign:'center', width: 150 },
            { title: '户籍', dataIndex: 'birthplace', key: 'birthplace',textAlign:'center', width: 120 },
            { title: '居住地 ', dataIndex: 'liveDistrict', key: 'liveDistrict',textAlign:'center', width: 200 },
            { title: '查获时间', dataIndex: 'catchDate', key: 'catchDate',textAlign:'center', width: 120 },
            { title: '查获单位', dataIndex: 'catchUnit', key: 'catchUnit',textAlign:'center', width: 200 },
            { title: '风险等级', dataIndex: 'level', key: 'level',textAlign:'center', width: 100 },
            { title: '人员分类', dataIndex: 'cateTypeText', key: 'cateTypeText',textAlign:'center', width: 150 ,
                sorter: (pre, after) => {return pre.c - after.c}},
            { title: '所属社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 160 ,
                sorter: (pre, after) => {return pre.c - after.c}},
            { title: '所属社工', dataIndex: 'linkSgName', key: 'linkSgName',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c}},
            { title: '所属民警', dataIndex: 'linkMjName', key: 'linkMjName',textAlign:'center', width: 120 },
         
            { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 ,
                sorter: (pre, after) => {return pre.c - after.c}},
            { title: '创建人', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 100 },
            
          ];
          
          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary',
            attr:'act_man_add',
            onClick:() => {

                this.go2Page('/man-edit/0',"档案新增",AppConsts.getOpenModel());

            }
        },{
            value:'编辑',
            colors:'default',
            attr:'act_man_update',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-edit/'+this.state.checkedRows[0].manId,"档案修改",AppConsts.getOpenModel());

                }else{
                    Info('请选择要编辑的记录');
                }
            }
        },{
            value:'删除',
            colors:'default',
            attr:'act_man_delete',
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
            attr:'act_man_buss',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-buss-modify/'+this.state.checkedRows[0].manId,"社戒修改",AppConsts.getOpenModel());

                }else{
                    Info('请选择要编辑的记录');
                }

            }
        },{
            value:'六保一',
            colors:'default',
            attr:'act_man_contact',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-contact/'+this.state.checkedRows[0].manId,"六保一",AppConsts.getOpenModel(),'xlg');

                }else{
                    Info('请选择要查看戒毒人员');
                }

            }
        },{
            value:'亲属关系',
            colors:'default',
            attr:'act_man_relate',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('亲属关系只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-relate/'+this.state.checkedRows[0].manId,"亲属关系",AppConsts.getOpenModel(),'xlg');

                }else{
                    Info('请选择要查看亲属关系的戒毒人员');
                }
            }
        },{
            value:'工作经历',
            colors:'default',
            attr:'act_man_work',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/man-work/'+this.state.checkedRows[0].manId,"工作经历",AppConsts.getOpenModel());

                }else{
                    Info('请选择要查看的戒毒人员');
                }
            }
        },/**{
            value:'测试',
            onClick:()=>{
                //this.setState({isPopPage:true});
                this.go2Page('/test-pop',"测试",false);
            }
        },**/{
            value:'打印',
            iconType:'uf-print',
            attr:'act_man_print',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{

                if(this.state.checkedRows.length>1){

                    Info('打印只能选择一条记录');

                }else if(this.state.checkedRows.length==1){
                    
                  openPage("report/manRegist?id="+this.state.checkedRows[0].manId+"&uid="+AppConsts.session.userId); 
                }else{
                    Info('请选择要打印戒毒人员');
                }
            }
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
                        <SelectDict  type={31} {...getFieldProps('level', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="网格">
                        <RefGridTreeTableSelect {...getFieldProps('cellId', {initialValue: ''})}/>
                        
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
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    isLoading={this.state.isLoading}
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
            
            <Alert show={this.state.isDeleteAlterShow} context="是否要删除 ?"
                           confirmFn={() => {
                             this.handler_delete();
                           }}
                           cancelFn={() => {
                              this.setState({isDeleteAlterShow:false})
                           }}
                    />
            </Panel>
        )
    }
}

export default Form.createForm()(Man);