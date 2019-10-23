import * as React from 'react';
import {Panel, Button,ButtonGroup,Icon,Select, FormControl,Row, Col,Loading ,Form,Tag, Breadcrumb } from 'tinper-bee';

import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import OrgPanel from '../../../pages/Sys/Org/Panel';
import { deepClone,getValidateFieldsTrim } from '../../../utils/tools';
import SysService from '../../../services/SysService';
import {PageModel} from '../../../services/Model/Models';
import { async } from 'q';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IPageProps {
    form:any
}
interface IPageState {
    page:PageModel<any>,
    currentIndex?:number,
    currentRecord?:any
    pageIndex:number,
    pageSize:number,
    isLoading:boolean
}

 class OrgPage extends React.Component<IPageProps,IPageState> {

    orgId:string="0";

    state:IPageState={
        page:new PageModel<any>(),
        pageIndex:1,
        pageSize:20,
        isLoading:false
    }
    componentDidMount() {

        this.freshata();
    }

    getSelectedDataFunc = data => {
        console.log("data", data);
    };
    
    onOrgTreeClick=(records:any)=>{

        if(records!=null&&records.length>0){

            this.orgId=records[0];
            this.validFormSubmit();
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

            this.freshata();
        });

    }
     /**
       * 请求页面数据
       */
      freshata= async ()=>{
    
        this.setState({isLoading:true});
        let page = await SysService.searchOrg("",this.orgId,1,20) as PageModel<any>;
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
    onDataNumSelect=()=>{
        console.log('选择每页多少条的回调函数');
    }

    onDeleteClick=()=>{

        console.log('删除'+JSON.stringify(this.state.currentRecord));
    }
    onEditClick=()=>{
        console.log('编辑'+JSON.stringify(this.state.currentRecord));
    }
    onPermissionClick=()=>{
        console.log('权限查看'+JSON.stringify(this.state.currentRecord));
    }
    
    onRowHover = (index,record) => {
        this.setState({currentIndex:index,currentRecord:record});
    }
    getHoverContent=()=>{
        return <div className="opt-btns">
            <ButtonGroup style={{ margin: 10 }}>
                <Button colors="info" size="sm"><Icon type='uf-file'  onClick={this.onPermissionClick} /></Button>
                <Button colors="info" size="sm"><Icon type='uf-pencil'  onClick={this.onEditClick} /></Button>
                <Button colors="info" size="sm"><Icon type='uf-del' onClick={this.onDeleteClick} /></Button>
            </ButtonGroup>
        </div>
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '编号', dataIndex: 'id', key: 'id',textAlign:'center', width: 100 },
            { title: '部门', dataIndex: 'deptName', key: 'deptName',textAlign:'center', width: 250 },
            { title: '联系电话', dataIndex: 'deptPhone', key: 'deptPhone',textAlign:'center', width: 100 },
            { title: '负责人', dataIndex: 'leadUser',isShow:false, key: 'leadUser', textAlign:'center',width: 120 },
            { title: '地址', dataIndex: 'deptAddress',isShow:false, key: 'deptAddress',textAlign:'center',width: 250 },
            { title: '地区', dataIndex: 'areaName', key: 'areaName',textAlign:'center', width: 200 },
            { title: '排序', dataIndex: 'deptSort',isShow:false, key: 'deptSort',textAlign:'center', width: 80 },
            { title: '状态', dataIndex: 'isDisable', key: 'isDisable',textAlign:'center', width: 100,
            render: (text, record, index) => {
                return text==null||text==1?(<Tag colors={"dange"}>受限</Tag>):(
                  <Tag colors={"success"}>正常</Tag>
                );
            } }
            
          ];
          
          const toolBtns = [{
            value:'新增',
            
            bordered:false,
            colors:'primary'
        }];

        let paginationObj = {
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
			      系统管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      组织管理
			    </Breadcrumb.Item>
			</Breadcrumb>
            <Row>
                <Col md="3">

                <OrgPanel onClick={this.onOrgTreeClick}/>
               
                </Col>
                <Col md="9">
            <SearchPanel
                reset={()=>{}}
                onCallback={()=>{}}
                search={()=>{}}
                searchOpen={true}
            >
                <FormList size="sm">
                    <FormItem
                        label="部门 "
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                </FormList>
                </SearchPanel>


        <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
        <Grid
          multiSelect="no"
          columns={columns}
          data={this.state.page.data}
          paginationObj={paginationObj}
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
        />

    </Col>
    </Row>
        </Panel >)
    }
}

export default Form.createForm()(OrgPage);