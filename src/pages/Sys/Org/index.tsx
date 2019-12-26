import * as React from 'react';
import {Panel, Button,ButtonGroup,Icon,Select, FormControl,Row, Col,Loading ,Form,Tag, Breadcrumb } from 'tinper-bee';

import Alert from '../../../components/Alert';
import Grid from '../../../components/Grid';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import OrgPanel from '../../../pages/Sys/Org/Panel';
import { deepClone,getValidateFieldsTrim } from '../../../utils/tools';
import SysService from '../../../services/SysService';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import PageDlog from '../../../components/PageDlg';
import { Info } from '../../../utils';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class OrgPage extends React.Component<IPageProps,IPageState> {

    pageIndex:number=1
    pageSize:number=10

    orgId:string="0";

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
    go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
        if(isPage){
            this.props.history.push(url);
        }else{
            const model=new PopPageModel(title,url);
  
            model.size=size;
  
            this.setState({isPopPage:true,pageModel:model});
        }
    }
    onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        this.search();
     }
     getSelectedDataFunc = (data, record, index) => {

        this.setState({checkedRows:data});
    }
    onOrgTreeClick=(records:any)=>{

        if(records!=null&&records.length>0){

            this.orgId=records[0];
            this.search();
        }
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

            this.loadData();
        });

    }

    loadData= async ()=>{
    
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
    handler_delete=async()=>{
  
        this.setState({isLoading:true,isDeleteAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));

        let idstr=arr.join(',');

        await SysService.deleteOrg(idstr)
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
            { title: '编号', dataIndex: 'id', key: 'id',textAlign:'center', width: 100 },
            { title: '部门', dataIndex: 'deptName', key: 'deptName',textAlign:'center', width: 250 },
            { title: '联系电话', dataIndex: 'deptPhone', key: 'deptPhone',textAlign:'center', width: 100 },
            { title: '负责人', dataIndex: 'leadUser',isShow:false, key: 'leadUser', textAlign:'center',width: 120 },
            { title: '地址', dataIndex: 'deptAddress',isShow:false, key: 'deptAddress',textAlign:'center',width: 250 },
            { title: '地区', dataIndex: 'areaName', key: 'areaName',textAlign:'center', width: 200 },
            { title: '排序', dataIndex: 'deptSort',isShow:false, key: 'deptSort',textAlign:'center', width: 80 },
            { title: '状态', dataIndex: 'isDisable', key: 'isDisable',textAlign:'center', width: 100,
            render: (text, record, index) => {
                return text==null||text==1?(<Tag colors={"danger"}>受限</Tag>):(
                  <Tag colors={"success"}>正常</Tag>
                );
            } }
            
          ];
          
          const toolBtns = [{
            value:'新增',
            attr:'act_org_add',
            bordered:false,
            colors:'primary',
            onClick:()=>{
                this.go2Page('/org-edit/0',"组织机构新增",false);
            }
        },{
            value:'修改',
            attr:'act_org_update',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/org-edit/'+this.state.checkedRows[0].id,"组织机构修改",false);

                }else{
                    Info('请选择要编辑的记录');
                }
            }

        },{
            value:'删除',
            attr:'act_org_delete',
            onClick:()=>{

                if(this.state.checkedRows.length==0){

                    Info('请选择要删除的记录');
                }else{

                    this.setState({isDeleteAlterShow:true});
                }
            }
        }];

       
        return ( <Panel>
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
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}>
                <FormList size="sm">
                    <FormItem
                        label="部门 "
                    >
                        <FormControl placeholder='模糊查询' {...getFieldProps('name', {initialValue: ''})}/>
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
    </Col>
    </Row>
        </Panel >)
    }
}

export default Form.createForm()(OrgPage);