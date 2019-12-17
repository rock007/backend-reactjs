import * as React from 'react';
import {Panel, Button,ButtonGroup,Icon, FormControl,Form,Loading, Breadcrumb } from 'tinper-bee';

import Alert from '../../../components/Alert';
import Grid from '../../../components/Grid';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import SysService from '../../../services/SysService';
import { deepClone,getValidateFieldsTrim } from '../../../utils/tools';

import {  IListPageState, PageModel, PopPageModel, IPageCommProps } from '../../../services/Model/Models';
import PageDlog from '../../../components/PageDlg';
import { Info } from '../../../utils';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class RolePage extends React.Component<IPageProps,IPageState> {
    
    pageIndex:number=1
    pageSize:number=10

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
            // 参照特殊处理
            let {dept} = values;
            if (dept) {
                let {refpk} = JSON.parse(dept);
                values.dept = refpk;
            }

            console.log('Search:'+JSON.stringify(values));
            this.pageIndex=1;
           this.loadData(values);
        });
      }
    
      loadData= async (args)=>{
        this.setState({isLoading:true});
        let page = await SysService.searchRole(args) ;

        //let page=new PageModel();
        //page.data=list;
        this.setState({page:page,isLoading:false});
      }

      clear=()=>{
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

    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.search();
     }
     getSelectedDataFunc = (data, record, index) => {

        this.setState({checkedRows:data});
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

    handler_delete=async()=>{
  
        this.setState({isLoading:true,isDeleteAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));

        let idstr=arr.join(',');
        await SysService.deleteRole(idstr)
          .then((resp)=>{
  
            Info(resp);
            this.search();
  
          }).catch((err)=>{
  
            Error(err.msg||'删除操作失败！');
           
          }).finally(()=>{this.setState({isLoading:false})});
        
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
                colors:'primary',
                onClick:()=>{
                    this.go2Page('/role-edit/0',"角色新增",false);
                }
            },
            {value:'修改',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/role-edit/'+this.state.checkedRows[0].id,"角色修改",false);

                }else{
                    Info('请选择要编辑的记录');
                }
            }
            },
            {
                value:'删除',
                onClick:()=>{

                if(this.state.checkedRows.length==0){

                    Info('请选择要删除的记录');
                }else{

                    this.setState({isDeleteAlterShow:true});
                }
            }
            },
            {
                value:'权限',
                disabled:this.state.checkedRows.length>1?true:false,
                onClick:()=>{
                    if(this.state.checkedRows.length>1){

                        Info('设置角色权限只能选择一条记录');
    
                    }else if(this.state.checkedRows.length==1){
    
                        this.go2Page('/role-permission/'+this.state.checkedRows[0].id,"角色权限",false);
    
                    }else{
                        Info('请选择要设置角色权限的记录');
                    }
            
                }
                
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
			      角色管理
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}
            >
                <FormList size="sm">
                    <FormItem
                        label="角色" >
                        <FormControl placeholder='角色名称' {...getFieldProps('roleName', {initialValue: ''})}/>
                    </FormItem>

                </FormList>
                </SearchPanel>

                <Grid
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    isLoading={this.state.isLoading}
                    pageChange={this.onPageChange}
                />
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={(flag:number)=>{
                        this.setState({isPopPage:false});
                        if(flag==1) this.search();
                    }} >
            </PageDlog>
            <Alert show={this.state.isDeleteAlterShow} context="确定要删除记录?"
                           confirmFn={() => {
                               this.handler_delete();
                           }}
                           cancelFn={() => {
                              this.setState({isDeleteAlterShow:false})
                           }}
            />
        </Panel >)
    }
}

export default Form.createForm()(RolePage);