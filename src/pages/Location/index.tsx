import * as React from 'react';
import {Panel, Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Grid from '../../components/Grid';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import ManService from '../../services/ManService';
import {PageModel, PopPageModel} from '../../services/Model/Models';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../components/PageDlg';
import DatePicker from "bee-datepicker";

import { getValidateFieldsTrim } from '../../utils/tools';
import { Info } from '../../utils';

const FormItem = FormListItem;
const {Option} = Select;

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
}

 class LocationPage extends React.Component<IPageProps,IPageState> {

    pageIndex=1
    pageSize=10
    orderBy=[]

    state:IPageState={
        page:new PageModel<any>(),
        isLoading:false,
        checkedRows:[],
        pageModel:new PopPageModel(),
        isPopPage:false,
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
      let page = await ManService.searchProces(args,this.pageIndex,this.pageSize) as PageModel<any>;
      
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

  render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const me=this;
        const columns = [
        { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 },
        { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
        { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
            sorter: (pre, after) => {return pre.c - after.c},
        },
        { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
            sorter: (pre, after) => {return pre.c - after.c}
        },
        { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },

        { title: '备注', dataIndex: 'remarks', key: 'remarks',textAlign:'center', width: 200 },
        { title: '上报时间 ', dataIndex: 'locationUpdateDate', key: 'locationUpdateDate',textAlign:'center', width: 150 ,sorter: (pre, after) => {return pre.c - after.c},},
        { title: '上报地点', dataIndex: 'location', key: 'location',textAlign:'center', width: 100 },
        { title: '来源', dataIndex: 'locationFrom', key: 'locationFrom',textAlign:'center', width: 100 },

        { title: '类别', dataIndex: 'cateTypeText', key: 'cateTypeText',textAlign:'center', width: 100 ,sorter: (pre, after) => {return pre.c - after.c},},
        { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
        sorter: (pre, after) => {return pre.c - after.c},
        }
          ];
      
          const toolBtns = [{
            value:'查看轨迹',
            attr:'act_location_map',
            bordered:false,
            colors:'primary',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:() => {

                if(this.state.checkedRows.length>1){

                    Info('查看轨迹只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/location-man/'+this.state.checkedRows[0].manId,"查看人员轨迹",false);

                }else{
                    Info('请选择要查看轨迹的记录');
                }

            }
        }];

        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      社戒管控
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      位置轨迹
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
                        label="姓名">
                        <FormControl placeholder='戒毒人员姓名' {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号">
                        <FormControl placeholder='请输入身份证号' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict  type={31} {...getFieldProps('level', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="位置上传时间">
                        <DatePicker.RangePicker                             
                            {...getFieldProps('locationUpdateDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            showClose={true}
                        />
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

        </Panel >)
    }
}

export default Form.createForm()(LocationPage);