import * as React from 'react';

import {Panel, Tag,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';
import Alert from '../../../components/Alert';

import {FormList ,FormListItem}from '../../../components/FormList';
import SearchPanel from '../../../components/SearchPanel';
import Grid from '../../../components/Grid';

import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../../services/Model/Models';

import PageDlog from '../../../components/PageDlg';
import { getValidateFieldsTrim, Info } from '../../../utils';
import SysService from '../../../services/SysService';

import DatePicker from "bee-datepicker";
import { convertBussTypeText } from '../../../utils/tools';

const FormItem = FormListItem;
interface IOtherProps {
    
} 

interface IOtherState {
  
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageState;

export  class MsgPage extends React.Component<IPageProps,IPageState> {

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
            
            if(values.createDate){
                values.createDate=values.createDate[0].format('YYYY-MM-DD')+'~'+values.createDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        args['orderby']=this.orderBy;
        let page = await SysService.searchMessage(args,this.pageIndex,this.pageSize) as PageModel<any>;
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
     
    export = ()=>{
        console.log('export=======');
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

    handler_delete=async()=>{
  
        this.setState({isLoading:true,isDeleteAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));

        let idstr=arr.join(',');

        await SysService.deleteMessage(idstr)
          .then((resp)=>{
  
            //Info(resp);
            this.search();
  
          }).catch((err)=>{
  
            Error(err.msg||'删除操作失败！');
           
          }).finally(()=>{this.setState({isLoading:false})});
        
    }

    handler_read=async()=>{
  
        this.setState({isLoading:true,isDeleteAlterShow:false});
        let arr=[];
        this.state.checkedRows.map((v,i)=>arr.push(v.id));

        let idstr=arr.join(',');

        await SysService.readMessage(idstr)
          .then((resp)=>{
  
            //Info(resp);
            this.search();
  
          }).catch((err)=>{
  
            Error(err.msg||'已读操作失败！');
           
          }).finally(()=>{this.setState({isLoading:false})});
        
    }

    render() {

        const { getFieldProps, getFieldError } = this.props.form;
        const me=this;
        const columns = [
            { title: '类型', dataIndex: 'msgType', key: 'msgType',textAlign:'center', width: 120,
            render: (text, record, index) => {
                return convertBussTypeText(text);
            }},
            { title: '状态', dataIndex: 'status', key: 'status',textAlign:'center', width: 120 ,
            render: (text, record, index) => {
                return text==1?(<Tag colors={"success"}>已读</Tag>):(
                  <Tag colors={"info"}>未读</Tag>
                );
            }},
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 300 },
            { title: '发送者', dataIndex: 'sendFrom', key: 'sendFrom',textAlign:'center', width: 120 },
            { title: '发送时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 , sorter: (pre, after) => {return pre.c - after.c}},
           
          ];
         

          const toolBtns = [{
            value:'已读',
            bordered:false,
            colors:'primary',
            onClick:()=>{
  
                if(this.state.checkedRows.length==0){

                    Info('请选择要已读的记录');
                    return;
                }
                this.handler_read();
            }
        },{
            value:'删除',
            bordered:true,
            onClick:()=>{
  
                this.setState({isDeleteAlterShow:true});
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
			    <Breadcrumb.Item active>
			      我的消息
			    </Breadcrumb.Item>
			</Breadcrumb>

            <SearchPanel
                reset={this.clear}
                onCallback={()=>{}}
                search={this.search}
                searchOpen={true} >
                <FormList size="sm">

                    <FormItem
                        label="类别">
                        <Select  {...getFieldProps('msgType', {initialValue: ''})}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">{convertBussTypeText(1)}</Select.Option>
                            <Select.Option value="2">{convertBussTypeText(2)}</Select.Option>
                            <Select.Option value="3">{convertBussTypeText(3)}</Select.Option>
                            <Select.Option value="4">{convertBussTypeText(4)}</Select.Option>
                            <Select.Option value="5">{convertBussTypeText(5)}</Select.Option>
                            <Select.Option value="6">{convertBussTypeText(6)}</Select.Option>
                            <Select.Option value="7">{convertBussTypeText(7)}</Select.Option>
                            <Select.Option value="8">{convertBussTypeText(8)}</Select.Option>
                            <Select.Option value="9">{convertBussTypeText(9)}</Select.Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="状态"  >
                        <Radio.RadioGroup {...getFieldProps('status', {initialValue: ''})}>
                            <Radio value="">全部</Radio>
                            <Radio value="0">未读</Radio>
                            <Radio value="1">已读</Radio>
                        </Radio.RadioGroup>
                    </FormItem>
                 
                    <FormItem
                        label="发送时间">
                        <DatePicker.RangePicker  {...getFieldProps('createDate', {initialValue: ''})}
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

export default Form.createForm()(MsgPage);