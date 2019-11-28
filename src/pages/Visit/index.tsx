import * as React from 'react';
import {Panel,Select,Label,FormControl,Form,Radio, Breadcrumb } from 'tinper-bee';

import Alert from '../../components/Alert';
import Grid from '../../components/Grid';
import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';

import {PageModel, PopPageModel} from '../../services/Model/Models';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';
import PageDlog from '../../components/PageDlg';
import { getValidateFieldsTrim } from '../../utils/tools';

import DatePicker from "bee-datepicker";
import ManService from '../../services/ManService';

import './index.scss';
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

class VisitPage extends React.Component<IPageProps,IPageState> {
    
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
            if(values.visitorDate){
                values.visitorDate=values.visitorDate[0].format('YYYY-MM-DD')+'~'+values.visitorDate[1].format('YYYY-MM-DD');
            }

            this.setState({isLoading:true});
            this.loadData(values);
        });
    }

    loadData=async (args:any)=>{
        args['orderby']=this.orderBy;
        let page = await ManService.searchVisit(args,this.pageIndex,this.pageSize) as PageModel<any>;
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

    handler_delete=async ()=>{

        this.setState({isLoading:true,isDeleteAlterShow:false});

        let ids:string='';
        this.state.checkedRows.map((item,index)=>{
            ids=ids+','+item.id;
        });
       await ManService.deleteVisit(ids).then(()=>{

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
        
        const me=this;
        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label className='link-go' onClick={()=>{me.go2Page('/visit-detail/'+record.id,'走访详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
           
            { title: '被走访人', dataIndex: 'toVisitor', key: 'toVisitor',textAlign:'center', width: 160 },
            { title: '关系', dataIndex: 'toVisitorRelationship', key: 'toVisitorRelationship',textAlign:'center', width: 100 },
            { title: '走访地点', dataIndex: 'address', key: 'address',textAlign:'center', width: 150 },
            { title: '结果', dataIndex: 'result', key: 'result',textAlign:'center', width: 120 ,sorter: (pre, after) => {return pre.c - after.c}},
         
            { title: '走访时间 ', dataIndex: 'visitorDate', key: 'visitorDate',textAlign:'center', width: 150,sorter: (pre, after) => {return pre.c - after.c} },
            { title: '走访人', dataIndex: 'visitorName', key: 'visitorName',textAlign:'center', width: 100 },
            
            { title: '创建时间 ', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 150 },
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180 ,
                sorter: (pre, after) => {return pre.c - after.c}
            },
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
                sorter: (pre, after) => {return pre.c - after.c},
            },
          ];
       
          const toolBtns = [{
            value:'新增',
            bordered:false,
            disabled:this.state.checkedRows.length>1?true:false,
            colors:'primary',
            onClick:()=>{
                this.go2Page('/visit-edit/0',"走访新增",false);
            }
        },{
            value:'修改',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
                if(this.state.checkedRows.length>1){

                    Info('编辑只能选择一条记录');

                }else if(this.state.checkedRows.length==1){

                    this.go2Page('/visit-edit/'+this.state.checkedRows[0].id,"走访修改",false);

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
            iconType:'uf-search',
            onClick:this.export
        },{
            value:'打印',
            iconType:'uf-print',
            disabled:this.state.checkedRows.length>1?true:false,
            onClick:()=>{
                
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
			      走访记录
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
                        label="姓名"
                    >
                        <FormControl placeholder='戒毒人员姓名' {...getFieldProps('realName', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select  {...getFieldProps('sex', {initialValue: ''})}>
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
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
                        label="社区"
                    >
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                        
                    </FormItem>
                    <FormItem
                        label="创建时间"
                    >
                        <DatePicker.RangePicker {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}

                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                        />
                    </FormItem>

                    <FormItem
                        label="走访时间"
                    >
                         <DatePicker.RangePicker {...getFieldProps('visitorDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
                            onPanelChange={(v)=>{console.log('onPanelChange',v)}}
                            showClose={true}
                        />
                    </FormItem>
                    <FormItem
                        label="被访人">
                        <FormControl placeholder='请输入被访人姓名' {...getFieldProps('toVisitor', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="和戒毒人员关系">
                        <SelectDict  type={10} {...getFieldProps('toVisitorRelationship', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="被访人联系方式">
                        <FormControl placeholder='请输入被访人联系方式' {...getFieldProps('toVisitorPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="走访地点">
                        <FormControl placeholder='请输入走访地点' {...getFieldProps('address', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="走访结果">
                        <Radio.RadioGroup {...getFieldProps('result', {initialValue: ''})}>
                            <Radio value="">(请选择)</Radio>
                            <Radio value="已找到">已找到</Radio>
                            <Radio value="未找到">未找到</Radio>
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

export default Form.createForm()(VisitPage);