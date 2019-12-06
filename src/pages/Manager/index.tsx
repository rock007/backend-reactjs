import React from 'react';

import {Panel,Breadcrumb,Select,FormControl,Row, Col,Form} from 'tinper-bee';
import { Link } from 'react-router-dom';
import loadsh from  'lodash';

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import OrgPanel from '../../pages/Sys/Org/Panel';
import ManCateSelect from '../../components/ManCateSelect';
import ManService from '../../services/ManService';
import {PageModel,SearchModel,PopPageModel} from '../../services/Model/Models';

import SelectDict from '../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';
import PageDlog from '../../components/PageDlg';

import './index.scss';
import {Info} from '../../utils/index';

const FormItem = FormListItem;

interface IPageProps {
    form:any,
    history:any,

}
interface IPageState {

    page:PageModel<any>,

    searchModel:SearchModel,
    isLoading:boolean,

    isPopPage:boolean,
    pageModel: PopPageModel,

    checkedRows:any[];
}

//社工管理（业务统计）
export  class ManagerList extends React.Component<IPageProps,IPageState> {

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
     
        searchModel:{orderBy:'manId'},
        isLoading:false,
        
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

        //let page = await ManService.search(arg,this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({page:new PageModel<any>(),isLoading:false});
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
  
    render() {

        const { getFieldProps, getFieldError } = this.props.form;

        const {Option} = Select;
        const format = "YYYY";

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Link to={'/manager-view/'+record.manId}>{text}</Link>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
            },
            { title: '红黄牌(张)', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
            { title: '尿检(次)', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160,
             sorter: (pre, after) => {return pre.c - after.c}},
            { title: '走访(次)', dataIndex: 'nation', key: 'nation',textAlign:'center', width: 100 },
            {
                title: "关联社戒人员",
                width:300,
                children: [
                  {
                    title: "社区戒毒",
                    dataIndex: "key1",
                    key: "key1",
                    width: 100
                  },{
                    title: "社区康复",
                    dataIndex: "key2",
                    key: "key2",
                    width: 100
                  },{
                    title: "其它",
                    dataIndex: "key3",
                    key: "key3",
                    width: 100
                  }
                ]
            },
            {
                title: "风险等级",
                width:300,
                children: [
                  {
                    title: "高风险",
                    dataIndex: "key4",
                    key: "key4",
                    width: 100
                  },{
                    title: "中风险",
                    dataIndex: "key5",
                    key: "key5",
                    width: 100
                  },{
                    title: "低风险",
                    dataIndex: "key6",
                    key: "key6",
                    width: 100
                  }
                ]
            },

            { title: '所属社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 160 ,
                sorter: (pre, after) => {return pre.c - after.c}},
           
            { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 ,
                sorter: (pre, after) => {return pre.c - after.c}},
            
          ];
          
          const toolBtns = [{
            value:'关联',
            colors:'primary',
            bordered:false,
            onClick:() => {


            }
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:()=>{
                //this.setState({isPopPage:true});
                this.go2Page('/test-pop',"测试",false);
            }
        }];

        return (

            <Panel>
                <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                    社区人员管理
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
                        <FormControl placeholder='模糊查询' {...getFieldProps('realName', {initialValue: ''})}/>
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
                        <SelectDict  type={31} {...getFieldProps('level', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="网格"
                    >
                        <RefGridTreeTableSelect {...getFieldProps('cellId', {initialValue: ''})}/>
                        
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
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
                    onClose={()=>this.setState({isPopPage:false})} >
            </PageDlog>
          
            </Panel>
        )
    }
}

export default Form.createForm()(ManagerList);