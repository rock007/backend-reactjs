import * as React from 'react';

import loadsh from  'lodash';

import {Panel, Row, Col,FormControl,Tag,Form,Breadcrumb,Select } from 'tinper-bee';
import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import Grid from '../../../components/Grid';
import SysService from '../../../services/SysService';
import MenuPanel from './Panel';
import { Info ,getValidateFieldsTrim} from '../../../utils';

import { PageModel, IPageCommProps,IListPageState, PopPageModel } from '../../../services/Model/Models';
import DelModal from '../../../components/DelModal';
import AppConsts from '../../../lib/appconst';
import PageDlog from '../../../components/PageDlg';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {


}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class MenuPage extends React.Component<IPageProps,IPageState> {

    //selected:Array<any>=[]

    parentId=''
    orderBy=[]
    pageIndex=1
    pageSize=10

    state:IPageState={

        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
      
        pageModel:new PopPageModel(),
        isPopPage:false,
      
        isDeleteAlterShow:false
    }

    componentDidMount() {
      
      this.search();
    }

    search=()=>{

      this.props.form.validateFields((err, _values) => {

          let values = getValidateFieldsTrim(_values);
          // 年份特殊处理
          if (values.year) {
              values.year = values.year.format('YYYY');
          }

          console.log('Search:'+JSON.stringify(values));
         
          values['parentId']=this.parentId;

          //this.setState({searchArgs:values});
          this.pageIndex=1;
          //const searchArgs=loadsh.defaults(values,this.searchArgs) ;
          this.loadData(values);
      });
    }

    loadData= async (args:any)=>{
    
      this.setState({isLoading:true});
      args['orderby']=this.orderBy;
      const page= await SysService.searchPermissionBy(args,this.pageIndex,this.pageSize);

      this.setState({page:page,isLoading:false});
    }

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

      this.orderBy=orderBy;
      this.pageIndex=pageIndex;
      this.pageSize=pageSize;
      this.search();
   }

    clear=()=>{
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

          this.parentId=m[0];
          this.search();
        }
    }

    getSelectedDataFunc = (data, record, index) => {

      this.setState({checkedRows:data});
    }
    
    alertDel=()=>{
      
      if(this.state.checkedRows.length==0){

        Info('请选择要删除的记录');
        return;
      }
      this.setState({isDeleteAlterShow:true});

    }
    handler_del=async()=>{

      this.setState({isLoading:true,isDeleteAlterShow:false});
      let arr=[];
      this.state.checkedRows.map((v,i)=>arr.push(v.id));
      await SysService.delPermission({ids:arr})
        .then((resp)=>{

          Info(resp);
          this.search();

        }).catch((err)=>{

          Error(err.msg||'删除操作失败！');
         
        }).finally(()=>{this.setState({isLoading:false})});
      
    }

    go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
      if(isPage){
          this.props.history.push(url);
      }else{
          const model=new PopPageModel(title,url);

          model.size=size;

          this.setState({isPopPage:true,pageModel:model});
      }
  }

    render() {
        //const {permissionEditStore}=this.props;

        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '名称', dataIndex: 'name', key: 'name',textAlign:'center', width: 100 },
            { title: '类型', dataIndex: 'type', key: 'type',textAlign:'center', width: 100 ,render(text,record,index) {

              return text==0?'模块':(text==1?'菜单':(text==2?'操作':'未知'));
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
              attr:'act_permission_add',
              onClick:()=>{this.go2Page('/permission-edit/0','新增权限',AppConsts.getOpenModel())},
              bordered:false,
              colors:'primary'
            },{
              value:'编辑',
              attr:'act_permission_update',
              disabled:this.state.checkedRows.length>1?true:false ,//permissionEditStore.selectedRows!=null?permissionEditStore.selectedRows!.length==1?false:true:true,
              onClick:()=>{
               
                if(this.state.checkedRows.length==0){

                  Info('请选择要编辑的记录');
                  return;
                }
                if(this.state.checkedRows.length>1){

                  Info('编辑记录只能选择一条');
                  return;
                }
                //this.gotoEdit(this.selected[0].id);
                this.go2Page('/permission-edit/'+this.state.checkedRows[0].id,'编辑权限',AppConsts.getOpenModel())
                //this.setState({isEditPop:true});
              },
            },
            {
              value:'删除',
              attr:'act_permission_delete',
              onClick:this.alertDel 
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
                    <MenuPanel onSelected={this.onTreeSelectedChange} isCheckbox={false} showRoot={true}  allowType={[0,1]}/>
                </Col>
                <Col md="10">
                <SearchPanel
                  reset={this.clear}
                  onCallback={()=>{}}
                  search={this.search}
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
                            <Select.Option value="0">模块</Select.Option>
                            <Select.Option value="1">菜单</Select.Option>
                            <Select.Option value="2">操作</Select.Option>
                        </Select>
                    </FormItem>
                </FormList>
                </SearchPanel>
                  <Grid
                    toolBtns={toolBtns}
                    isExport={false}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    isLoading={this.state.isLoading}
                    pageChange={this.onPageChange}
                  />
                  <DelModal hide={!this.state.isDeleteAlterShow} confirmFn={this.handler_del} size="sm" modalContent={"确定要删除这个["+this.state.checkedRows.length+"]条记录吗?"}></DelModal>
              </Col>
            </Row>
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={(flag:number)=>{this.setState({isPopPage:false});if(flag==1)this.search();}} >
            </PageDlog>
        </Panel >)
    }
}

export default Form.createForm()(MenuPage);