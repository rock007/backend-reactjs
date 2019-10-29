import * as React from 'react';
import {Panel,Loading,Tabs ,Button,Icon,Select,Form,FormControl, Breadcrumb } from 'tinper-bee';
import DatePicker from "bee-datepicker";

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';
import SelectDict from '../../../components/SelectDict';
import ManCateSelect from '../../../components/ManCateSelect';

import {deepClone,getValidateFieldsTrim} from '../../../utils/tools';
import BussService from '../../../services/BussService';
import {PageModel} from '../../../services/Model/Models';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IPageProps {
    form:any
}
interface IPageState {
    page:PageModel<any>,
    isLoading:boolean,
    dataNumIndex:number
}

/**
 * 通知函审核
 */
 class AuditNoticeWarnPage extends React.Component<IPageProps,IPageState> {

    pageIndex:number=1
    pageSize:number=10

    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        dataNumIndex:0,
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

           this.freshata(1);
        });
      }
      /**
       * 请求页面数据
       */
       freshata= async (index)=>{
      
        this.pageIndex=index;

        this.setState({isLoading:true});
        //let page = await BussService.searchWarn({orgId:'0001001',status:0},this.pageIndex,this.pageSize) as PageModel<any>;
        let page = await BussService.searchWarn({status:0},this.pageIndex,this.pageSize) as PageModel<any>;

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

    getSelectedDataFunc = (selectData, record, index )=> {
        console.log("data", selectData);
        //this.setState({expanded:data});

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
    }
     
    onDataNumSelect=(index)=>{
       
        this.setState({dataNumIndex:index});
        this.pageSize=[10,20,50,100][index];
        this.validFormSubmit();
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
            { title: '姓名', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 },
            { title: '类型', dataIndex: 'warnType', key: 'warnType',textAlign:'center', width: 100 },
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 200 },
            { title: '社工', dataIndex: 'linkName', key: 'linkName',textAlign:'center', width: 150 },
            { title: '民警', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '处理结果', dataIndex: 'mjResp', key: 'mjResp',textAlign:'center', width: 200 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];
        
          const toolBtns = [{
                    value:'接收',
                    bordered:false,
                    colors:'primary'
                },{
                    value:'回复',
                    onClick:this.export
            }];

        let paginationObj = {
            //items:5,
            total:this.state.page.dataCount,
            freshData:this.freshata,
            onDataNumSelect:this.onDataNumSelect, 
            //showJump:false,
            //noBorder:true
          }
        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      业务审核
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      通知函
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
                        <FormControl placeholder='请输入戒毒人员姓名' />
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' />
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' />
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select >
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>
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
                        label="网格"
                    >
                        <RefGridTreeTableSelect/>
                    </FormItem>
                    <FormItem
                        label="类型"
                    >
                        <Select {...getFieldProps('warnType', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="1">未报到</Option>
                            <Option value="2">尿检阳性</Option>
                            <Option value="3">拒绝检查</Option>
                            <Option value="4">失联</Option>
                            <Option value="5">其它</Option>
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
                </FormList>
                </SearchPanel>

            <Tabs
                defaultActiveKey="1"
            >
                <Tabs.TabPane tab='待接收' key="1">
                    <Grid
                        columns={columns}
                        data={this.state.page.data}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        paginationObj={paginationObj}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab='处理中' key="2">
                    <Grid
                        columns={columns}
                        data={this.state.page.data}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        paginationObj={paginationObj}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab='已完成' key="3">
                    <Grid
                        columns={columns}
                        data={this.state.page.data}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        paginationObj={paginationObj}
                    />

                </Tabs.TabPane>
            </Tabs>

        </Panel >)
    }
}

export default Form.createForm()(AuditNoticeWarnPage);