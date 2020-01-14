import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';
import { Link } from 'react-router-dom';

import Grid from '../../../components/Grid';
import Alert from '../../../components/Alert';

import CmsService from '../../../services/CmsService';
import {PageModel, PopPageModel, IPageCommProps, IListPageState} from '../../../services/Model/Models';
import PageDlog from '../../../components/PageDlg';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info } from '../../../utils';
import ArticleCatePanel from './Panel';
import AppConsts from '../../../lib/appconst';
import defaultPic from '../../../images/pic_holder.png';

interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;
/**
 * 文章分类
 */
 class ArticleCatePage extends React.Component<IPageProps,IPageState> {

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
      let page = await CmsService.searchCate(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
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

  onTreeClick=(records:any)=>{

    if(records!=null&&records.length>0){

        //this.orgId=records[0];
        this.search();
    }
}

handler_delete=async ()=>{

    this.setState({isLoading:true,isDeleteAlterShow:false});

    let ids:string='';
    this.state.checkedRows.map((item,index)=>{
        ids=ids+','+item.id;
    });
   await CmsService.deleteCateByIds(ids).then(()=>{

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

        const me=this;
        const columns = [
            { title: '编号', dataIndex: 'cateId', key: 'cateId',textAlign:'center', width: 100 },
            { title: '名称', dataIndex: 'title', key: 'title', textAlign:'center',width: 150 },
            { title: '封面', dataIndex: 'logo', key: 'logo',textAlign:'center', width: 160 ,render(text,record,index) {
             
                return text!==null&&text!==''?
                    ( 
                     <img id="image" width={60} height={60} src={AppConsts.uploadUrl+text} alt="封面"/>
                   ):
                 (<img id="image" width={60} height={60} src={defaultPic} alt="封面"/>);
            }},
            { title: '排序', dataIndex: 'index', key: 'index',textAlign:'center', width: 80 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 150 }

          ];
      
          const toolBtns = [{
            value:'添加',
            //attr:'act_cms_cate_add',
            bordered:false,
            colors:'primary',       
            onClick:()=>{

                this.go2Page('/cms/cate-edit/0',"新增",false);
            }
          },{
            value:'修改',
            //attr:'act_cms_cate_modify',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('修改只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/cms/cate-edit/'+this.state.checkedRows[0].cateId,"修改",false);

                }else{
                    Info('请选择要修改的记录');
                }

            }
        },{
            value:'删除',
            //attr:'act_cms_cate_delete',
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
			      信息分类
			    </Breadcrumb.Item>
			</Breadcrumb>

            <Row>
                <Col md="3">

                    <ArticleCatePanel onClick={this.onTreeClick} ></ArticleCatePanel>
               
                </Col>
                <Col md="9">
                
                <Grid
                    isLoading={this.state.isLoading}
                    toolBtns={toolBtns}
                    columns={columns}
                    isExport={false}
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

export default Form.createForm()(ArticleCatePage);