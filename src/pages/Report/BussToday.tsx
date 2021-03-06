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

 class BussTodayPage extends React.Component<IPageProps,IPageState> {

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
      
      if(page!=null){
        this.setState({page:page,isLoading:false});
      }
     else{
        this.setState({isLoading:false});
     }
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
 
  render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '时间', dataIndex: 'shortName', key: 'shortName',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'unitName', key: 'unitName', textAlign:'center',width: 150 },
      
            { title: '建档(人)', dataIndex: 'chargeNan', key: 'chargeNan',textAlign:'center', width: 120 },
            { title: '社康(人)', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
            { title: '社戒(人)', dataIndex: 'address', key: 'address',textAlign:'center', width: 100 },
            { title: '走访(次)', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 100 },
            { title: '尿检(次)', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 100 },
            { title: '请假(条)', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 100 },
            { title: '求助(条)', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 100 }
          ];
      
        const toolBtns = [];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      统计分析
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                  今日业务统计
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
                        label="社区名称">
                        <FormControl placeholder='单位名称' {...getFieldProps('unitName', {initialValue: ''})}/>
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
          
        </Panel >)
    }
}

export default Form.createForm()(BussTodayPage);