import * as React from 'react';
import {Panel,Loading,ButtonGroup ,Button,Icon,Select, FormControl,Form, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';

import DatePicker from "bee-datepicker";
import SelectMonth from '../../../components/SelectMonth';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import {deepClone,getValidateFieldsTrim} from '../../../utils/tools';
import BussService from '../../../services/BussService';
import {PageModel} from '../../../services/Model/Models';

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
            { title: '姓名', dataIndex: 'manName', key: 'manName', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName', width: 200 },
            { title: '类型', dataIndex: 'warnType', key: 'warnType', width: 100 },
            { title: '内容', dataIndex: 'content', key: 'content', width: 200 },
            { title: '社工', dataIndex: 'linkName', key: 'linkName', width: 150 },
            { title: '民警', dataIndex: 'mjName', key: 'mjName', width: 150 },
            { title: '处理结果', dataIndex: 'mjResp', key: 'mjResp', width: 200 }
            
          ];
        
          const toolBtns = [{
            value:'新增',
            
            bordered:false,
            colors:'primary'
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
            items:5,
            total:this.state.page.dataCount,
            freshData:this.freshata,
            onDataNumSelect:this.onDataNumSelect, 
            showJump:false,
            noBorder:true
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

        <ButtonGroup style={{ margin: 10 }}>
                <Button shape='border'><Icon type='uf-navmenu' /></Button>
                <Button shape='border'><Icon type='uf-file' /></Button>
                <Button shape='border'><Icon type='uf-pencil' /></Button>
                <Button shape='border'><Icon type='uf-del' /></Button>
        </ButtonGroup>
        <Grid
          columns={columns}
          rowKey={(r, i) => r.c}
          data={this.state.page.data}
          getSelectedDataFunc={this.getSelectedDataFunc}
          paginationObj={paginationObj}
        />

        </Panel >)
    }
}

export default Form.createForm()(AuditNoticeWarnPage);