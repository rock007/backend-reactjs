import * as React from 'react';
import {Panel, Loading,Radio,Select, FormControl,Form,Tag, Breadcrumb } from 'tinper-bee';

import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import DatePicker from "bee-datepicker";
import zhCN from "rc-calendar/lib/locale/zh_CN";

import SysService from '../../../services/SysService';
import {PageModel} from '../../../services/Model/Models';
import { getValidateFieldsTrim } from '../../../utils/tools';
import UserEditPop from './Edit';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IPageProps {
    form:any
}
interface IPageState {
    page:PageModel<any>,
    currentIndex?:number,
    currentRecord?:any,
    isLoading:boolean,
    dataNumIndex:number,
    isEditPop:boolean
}

 class UserPage extends React.Component<IPageProps,IPageState> {
    
    pageIndex:number=1
    pageSize:number=10

    refs:{
        [string: string]: any;
        grid:any;
    }
    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        dataNumIndex:0,
        isEditPop:false
    }
    componentDidMount() {
        this.validFormSubmit();
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
      /**
       * 请求页面数据
       */
       freshata= async (index)=>{
      
        this.pageIndex=index;

        this.setState({isLoading:true});
        let page = await SysService.searchAccount({uid:'001'},this.pageIndex,this.pageSize) as PageModel<any>;

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

    export = ()=>{
        console.log('export=======');
        this.refs.grid.exportExcel();
    }

    getSelectedDataFunc = data => {
        console.log("data", data);
      };
     
    onDataNumSelect=(index)=>{
        
        this.setState({dataNumIndex:index});
        this.pageSize=[10,20,50,100][index];
        this.validFormSubmit();
    }
   
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '帐号', dataIndex: 'userName', key: 'userName',textAlign:'center', width: 100 },
            { title: '姓名', dataIndex: 'trueName', key: 'trueName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 ,render(m){

                return m==null?'':m==1?'男':'女';
            }},
            { title: '手机', dataIndex: 'mobile', key: 'mobile',textAlign:'center', width: 120 },
            { title: '角色', dataIndex: 'roles', key: 'roles', width: 100,textAlign:'center' ,render(m){

                if(m!=null&&m.length>0){

                   var html=  m.map(element => {
                        
                        return (
                            <Tag colors={"success"}>{element.roleName}</Tag>
                            )
                    });

                    return (<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>{html}</div>)
                }
                return '';
            }},
            { title: '是否戒毒人员', dataIndex: 'manId', key: 'manId', width: 120,textAlign:'center',render(m){

                return m!=null?(<Tag colors={"success"}>否</Tag>):(<Tag colors={"danger"}>是</Tag>)

            } },
            { title: '组织部门', dataIndex: 'dept', key: 'dept', width: 200,textAlign:'center',render(m){

                return m!=null?(m.deptName!=null?m.deptName:''):'';
            } },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            
          ];
      
          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary',
            onClick:()=>{this.setState({isEditPop:true})}
        },{
            value:'修改',
            iconType:'uf-edit',
            onClick:()=>{}
        },{
            value:'详细',
            onClick:()=>{}
        },{
            value:'删除',
            iconType:'uf-delete',
            
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
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:true,
            noBorder:true
          }
        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      系统管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      用户管理
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
                        label="帐号"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('exdeeds2', {initialValue: ''})}>
                            <Option value="">请选择</Option>
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>
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
                        />
                    </FormItem>

                    <FormItem
                        label="戒毒人员"
                    >
                        <Radio.RadioGroup
                            name="isMan"
                            defaultValue="2"
                            onChange={(v)=>{}}
                        >
                            <Radio value="1" >是</Radio>
                            <Radio value="2" >否</Radio>
                        </Radio.RadioGroup>
                    </FormItem>

                    <FormItem
                        label="组织部门"
                    >
                        <DatePicker.YearPicker
                            {...getFieldProps('year', {initialValue: null})}
                            format={format}
                            locale={zhCN}
                            placeholder="选择年"
                        />
                    </FormItem>

                    <FormItem
                        label="角色"
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
        <Grid
          ref="grid"
          columns={columns}
          data={this.state.page.data}
          getSelectedDataFunc={this.getSelectedDataFunc}
          paginationObj={paginationObj}
        />
        <UserEditPop isShow={this.state.isEditPop} onCloseEdit={()=>{this.setState({isEditPop:false})}}/>
        </Panel >)
    }
}

export default Form.createForm()(UserPage);