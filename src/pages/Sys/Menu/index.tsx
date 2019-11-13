import * as React from 'react';
import { inject, observer } from 'mobx-react';
import loadsh from  'lodash';

import {Panel, Table,Row, Col,Checkbox,FormControl,Tag,Form,Breadcrumb,Select } from 'tinper-bee';
import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import Grid from '../../../components/Grid';
import SysService from '../../../services/SysService';
import MenuPanel from './Panel';
import { Info ,getValidateFieldsTrim} from '../../../utils';
import PermissionEditStore from '../../../stores/PermissionEditStore';
import Store from '../../../stores/StoreIdentifier';
import { PageModel } from '../../../services/Model/Models';

const FormItem = FormListItem;

interface IPageProps {
    form:any,
    history:any,
    permissionEditStore?:PermissionEditStore
}
interface IPageState {
    isEditPop:boolean,
    page:PageModel<any>,
    isLoading:boolean,
    //searchArgs:any
}

@inject(Store.PermissionEditStore)
@observer
 class MenuPage extends React.Component<IPageProps,IPageState> {

    selected:Array<any>=[]

    pageIndex=1
    pageSize=10
    //parentId='';

    searchArgs:any

    state:IPageState={
        isEditPop:false,
        page:new PageModel(),
        isLoading:false,
        //searchArgs:{}
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

          console.log('Search:'+JSON.stringify(values));
         
          //values['parentId']=this.parentId;

          //this.setState({searchArgs:values});
          this.searchArgs=loadsh.defaults(values,this.searchArgs) ;
          this.freshata(1);
      });
    }

    freshata= async (index)=>{
    
      this.setState({isLoading:true});

      this.pageIndex=index;
      const page= await SysService.searchPermissionBy(this.searchArgs,this.pageIndex,this.pageSize);

      this.setState({page:page,isLoading:false});
    }

    resetSearch=()=>{
      this.props.form.resetFields();

      this.props.form.validateFields((err, _values) => {

          let values = getValidateFieldsTrim(_values);

          let arrayNew = [];
          for (let field in values) {
              arrayNew.push({key: field});
          }

          console.log('resetSearch:'+JSON.stringify(arrayNew));

      });
    }

  
      onTreeSelectedChange=(m,e)=>{

        if(m!=null&&m.length>0){

          this.searchArgs.parentId=m[0];
          this.validFormSubmit();
        }
    }

    gotoEdit=(id)=>{
      this.props.history.push('/permission-edit/'+id);
     
    }
    getSelectedDataFunc = (selectData, record, index) => {

      //this.setState({selectRows:selectData });

      /** 
      let  tableData  = this.state.data;
      let _tableData =loadsh.cloneDeep(tableData);

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
      ***/
      // 获取选中数据
      let _selectData =loadsh.cloneDeep(selectData);

      console.log("selvalue",_selectData);

      this.selected=_selectData;
      this.props.permissionEditStore.selectedRows=_selectData;//.updateSelectRows(_selectData);
      
      //this.setState({selectedIndex:index});
    }
    
    render() {
        const {permissionEditStore}=this.props;

        const { getFieldProps, getFieldError } = this.props.form;


        const columns = [
            { title: '名称', dataIndex: 'name', key: 'name',textAlign:'center', width: 100 },
            { title: '类型', dataIndex: 'type', key: 'type',textAlign:'center', width: 100 ,render(text,record,index) {

              return text==1?'菜单':(text==2?'模块':(text==3?'操作':'未知'));
            }},
            { title: '图标', dataIndex: 'icon', key: 'icon',textAlign:'center', width: 80 },
            { title: 'URL', dataIndex: 'url', key: 'url',textAlign:'center', width: 150 },
            { title: 'method', dataIndex: 'method', key: 'method',textAlign:'center', width: 100 },
            { title: '权限值', dataIndex: 'attr', key: 'attr',textAlign:'center', width: 100 },
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 100 ,render(text,record,index) {

              if(text==0){
                return ( <Tag colors="warning">停用</Tag>);
              }else if(text==1){
                return ( <Tag colors="success">正常</Tag>);
              }else if(text==-1){
                return ( <Tag colors="danger">删除</Tag>);
              }
              return text;
            }}
          ];
          
          const toolBtns = [{
              value:'新增',
              onClick:()=>this.gotoEdit(0),
              bordered:false,
              colors:'primary'
            },{
              value:'编辑',
              disabled:this.selected.length>1?true:false ,//permissionEditStore.selectedRows!=null?permissionEditStore.selectedRows!.length==1?false:true:true,
              onClick:()=>{
               
                if(permissionEditStore.selectedRows.length==0){

                  Info('请选择要编辑的记录');
                  return;
                }
                if(permissionEditStore.selectedRows.length>1){

                  Info('编辑记录只能选择一条');
                  return;
                }
                this.gotoEdit(permissionEditStore.selectedRows[0].id);
                //this.setState({isEditPop:true});
              },
            },
            {
              value:'删除'
            }
          ];

        return ( <Panel>
        <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      系统管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      权限菜单
			    </Breadcrumb.Item>
			  </Breadcrumb>

            <Row>
                <Col md="2">
                    <MenuPanel onSelected={this.onTreeSelectedChange} isCheckbox={false} allowType={[1,2]}/>
                </Col>
                <Col md="10">
                <SearchPanel
                  reset={this.resetSearch}
                  onCallback={()=>{}}
                  search={this.validFormSubmit}
                  searchOpen={true}
                >

                <FormList size="sm">
                    <FormItem
                        label="名称"
                    >
                        <FormControl placeholder='请输入名称' {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="权限值"
                    >
                        <FormControl placeholder='请输入权限值' {...getFieldProps('attr', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="类型"
                    >
                        <Select {...getFieldProps('type', {initialValue: ''})}>
                            <Select.Option value="">请选择</Select.Option>
                            <Select.Option value="1">菜单</Select.Option>
                            <Select.Option value="2">模块</Select.Option>
                            <Select.Option value="3">操作</Select.Option>
                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>
                  <Grid
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    isLoading={this.state.isLoading}
                  />

              </Col>
            </Row>
        </Panel >)
  
    }
}

export default Form.createForm()(MenuPage);