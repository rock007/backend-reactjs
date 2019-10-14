import * as React from 'react';

import {Tree ,Tabs ,Panel,Breadcrumb, PageLayout,Navbar,Icon,Select,Option, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import SelectMonth from '../../components/SelectMonth';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import InputNumber from 'bee-input-number';
import Alert from '../../components/Alert';
import PopupModal from './Edit';

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
    editModelVisible:boolean
}
export  class Man extends React.Component<IPageProps,IPageState> {

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
        editModelVisible:false
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
            onClick:() => {
                this.onClickShowModel(0);
            }
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
			      Home
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      Library
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      人员档案
			    </Breadcrumb.Item>
			</Breadcrumb>

            <Row>
                <Col md="2">

                <Tree className="myCls" showLine checkable

checkStrictly
showIcon
cancelUnSelect={true}
>
<Tree.TreeNode title="parent 1" key="0-0"  icon={<Icon type="uf-treefolder"  />}>
<Tree.TreeNode title="parent 1-0" key="0-0-0" disabled  icon={<Icon type="uf-treefolder" />}>
<Tree.TreeNode title="leaf" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o" />}/>
<Tree.TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o" />}/>
</Tree.TreeNode>
<Tree.TreeNode title="parent 1-1" key="0-0-1" icon={<Icon type="uf-treefolder" />}>
<Tree.TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o" />}/>
</Tree.TreeNode>
</Tree.TreeNode>
</Tree>
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
                        label="身份证号"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="员工姓名"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="电话号码"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                   

                    <FormItem
                        label="月份"
                    >
                        <SelectMonth {...getFieldProps('month', {initialValue: ''})} />
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="执行状态"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>
                <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
              
            <Grid
          columns={columns}
          data={data}
          getSelectedDataFunc={this.getSelectedDataFunc}
          paginationObj={paginationObj}
        />
                </Col>
            </Row>

            <PopupModal
                    editModelVisible={this.state.editModelVisible}
                    onCloseEdit={this.onCloseEdit}
                    currentIndex={1}
                    btnFlag={1}
                />
            <Alert show={false} context="是否要删除 ?"
                           confirmFn={() => {
                             //  this.confirmGoBack(1);
                           }}
                           cancelFn={() => {
                              // this.confirmGoBack(2);
                           }}
                    />
            </Panel>
        )
    }
}

export default Form.createForm()(Man);