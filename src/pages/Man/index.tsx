import * as React from 'react';

import {Panel,Breadcrumb,Select,FormControl,Row, Col,Form} from 'tinper-bee';
import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import Alert from '../../components/Alert';
import PopupModal from './Edit';
import OrgPanel from '../../pages/Sys/Org/Panel';
import ManCateSelect from '../../components/ManCateSelect';
import ManService from '../../services/ManService';
import {PageModel} from '../../services/Model/Models';

import SelectDict from '../../components/SelectDict';
import {RefWalsinLevel, RefIuapDept} from '../../components/RefViews'

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
    editModelVisible:boolean,
    data:any[]
}
export  class Man extends React.Component<IPageProps,IPageState> {

    refs:{
        [string: string]: any;
        grid:any;
    }

    state:IPageState={
        data:[],
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

    async componentDidMount() {

        let page = await ManService.search({pageIndex:1,pageSize:20}) as PageModel<any>;

        this.setState({data:page.data});
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
        this.refs.grid.exportExcel();
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

    /**
     * 关闭修改model
     */
    onCloseEdit = () => {
        this.setState({editModelVisible: false});
    }
    /**
   * 后端获取数据
   */
    sortFun = (sortParam)=>{
        console.info(sortParam);
        //将参数传递给后端排序
    }

    render() {

        const { getFieldProps, getFieldError } = this.props.form;

        const {Option} = Select;
        const format = "YYYY";

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
            value:'新增',
            
            bordered:false,
            colors:'primary',
            onClick:() => {
                this.onClickShowModel(0);
            }
        },{
            value:'编辑',
            bordered:false,
            colors:'default',
            onClick:() => {

            }
        },{
            value:'详细',
            bordered:false,
            colors:'default',
            onClick:() => {

            }
        },{
            value:'删除',
            bordered:false,
            colors:'default',
            onClick:() => {

            }
        },{
            value:'执行社戒',
            iconType:'uf-personin-o',
            onClick:()=>{}
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        },{
            value:'打印',
            iconType:'uf-print',
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
                    档案库
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
                        label="身份证号"
                    >
                        <FormControl placeholder='精确查询' {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
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
                        <RefWalsinLevel
                            disabled={false}
                            placeholder="请选择网格"
                            {...getFieldProps('dept', {
                                initialValue: JSON.stringify({
                                    refname:   '',
                                    refpk:  ''
                                }),
                                rules: [{
                                    message: '请选择网格',
                                    pattern: /[^({"refname":"","refpk":""}|{"refpk":"","refname":""})]/
                                }],
                            })}
                            backdrop={false}
                        />
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

                    
                </FormList>
                </SearchPanel>
                <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
              
                <Grid
                    ref="grid"
                    className="table-color"
                    columns={columns}
                    data={this.state.data}
                    exportData={this.state.data}
                    sheetName="档案库"
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    paginationObj={paginationObj}
                    sort={sortObj}
                    sortFun={this.sortFun}
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