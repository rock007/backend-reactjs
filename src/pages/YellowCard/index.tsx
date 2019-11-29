import * as React from 'react';
import {Panel,Select, FormControl,Label,Form,Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import Grid from '../../components/Grid';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {PageModel,IPageCommProps,IListPageCommState,PopPageModel} from '../../services/Model/Models';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';

import PageDlog from '../../components/PageDlg';
import { getValidateFieldsTrim } from '../../utils/tools';

import BussService from '../../services/BussService';

import DatePicker from "bee-datepicker";
const FormItem = FormListItem;

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IListPageCommState;

 class YellowCardPage extends React.Component<IPageProps,IPageState> {

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
        let page = await BussService.searchCard(args,this.pageIndex,this.pageSize) as PageModel<any>;
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

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const me=this;

        const columns = [
            { title: '发送时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150,sorter: (pre, after) => {return pre.c - after.c} },
            
            { title: '接收者', dataIndex: 'toUser', key: 'toUser',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label className='link-go' onClick={()=>{me.go2Page('/yellowcard/'+record.id,'红黄牌详细',false)}}>{text}</Label>;
              }
            },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
            { title: '角色', dataIndex: 'toRole', key: 'toRole',textAlign:'center', width: 100 },       
            
            { title: '原因', dataIndex: 'content', key: 'content',textAlign:'center', width: 200 },
            
            { title: '戒毒人员', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 120 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
                sorter: (pre, after) => {return pre.c - after.c},
            },
          ];
          
          const toolBtns = [{
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
			      业务查询
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      红黄牌
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
                        label="接收者"
                    >
                        <FormControl  placeholder='接收者姓名' {...getFieldProps('toUser', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('phone', {initialValue: ''})} />
                    </FormItem>
                   
                    <FormItem
                        label="性别"
                    >
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Select>
                    </FormItem>
                
                    <FormItem
                        label="社区"
                    >
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="发送时间"
                    >
                        <DatePicker.RangePicker {...getFieldProps('createDate', {initialValue: ''})}
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

export default Form.createForm()(YellowCardPage);