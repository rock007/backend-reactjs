import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

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

import './index.scss';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IPageProps {
    form:any
}
interface IPageState {
    expanded:boolean,
    page:PageModel<any>,
    selectedkey:any
}

class VisitPage extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        expanded:false,
        page:new PageModel<any>(),
        selectedkey:null
    }

    async componentDidMount() {
        let page = await ManService.searchVisit({pageIndex:1,pageSize:20}) as PageModel<any>;
        this.setState({page:page});
    }

    handleSelect = (index) => {
        this.setState({selectedkey: index});
    }

    getSelectedDataFunc = data => {
        console.log("data", data);
      };
    
      selectedRow = (record, index) => {};
      /**
       * 请求页面数据
       */
      freshata=()=>{
    
      }
     
      onDataNumSelect=()=>{
        console.log('选择每页多少条的回调函数');
      }
    export = ()=>{
        console.log('export=======');
    }
    /**
     *批量修改操作
     */
    dispatchUpdate = ()=>{
      console.log('--dispatch---update')
    }
    /**
     *批量删除
     */
    dispatchDel = ()=>{
      console.log('--dispatch---del')
    }
    sortFun = (sortParam)=>{
        console.info(sortParam);
        //将参数传递给后端排序
    }
    render() {
        
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <a href="#">{text}</a>;
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
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            sorter: (pre, after) => {return pre.c - after.c},
            sorterClick:(data,type)=>{
              //type value is up or down
              console.log("data",data);
            }},
            { title: '被走访人', dataIndex: 'toVisitor', key: 'toVisitor',textAlign:'center', width: 160 },
            { title: '关系', dataIndex: 'toVisitorRelationship', key: 'toVisitorRelationship',textAlign:'center', width: 100 },
            { title: '走访地点', dataIndex: 'marriageStatus', key: 'marriageStatus',textAlign:'center', width: 150 },
            { title: '结果', dataIndex: 'result', key: 'result',textAlign:'center', width: 120 },
         
            { title: '走访时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            { title: '走访人', dataIndex: 'visitorName', key: 'visitorName',textAlign:'center', width: 100 }
            
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary'
        },{
            value:'修改'
        },{
            value:'删除'
        },{
            value:'导出',
            iconType:'uf-search',
            onClick:this.export
        },{
            value:'打印',
            iconType:'uf-print',
        }];

        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
          };

          let sortObj = {
            mode:'multiple',
            // backSource:true,
            sortFun:this.sortFun
          };
        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      社戒管控
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      走访记录
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={()=>{}}
                onCallback={()=>{}}
                search={()=>{}}
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
                        label="社区"
                    >
                        <RefOrgTreeSelect/>
                        
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
                        <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}

                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                        />
                    </FormItem>

                    <FormItem
                        label="走访时间"
                    >
                         <DatePicker.RangePicker
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="被访人">
                        <FormControl placeholder='请输入被访人姓名' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="和戒毒人员关系">
                        <Select >
                            <Option value="">(请选择)</Option>
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="被访人联系方式">
                        <FormControl placeholder='请输入被访人联系方式' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="走访地点">
                        <FormControl placeholder='请输入走访地点' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="走访结果">
                        <Radio.RadioGroup>
                            <Radio value="">全部</Radio>
                            <Radio value="找到">找到</Radio>
                            <Radio value="未找到">未找到</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                </FormList>
                </SearchPanel>
        <Grid
          toolBtns={toolBtns}
          columns={columns}
          page={this.state.page}
          getSelectedDataFunc={this.getSelectedDataFunc}
          //paginationObj={paginationObj}
          //sort={sortObj}
          //sortFun={this.sortFun}
        />

        </Panel >)
    }
}

export default Form.createForm()(VisitPage);