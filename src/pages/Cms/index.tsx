import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../components/Grid';
import Alert from '../../components/Alert';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import CmsService from '../../services/CmsService';
import {PageModel, PopPageModel,IPageCommProps,IListPageState} from '../../services/Model/Models';

import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../components/PageDlg';
import DatePicker from "bee-datepicker";

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

const FormItem = FormListItem;
const {Option} = Select;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class ArticlesPage extends React.Component<IPageProps,IPageState> {

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

          if(values.createDate){
              values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
          }

          this.setState({isLoading:true});
          this.loadData(values);
      });
  }

  loadData=async (args:any)=>{
      
      args['orderby']=this.orderBy;
      let page = await CmsService.searchArticle(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
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
  
handler_delete=async ()=>{

    this.setState({isLoading:true,isDeleteAlterShow:false});

    let ids:string='';
    this.state.checkedRows.map((item,index)=>{
        ids=ids+','+item.id;
    });
   await CmsService.deleteArticleByIds(ids).then(()=>{

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
          { title: '标题', dataIndex: 'title', key: 'title',textAlign:'center', width: 150 ,render(text,record,index) {

            return <Label  className='link-go' onClick={()=>{me.go2Page('/articles/'+record.id,'查看',false)}}>{text}</Label>;
            
          }
        },
        { title: '类别', dataIndex: 'cateId', key: 'cateId', textAlign:'center',width: 150 ,sorter: (pre, after) => {return pre.c - after.c}},
      
        { title: '封面', dataIndex: 'logo', key: 'logo',textAlign:'center', width: 160 },

        { title: '置顶', dataIndex: 'isTop', key: 'isTop',textAlign:'center', width: 100 },
        { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 100 },

        { title: '所属社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 },
        { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 ,sorter: (pre, after) => {return pre.c - after.c},},
        { title: '发布者', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 100 },

          ];
      
          const toolBtns = [{
            value:'添加',
            bordered:false,
            colors:'primary',
            onClick:()=>{
                this.go2Page('/article-edit/0',"文章新增",false);
            }              
          },{
            value:'修改',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('修改只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/article-edit/'+this.state.checkedRows[0].id,"文章编辑",false);

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
        }];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                  信息发布
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
                        label="标题">
                        <FormControl placeholder='文章标题' {...getFieldProps('title', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="类别"
                    >
                        <Select {...getFieldProps('cateId', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="0">戒毒宣传</Option>
                            <Option value="1">法律法规</Option>
                        </Select>
                    </FormItem>
                   
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="发布时间">
                        <DatePicker.RangePicker                             
                            {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="是否置顶">
                        <Radio.RadioGroup {...getFieldProps('isTop', {initialValue: ''})}>
                            <Radio value="">(请选择)</Radio>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                    <FormItem
                        label="状态">
                        <Radio.RadioGroup {...getFieldProps('sataus', {initialValue: ''})}>
                            <Radio value="">(请选择)</Radio>
                            <Radio value="0">草稿</Radio>
                            <Radio value="1">上线中</Radio>
                            <Radio value="2">下线</Radio>
                        </Radio.RadioGroup>
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

export default Form.createForm()(ArticlesPage);