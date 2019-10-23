import * as React from 'react';
import {Panel, Button,ButtonGroup,Icon, FormControl,Form,Loading, Breadcrumb } from 'tinper-bee';

import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import SysService from '../../../services/SysService';
import { deepClone,getValidateFieldsTrim } from '../../../utils/tools';

const FormItem = FormListItem;

interface IPageProps {
    form:any
}
interface IPageState {
    data:any[],
    currentIndex?:number,
    currentRecord?:any,
    isLoading:boolean
}

 class RolePage extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        data:[],
        isLoading:false
    }
    componentDidMount() {

        this.freshata();
    }
   
    getSelectedDataFunc = data => {
        console.log("data", data);
      };

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

           this.freshata();
        });
      }
      /**
       * 请求页面数据
       */
    freshata= async ()=>{
    
      
        
        this.setState({isLoading:true});
        let data = await SysService.searchRole() as any[];

        this.setState({data:data,isLoading:false});
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
            { title: '角色', dataIndex: 'roleName', key: 'roleName',textAlign:'center', width: 200 },
            { title: '说明', dataIndex: 'roleDesc', key: 'roleDesc',textAlign:'center', width: 300 },
            
          ];
        
          const toolBtns = [{
            value:'新增',
            bordered:false,
            colors:'primary'
        }];

        let paginationObj = {
            total:this.state.data.length,
            freshData:this.freshata,
            onDataNumSelect:this.onDataNumSelect, 
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
			      角色管理
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.resetSearch}
                onCallback={()=>{}}
                search={this.validFormSubmit}
                searchOpen={true}
            >
                <FormList size="sm">
                    <FormItem
                        label="角色"
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                </FormList>
                </SearchPanel>


        <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
        <Grid
          multiSelect="no"
          columns={columns}
          data={this.state.data}
          paginationObj={paginationObj}
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
        />

        </Panel >)
    }
}

export default Form.createForm()(RolePage);