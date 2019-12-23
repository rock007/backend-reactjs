import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../components/Grid';
import Alert from '../../components/Alert';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import BussService from '../../services/BussService';
import {PageModel, PopPageModel} from '../../services/Model/Models';

import PageDlog from '../../components/PageDlg';

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

const FormItem = FormListItem;

interface IPageProps {
    form:any,
    history:any,
}

interface IPageState {
    page:PageModel<any>,
    isLoading:boolean,
    checkedRows:Array<any>,

    pageModel: PopPageModel,
    isPopPage:boolean,
    isDeleteAlterShow:boolean
}

 class AreaPage extends React.Component<IPageProps,IPageState> {

    pageIndex=1
    pageSize=10
    orderBy=[]

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

    search= ()=>{
      this.props.form.validateFields((err, _values) => {

          let values = getValidateFieldsTrim(_values);
          
          if(values.orgId){
              values.orgId=JSON.parse(values.orgId).refpk;
          }

          if(values.locationUpdateDate){
              values.locationUpdateDate=values.locationUpdateDate[0].format('YYYY-MM-DD')+'~'+values.locationUpdateDate[1].format('YYYY-MM-DD');
          }

          this.setState({isLoading:true});
          this.loadData(values);
      });
  }

  loadData=async (args:any)=>{
      
      args['orderby']=this.orderBy;
      let page = await BussService.searchUnit(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
      if(page!=null)
        this.setState({page:page,isLoading:false});
  }

  getSelectedDataFunc = data => {
      this.setState({checkedRows:data});
  }
  onPageChange=(pageIndex:number,pageSize:number,orderBy:Array<any>)=>{

      this.pageIndex=pageIndex;
      this.pageSize=pageSize;
      this.orderBy=orderBy;
      this.search();
  }

  clear=()=>{
      this.props.form.resetFields()
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
  }

  onOrgTreeClick=(records:any)=>{

    if(records!=null&&records.length>0){

        //this.orgId=records[0];
        //this.validFormSubmit();
    }
 }
 
 handler_delete=async ()=>{

    this.setState({isLoading:true,isDeleteAlterShow:false});

    let ids:string='';
    this.state.checkedRows.map((item,index)=>{
        ids=ids+','+item.unitId;
    });
   await BussService.deleteUnit(ids).then(()=>{

        Info('删除操作成功');
        this.search();
    })
    .catch((err)=>{
        Error('删除操作失败');
    }).finally(()=>{
        this.setState({isLoading:false});
    });
}

  render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '简称', dataIndex: 'shortName', key: 'shortName',textAlign:'center', width: 100 },
            { title: '名称', dataIndex: 'unitName', key: 'unitName', textAlign:'center',width: 150 },
      
            { title: '负责人', dataIndex: 'chargeMan', key: 'chargeMan',textAlign:'center', width: 120 },
            { title: '联系电话', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
            { title: '地址', dataIndex: 'address', key: 'address',textAlign:'center', width: 180 },
            { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 180 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 160 },
            { title: '创建人', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 160 }
          ];
      
          const toolBtns = [{
            value:'添加',
            bordered:false,
            colors:'primary', 
            onClick:()=>{
                this.go2Page('/grid-unit/0',"新增包办单位",false);
            }             
          },{
            value:'修改',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('修改只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/grid-unit/'+this.state.checkedRows[0].unitId,"修改包办单位",false);

                }else{
                    Info('请选择要修改的记录');
                }

            }
        },{
            value:'删除',
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
                  包办单位
			    </Breadcrumb.Item>
			</Breadcrumb>

            <Row>
               
                <Col md="12">
                <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}
              >
                <FormList size="sm">
                    <FormItem
                        label="单位名称">
                        <FormControl placeholder='单位名称' {...getFieldProps('unitName', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="负责人">
                        <FormControl placeholder='负责人' {...getFieldProps('chargeMan', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="联系电话">
                        <FormControl placeholder='联系电话' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                </FormList>
                </SearchPanel>

                <Grid
                    isLoading={this.state.isLoading}
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    pageChange={this.onPageChange}
                />
                </Col>
            </Row>    
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

export default Form.createForm()(AreaPage);