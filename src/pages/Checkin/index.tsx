import * as React from 'react';
import {Panel, Select, FormControl,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../components/Grid';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";

import ManService from '../../services/ManService';
import {PageModel} from '../../services/Model/Models';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";


interface IPageProps {
    form:any
}
interface IPageState {
    page:PageModel<any>,
    selectedkey:any
}

 class CheckinPage extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        page:new PageModel<any>(),
        selectedkey:''
    }
    async componentDidMount() {
        let page = await ManService.searchCheckin({pageIndex:1,pageSize:20}) as PageModel<any>;
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
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
      

          const toolBtns = [{
            value:'无效',
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        }];

        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
          }
        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      社戒管控
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      签到
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
                            onChange={()=>{}}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                            onStartInputBlur={this.onStartInputBlur}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </FormItem>
                </FormList>
                </SearchPanel>
        <Grid
          toolBtns={toolBtns}
          columns={columns}
          page={this.state.page}
          getSelectedDataFunc={this.getSelectedDataFunc}
          //paginationObj={paginationObj}
        />


        </Panel >)
    }
}

export default Form.createForm()(CheckinPage);