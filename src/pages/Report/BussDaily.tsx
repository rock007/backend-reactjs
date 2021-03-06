import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';
import DatePicker from "bee-datepicker";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

import moment from "moment";

import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import ReportService from '../../services/ReportService';
import {PageModel, PopPageModel,IPageCommProps,IListPageState} from '../../services/Model/Models';

import PageDlog from '../../components/PageDlg';
import { getValidateFieldsTrim ,getHeight,getWidth} from '../../utils/tools';
import { Info, Warning } from '../../utils';

const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    displayType:number
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

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

          if(values.yyyymmdd ==null||values.yyyymmdd ===''){
            Warning('时间不能为空');
            return;
          }

          values.yyyymmdd = values.yyyymmdd!=null?values.yyyymmdd.format('YYYYMMDD'):"";

          this.setState({isLoading:true});
          this.loadData(values);
      });
  }

  loadData=async (args:any)=>{
      
      args['orderby']=this.orderBy;
      let page = await ReportService.searchReportDaily(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
      if(page!=null){
        this.setState({page:page,isLoading:false});
      }else{
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

  export = ()=>{
      console.log('export=======');
  }
 
 handleChange=(value)=>{
    this.setState({displayType:value})
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
            { title: '时间', dataIndex: 'yyyymmdd', key: 'yyyymmdd',textAlign:'center', width: 100 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName', textAlign:'center',width: 150 },
      
            { title: '建档(人)', dataIndex: 'manSum', key: 'manSum',textAlign:'center', width: 120 },
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
                业务日报（历史）
			        </Breadcrumb.Item>
			      </Breadcrumb>

            <Row>
               
                <Col md="12">
                <SearchPanel
                  reset={this.clear}
                  onCallback={()=>{}}
                  search={this.search}
                  searchOpen={true}>
                <FormList size="sm">
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="时间">
                        <DatePicker {...getFieldProps('yyyymmdd', {initialValue: moment().add(-1, 'days')})}
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
                        width={getWidth()}
                        height={getHeight()}
                        data={this.state.page.data}
                        margin={{
                          top: 5, right: 3, left: 3, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="orgName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="manSum" name={"建档(人)"}  fill="#8884d8" />
                        <Bar dataKey="manShejieAdd" name="社戒(人)" fill="#82ca9d" />
                        <Bar dataKey="manShekanAdd" name="社康(人)"  fill="#77ca9d" />
                        <Bar dataKey="manOtherAdd" name="其他(人)"  fill="#16ca9d" />
                        <Bar dataKey="visit" name="走访"  fill="#25ca9d" />
                        <Bar dataKey="niaojian" name="尿检"  fill="#34ca9d" />
                        <Bar dataKey="dayoff" name="请假"  fill="#43ca9d" />
                        <Bar dataKey="help" name="求助"  fill="#52ca9d" />
                        <Bar dataKey="checkin" name="签到"  fill="#61ca9d" />

                      </BarChart>
               }
                </Col>
            </Row>    
          <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
          </PageDlog>
         
        </Panel >)
    }
}

export default Form.createForm()(AreaPage);