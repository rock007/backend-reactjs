import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';
import DatePicker from "bee-datepicker";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import moment from 'moment'
  
import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import ReportService from '../../services/ReportService';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import {PageModel, PopPageModel,IPageCommProps,IListPageState} from '../../services/Model/Models';

import PageDlog from '../../components/PageDlg';

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

moment.locale('zh-cn')

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    displayType:number
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

 class BussYearPage extends React.Component<IPageProps,IPageState> {

    pageIndex=1
    pageSize=10
    orderBy=[]

    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
        pageModel:new PopPageModel(),
        isPopPage:false,
        isDeleteAlterShow:false,
        displayType:0
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

          values.yyyymm = values.yyyymm!=null?values.yyyymm.format('YYYYMM'):"";

          this.setState({isLoading:true});
          this.loadData(values);
      });
  }

  loadData=async (args:any)=>{
      
      args['orderby']=this.orderBy;
      let page = await ReportService.searchReportYear(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
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
 
handleChange=(value)=>{
    this.setState({displayType:value});
}

render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const data = [
            {
              name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
            },
            {
              name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
              name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
              name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
              name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
              name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
              name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
          ];

        const columns = [
          { title: '时间', dataIndex: 'yyyy', key: 'yyyy',textAlign:'center', width: 100 },
          { title: '社区', dataIndex: 'orgName', key: 'orgName', textAlign:'center',width: 150 },
    
          { title: '建档(人)', dataIndex: 'chargeNan', key: 'chargeNan',textAlign:'center', width: 120 },
          { title: '社戒(人)', dataIndex: 'manShejieAdd', key: 'manShejieAdd',textAlign:'center', width: 100 },
          { title: '社康(人)', dataIndex: 'manShekanAdd', key: 'manShekanAdd',textAlign:'center', width: 120 },
          { title: '其他(人)', dataIndex: 'manOtherAdd', key: 'manOtherAdd',textAlign:'center', width: 120 },

          { title: '走访(次)', dataIndex: 'visit', key: 'visit',textAlign:'center', width: 100 },
          { title: '尿检(次)', dataIndex: 'niaojian', key: 'niaojian',textAlign:'center', width: 100 },
          { title: '请假(条)', dataIndex: 'dayoff', key: 'dayoff',textAlign:'center', width: 100 },
          { title: '求助(条)', dataIndex: 'help', key: 'help',textAlign:'center', width: 100 },
          { title: '签到(人)', dataIndex: 'checkin', key: 'checkin',textAlign:'center', width: 100 }
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
                业务年报（历史）
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
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="时间">
                        <DatePicker.YearPicker  format='YYYY' defaultValue={moment()}
                           {...getFieldProps('yyyy', {initialValue: ''})}
                        />
                    </FormItem>
                    <FormItem
                        label="显示方式">
                        <Radio.RadioGroup 
                               defaultValue="0"
                               onChange={this.handleChange}>
                            <Radio value="0">表格</Radio>
                            <Radio value="1">图表</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                </FormList>
                </SearchPanel>

                {
                   this.state.displayType==0?
                   <Grid
                    isLoading={this.state.isLoading}
                    toolBtns={toolBtns}
                    columns={columns}
                    page={this.state.page}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    pageChange={this.onPageChange}
                />
                :
                <BarChart
                        width={500}
                        height={430}
                        data={data}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
               }
                </Col>
            </Row>    
          <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
          </PageDlog>
        </Panel>)
    }
}

export default Form.createForm()(BussYearPage);