import * as React from 'react';
import {Panel, Tabs,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";
import SelectMonth from '../../components/SelectMonth';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import InputNumber from 'bee-input-number';
import ManService from '../../services/ManService';
import {PageModel} from '../../services/Model/Models';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";


interface IPageProps {
    form:any
}
interface IPageState {
    current:string,
    data:any[],
    data2:any[],
}

 class ForhelpPage extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        data:[],
        data2:[],
        current:''
    }

    async componentDidMount() {
        let page = await ManService.search4Help({pageIndex:1,pageSize:20}) as PageModel<any>;
        this.setState({data:page.data});
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
            value:'生成计划',
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-search',
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
			      求助
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
                        label="员工编号"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="员工姓名"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>


                    <FormItem
                        label="司龄"
                    >
                        <InputNumber
                            min={0}
                            max={99}
                            iconStyle="one"
                            {...getFieldProps('serviceYearsCompany', {initialValue: "0",})}
                        />
                    </FormItem>

                    <FormItem
                        label="年份"
                    >
                        <DatePicker.YearPicker
                            {...getFieldProps('year', {initialValue: null})}
                            format={format}
                            locale={zhCN}
                            placeholder="选择年"
                        />
                    </FormItem>

                    <FormItem
                        label="月份"
                    >
                        <SelectMonth {...getFieldProps('month', {initialValue: ''})} />
                    </FormItem>

                    <FormItem
                        label="是否超标"
                    >
                        <Select {...getFieldProps('exdeeds', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Tabs
                defaultActiveKey="1"
                onChange={()=>{}}
            >
                <Tabs.TabPane tab='未处理' key="1">
                    <Grid
                        columns={columns}
                        data={this.state.data}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        paginationObj={paginationObj}
                    />

                </Tabs.TabPane>
                <Tabs.TabPane tab='已处理' key="2">
                    <Grid
                        columns={columns}
                        data={this.state.data2}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        paginationObj={paginationObj}
                    />
                </Tabs.TabPane>
            </Tabs>    

        </Panel >)
    }
}

export default Form.createForm()(ForhelpPage);