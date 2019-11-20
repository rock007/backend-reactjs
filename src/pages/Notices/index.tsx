import * as React from 'react';
import {Panel, PageLayout,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import Grid from '../../components/Grid';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {PageModel} from '../../services/Model/Models';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';

import DatePicker from "bee-datepicker";

const FormItem = FormListItem;
const {Option} = Select;
const format = "YYYY";


interface IPageProps {
    form:any
}
interface IPageState {
    page:PageModel<any>,
  
}

 class NoticePage extends React.Component<IPageProps,IPageState> {
     state:IPageState={
        page:new PageModel<any>()
     }
    componentDidMount() {

    }

    getSelectedDataFunc = data => {
        console.log("data", data);
      };
    
      selectedRow = (record, index) => {};
      /**
       * 请求页面数据
       */
      freshata=()=>{
    
      }
     
      onDataNumSelect=()=>{
        console.log('选择每页多少条的回调函数');
      }
    export = ()=>{
        console.log('export=======');
    }
    /**
     *批量修改操作
     */
    dispatchUpdate = ()=>{
      console.log('--dispatch---update')
    }
    /**
     *批量删除
     */
    dispatchDel = ()=>{
      console.log('--dispatch---del')
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
            { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
            { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

          const toolBtns = [{
            value:'导出',
            iconType:'uf-export',
            onClick:this.export
        }];

        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
          }
        return ( <Panel>

            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
			    <Breadcrumb.Item>
			      业务查询
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      告诫书
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={()=>{}}
                onCallback={()=>{}}
                search={()=>{}}
                searchOpen={true}
            >
                <FormList size="sm">
                <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='请输入戒毒人员姓名' />
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' />
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' />
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select >
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict onChange={()=>{}} type={31}/>
                    </FormItem>
                    <FormItem
                        label="社区"
                    >

                        <RefOrgTreeSelect/>
                    </FormItem>
                    <FormItem
                        label="网格"
                    >
                        <RefGridTreeTableSelect/>
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
                </FormList>
                </SearchPanel>

        <Grid
          toolBtns={toolBtns}
          columns={columns}
          page={this.state.page}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
        </Panel >)
    }
}

export default Form.createForm()(NoticePage);