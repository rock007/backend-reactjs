import * as React from 'react';

import {Tree ,Tabs ,Panel,Breadcrumb, PageLayout,Navbar,Icon,Select,Option, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import OrgPanel from '../../pages/Sys/Org/Panel';

import ProcessViewPop from './View';

import DatePicker from "bee-datepicker";

import SelectMonth from '../../components/SelectMonth';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import InputNumber from 'bee-input-number';

import './index.scss';

const FormItem = FormListItem;

interface IPageProps {
    form:any
}
interface IPageState {
    expanded:boolean,
    current:any,
    menus: any[],
    selectedkey:any,
    isViewerShow:boolean
}
export  class ProcessPage extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        expanded:false,
        current:null,
        menus:[{
            id: 0,
            router: 'visitor',
            title: "visitor"
        },{
            id: 1,
            router: 'niaojian',
            title: "niaojian"
        }],
        selectedkey:null,
        isViewerShow:false
    }
    componentDidMount() {

    }

    search=()=>{
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err);
            } else {
                console.log('提交成功', values)
            }
        });
    }
    clear=()=>{
        this.props.form.resetFields()
    }
    onChange = () => {
        this.setState({expanded: !this.state.expanded})
    }

    handleClick = (e) => {
        console.log(e);

        this.setState({
            current: e.key,
        });
    }

    handleChange = (v) => {
        console.log(v)
        this.setState({
            menus : v
        })
    }

    onToggle = (value) => {
        this.setState({expanded: value});
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

        const {Option} = Select;
        const format = "YYYY";

        const columns = [
            { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
            { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
            { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

          const toolBtns = [{
            value:'新增',
            
            bordered:false,
            colors:'primary',
            onClick:()=>{this.setState({isViewerShow:true})}
        },{
            value:'导出',
            iconType:'uf-search',
            onClick:this.export
        },{
            value:'上传',
            iconType:'uf-cloud-up',
        },{
            value:'批量操作',
            //onClick:this.dispatchOpt,
            children:[
                {
                    value:'修改',  
                    onClick:this.dispatchUpdate
                },{
                    value:'删除',  
                    onClick:this.dispatchDel
                }
            ]
        },{
            iconType:'uf-copy',
        }];

        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
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
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
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
                            onChange={this.onChange}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                            onStartInputBlur={this.onStartInputBlur}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </FormItem>

                    <FormItem
                        label="月份"
                    >
                        <SelectMonth {...getFieldProps('month', {initialValue: ''})} />
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('exdeeds', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="风险等级"
                    >
                        <Select {...getFieldProps('exdeeds', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="地区"
                    >
                        <Select {...getFieldProps('exdeeds', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>
                <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
                
                <Tabs
                defaultActiveKey="1"
                onChange={this.onChange}
                className="demo1-tabs"
            >
                <Tabs.TabPane tab='未执行' key="1">Content of Tab Pane 1</Tabs.TabPane>
                <Tabs.TabPane tab='执行中' key="2">
                   
                </Tabs.TabPane>
                <Tabs.TabPane tab='已完成' key="3">Content of Tab Pane 3</Tabs.TabPane>
            </Tabs>

                </Col>
            </Row>
            <ProcessViewPop isShow={this.state.isViewerShow} onCloseEdit={()=>{this.setState({isViewerShow:false})}}/>
            </Panel>
        )
    }
}

export default Form.createForm()(ProcessPage);