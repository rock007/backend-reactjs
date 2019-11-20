import * as React from 'react';
import { Link } from 'react-router-dom';
import {Loading ,Panel,Breadcrumb, Select, FormControl,Row, Col,Form,Radio } from 'tinper-bee';

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import OrgPanel from '../../pages/Sys/Org/Panel';
import Alert from '../../components/Alert';

import ProcessViewPop from './View';

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
    pageModel: PopPageModel
}
export  class ProcessPage extends React.Component<IPageProps,IPageState> {

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
    }
    async componentDidMount() {
        
        this.validFormSubmit();
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
    validFormSubmit=()=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);
            // 年份特殊处理
            if (values.year) {
                values.year = values.year.format('YYYY');
            }
            // 参照特殊处理
            let {dept} = values;
            if (dept) {
                let {refpk} = JSON.parse(dept);
                values.dept = refpk;
            }

            console.log('Search:'+JSON.stringify(values));

            //let queryParam = deepClone(this.props.queryParam);
           // let {pageParams} = queryParam;
           // pageParams.pageIndex = 0;
           
           this.freshata(1);
        });
      }
      freshata= async (index)=>{
      
        this.pageIndex=index;

        this.setState({isLoading:true});
        let page = await ManService.searchProces({'uid':''},this.pageIndex,this.pageSize) as PageModel<any>;
        
        this.setState({page:page,isLoading:false});
      }

      resetSearch=()=>{
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

    handleClick = (e) => {
        console.log(e);

        this.setState({
          //  current: e.key,
        });
    }

    getSelectedDataFunc = (selectData, record, index) => {
        
        this.setState({checkedRows:selectData});

        //this.rowSelect=selectData;

        /** 
        let  tableData  = this.state.page.data;
		let _tableData = deepClone(tableData);
		if (index != undefined) {
			_tableData[index]['_checked'] = !_tableData[index]['_checked'];
		} else {//点击了全选
			if (selectData.length > 0) {//全选
				_tableData.map(item => {
					if (!item['_disabled']) {
						item['_checked'] = true
					}
				});
			} else {//反选
				_tableData.map(item => {
					if (!item['_disabled']) {
						item['_checked'] = false
					}
				});
			}
        }
        ***/
        //this.handler(selectData);
    }
    
    handler=async (data)=>{
       // this.setState({rowSelect:data});
    }
      

    onDataNumSelect=(index)=>{
        
        this.setState({dataNumIndex:index});
        this.pageSize=[10,20,50,100][index];
        this.validFormSubmit();
    }

    export = ()=>{
        console.log('export=======');
    }
    

    onDatePickChange=()=>{

    }
    onStartInputBlur = (e,startValue,array) => {
        console.log('RangePicker面板 左输入框的失焦事件',startValue,array)
    }
    /**
     *@param e 事件对象
     *@param endValue 结束时间
     *@param array 包含开始时间和结束时间的数组
     */
    onEndInputBlur = (e,endValue,array) => {
        console.log('RangePicker面板 右输入框的失焦事件',endValue,array)
    }
    
    sortFun = (sortParam)=>{
        console.info(sortParam);
        //将参数传递给后端排序
    }

    gotoDetail=(id)=>{
        this.props.history.push('/process-view/'+id);
    }

    onPageChange=(pageIndex:number,pageSize:number)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
       // this.search();
    }

    render() {

        let me=this;
        const { getFieldProps, getFieldError } = this.props.form;

        const {Option} = Select;
        const format = "YYYY";

        let isMultSelect=this.rowSelect.length>1?true:false;

        console.log(' isMultSelect:'+isMultSelect);

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Link to={'/process-view/'+record.manId}>{text}</Link>;
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
              console.log("data",data);
            }}
          ];
        
          const toolBtns = [{
            value:'社区报到',
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
            value:'发告诫书',
            colors:'default',
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
            colors:'default',
            disabled:isMultSelect,
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
            disabled:isMultSelect,
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
            disabled:isMultSelect,
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

        let paginationObj = {
            activePage:this.pageIndex,
            items:5,
            dataNumSelect:[10,20,50,100],
            dataNum:this.state.dataNumIndex,
            total:this.state.page.dataCount,
            freshData:this.freshata,
            onDataNumSelect:this.onDataNumSelect, 
            showJump:true,
            noBorder:true
          }

          let sortObj = {
            mode:'multiple',
            // backSource:true,
            sortFun:this.sortFun
          }
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
                    <OrgPanel />
                </Col>
                <Col md="10">
                <SearchPanel
                reset={this.resetSearch}
                onCallback={()=>{}}
                search={this.validFormSubmit}
                searchOpen={true}
            >

                <FormList size="sm">
                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select >
                            <Option value="">(请选择)</Option>
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict onChange={()=>{}} type={31}/>
                    </FormItem>

                    <FormItem
                        label="网格"
                    >
                        <RefGridTreeTableSelect/>
                        
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
                        <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onChange={this.onDatePickChange}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                            onStartInputBlur={this.onStartInputBlur}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </FormItem>

                    <FormItem
                        label="报到时间"
                    >
                         <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onChange={this.onDatePickChange}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                            onStartInputBlur={this.onStartInputBlur}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </FormItem>
                    <FormItem
                        label="状态">
                        <Radio.RadioGroup>
                            <Radio value="">全部</Radio>
                            <Radio value="1">执行中</Radio>
                            <Radio value="100">已完成</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Grid
                    //ref="grid"
                    //className="table-color"
                    toolBtns={toolBtns}
                    columns={columns}
                    isLoading={this.state.isLoading}
                    page={this.state.page}
                    //exportData={this.state.page.data}
                    //sheetName="档案库"
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    pageChange={this.onPageChange}
                    //paginationObj={paginationObj}
                    //sort={sortObj}
                    //sortFun={this.sortFun}
                />
               
                </Col>
            </Row>
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
            </PageDlog>
            <Alert show={this.state.isAlterShow} context="是否要删除 ?"
                           confirmFn={() => {
                             //  this.confirmGoBack(1);
                           }}
                           cancelFn={() => {
                              // this.confirmGoBack(2);
                              this.setState({isAlterShow:false})
                           }}
            />
            <ProcessViewPop isShow={this.state.isViewerShow} onCloseEdit={()=>{this.setState({isViewerShow:false})}}/>
            </Panel>
        )
    }
}

export default Form.createForm()(ProcessPage);