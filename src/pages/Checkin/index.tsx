import * as React from 'react';
import {Panel, Select, FormControl,Form,Label, Breadcrumb,Tag } from 'tinper-bee';

import Grid from '../../components/Grid';
import Alert from '../../components/Alert';

import {FormList ,FormListItem}from '../../components/FormList';
import SearchPanel from '../../components/SearchPanel';
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";

import ManService from '../../services/ManService';
import {PageModel,PopPageModel} from '../../services/Model/Models';
import PageDlog from '../../components/PageDlg';

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

    isDeleteAlterShow:boolean
}

class CheckinPage extends React.Component<IPageProps,IPageState> {

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

        let page = await ManService.searchCheckin(args,this.pageIndex,this.pageSize) as PageModel<any>;
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
    handler_delete=async ()=>{

        this.setState({isLoading:true,isDeleteAlterShow:false});
    
        let ids:string='';
        this.state.checkedRows.map((item,index)=>{
            ids=ids+','+item.id;
        });
       await ManService.submitCheckinAudit(ids).then(()=>{
    
            Info('操作成功');
            this.search();
        })
        .catch((err)=>{
            Error('操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }
   
    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        const me=this;
        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 ,render(text,record,index) {

                return <Label  className='link-go' onClick={()=>{me.go2Page('/checkin-detail/'+record.id,'签到详细',false)}}>{text}</Label>;
              }
            },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 ,
                sorter: (pre, after) => {return pre.c - after.c},
             },
            { title: '时间', dataIndex: 'inDay', key: 'inDay',textAlign:'center', width: 180,sorter: (pre, after) => {return pre.c - after.c},},
            { title: '位置', dataIndex: 'location', key: 'location',textAlign:'center', width: 180},
            { title: '照片', dataIndex: 'photo', key: 'photo',textAlign:'center', width: 180,render(text,record,index) {
                  
                return (
                    <img id="image" width={60} height={60} src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
                );
            }},
            { title: '是否有效', dataIndex: 'isValid', key: 'isValid',textAlign:'center', width: 120,
            render(text,record,index) {
                  
                return text==0?<Tag colors="warning">无效</Tag>:(text==1?<Tag colors="success">有效</Tag>:<Tag colors="warning">未知状态</Tag>);

            },
            sorter: (pre, after) => {return pre.c - after.c},},
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate', textAlign:'center',width: 120,sorter: (pre, after) => {return pre.c - after.c}},
            { title: '身份证号', dataIndex: 'idsNo', key: 'idsNo',textAlign:'center', width: 180},
            { title: '出生年月', dataIndex: 'birthday', key: 'birthday',textAlign:'center', width: 160 },
            { title: '社区', dataIndex: 'orgName', key: 'orgName',textAlign:'center', width: 200 ,
            sorter: (pre, after) => {return pre.c - after.c},
            }
          ];
      

          const toolBtns = [{
            value:'无效',
            bordered:false,
            colors:'primary',
            onClick:()=>{
                
                if(this.state.checkedRows.length==0){

                    Info('请选择要标记无效的记录');
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
			      社戒管控
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
			      签到
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
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式'  {...getFieldProps('linkPhone', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="身份证号">
                        <FormControl placeholder='请输入身份证号' {...getFieldProps('idsNo', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="性别">
                        <Select {...getFieldProps('sex', {initialValue: ''})}>
                            <Option value="">(请选择)</Option>
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict {...getFieldProps('level', {initialValue: ''})} type={31}/>
                    </FormItem>

                    <FormItem
                        label="社区">
                        <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})}/>
                    </FormItem>
                    <FormItem
                        label="创建时间">
                        <DatePicker.RangePicker  {...getFieldProps('createDate', {initialValue: ''})}
                            placeholder={'开始 ~ 结束'}
                            dateInputPlaceholder={['开始', '结束']}
                            showClear={true}
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
          pageChange={this.onPageChange}
        />
        <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
        </PageDlog>
        <Alert show={this.state.isDeleteAlterShow} context="确定要标记选择的记录为无效签到吗?"
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

export default Form.createForm()(CheckinPage);