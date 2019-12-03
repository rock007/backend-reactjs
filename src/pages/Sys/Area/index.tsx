import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../../components/Grid';
import Alert from '../../../components/Alert';
import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import SysService from '../../../services/SysService';
import {PageModel, PopPageModel} from '../../../services/Model/Models';

import PageDlog from '../../../components/PageDlg';
import AreaTreePanel from '../../../pages/Sys/Area/Panel';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info } from '../../../utils';

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

    superId=''

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

          values['superId']=this.superId;
          this.setState({isLoading:true});
          this.loadData(values);
      });
  }

  loadData=async (args:any)=>{
      
      args['orderby']=this.orderBy;
      let page = await SysService.searchArea(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
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

        this.superId=records[0];
        this.search();
    }

}

handler_delete=async ()=>{

    this.setState({isLoading:true,isDeleteAlterShow:false});

    let ids:string='';
    this.state.checkedRows.map((item,index)=>{
        ids=ids+','+item.id;
    });
   await SysService.deleteAreaByIds(ids).then(()=>{

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
            { title: '编号', dataIndex: 'id', key: 'id',textAlign:'center', width: 100 },
            { title: '名称', dataIndex: 'disName', key: 'disName', textAlign:'center',width: 150 },
      
            { title: '说明', dataIndex: 'disDesc', key: 'disDesc',textAlign:'center', width: 180 },
            { title: '排序', dataIndex: 'disSort', key: 'disSort',textAlign:'center', width: 160 }
          ];
      
          const toolBtns = [{
            value:'添加',
            bordered:false,
            colors:'primary',              
          },{
            value:'修改',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('修改只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/area-edit/'+this.state.checkedRows[0].id,"地区编辑",false);

                }else{
                    Info('请选择要编辑的记录');
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
        },{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
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
			      地区
			    </Breadcrumb.Item>
			</Breadcrumb>

            <Row>
                <Col md="3">

                    <AreaTreePanel onClick={this.onOrgTreeClick}/>
               
                </Col>
                <Col md="9">
                <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true}
              >
                <FormList size="sm">
                    <FormItem
                        label="地区名称">
                        <FormControl placeholder='地区名称' {...getFieldProps('name', {initialValue: ''})}/>
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

export default Form.createForm()(AreaPage);