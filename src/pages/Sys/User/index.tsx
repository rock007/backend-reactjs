import * as React from 'react';
import {Panel, Loading,Radio,Select, FormControl,Form,Tag, Breadcrumb ,Checkbox} from 'tinper-bee';
import Alert from '../../../components/Alert';
import Grid from '../../../components/Grid';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';

import DatePicker from "bee-datepicker";

import SysService from '../../../services/SysService';
import {PageModel, IPageCommProps, IListPageState, PopPageModel} from '../../../services/Model/Models';
import { getValidateFieldsTrim } from '../../../utils/tools';

import RefOrgTreeSelect from '../../../components/RefViews/RefOrgTreeSelect';
import AppConsts from '../../../lib/appconst';
import { Info } from '../../../utils';
import PageDlog from '../../../components/PageDlg';
import { threadId } from 'worker_threads';

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";

interface IOtherProps {
    
} 

interface IOtherState {


}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class UserPage extends React.Component<IPageProps,IPageState> {
    
    orderBy=[]

    pageIndex:number=1
    pageSize:number=10

    refs:{
        [string: string]: any;
        grid:any;
    }
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

            //let queryParam = deepClone(this.props.queryParam);
         
           this.pageIndex=1;
           this.loadData(values);
        });
      }

      loadData= async (args)=>{
       
        args['orderby']=this.orderBy;
        this.setState({isLoading:true});
        let page = await SysService.searchAccount(args,this.pageIndex,this.pageSize) as PageModel<any>;

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

            //!!let queryParam = deepClone(this.props.queryParam);
            //!!let {whereParams} = queryParam;

            let arrayNew = [];
            for (let field in values) {
                arrayNew.push({key: field});
            }

            console.log('resetSearch:'+JSON.stringify(arrayNew));

        });
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
    export = ()=>{
        console.log('export=======');
        this.refs.grid.exportExcel();
    }
    alertDel=()=>{
      
        if(this.state.checkedRows.length==0){
  
          Info('请选择要删除的记录');
          return;
        }
        this.setState({isDeleteAlterShow:true});
  
      }
      handler_delete=async()=>{
  
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
            onClick:()=>{this.go2Page('/user-edit/0','新增帐号',AppConsts.isOpenPageModel)}
        },{
            value:'修改',
            iconType:'uf-edit',
            disabled:this.state.checkedRows.length>1?true:false ,
            onClick:()=>{
             
              if(this.state.checkedRows.length==0){

                Info('请选择要编辑的记录');
                return;
              }
              if(this.state.checkedRows.length>1){

                Info('编辑记录只能选择一条');
                return;
              }
              this.go2Page('/user-edit/'+this.state.checkedRows[0].id,'编辑帐号',AppConsts.isOpenPageModel)
             
            }

        },{
            value:'详细',
            onClick:()=>{}
        },{
            value:'删除',
            iconType:'uf-delete',
            onClick:this.alertDel 
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        }];

       
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
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
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
                        label="社区">
                            <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="角色"
                    >
                         <Select {...getFieldProps('roleIds', {initialValue: ''})}>
                                <Option value=''>(请选择)</Option>
                                <Option value='1'>系统管理员</Option>
                                <Option value='2'>社区管理员</Option>
                                <Option value='3'>专职社工</Option>
                                <Option value='4'>社区民警</Option>
                                <Option value='5'>社区医生</Option>
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
                    pageChange={this.onPageChange}
                />
            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
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

export default Form.createForm()(UserPage);