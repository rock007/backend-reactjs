import * as React from 'react';
import {Label,Panel,LoadingState,Button,Tag,Breadcrumb,Row,Radio,Col,FormControl,Form} from 'tinper-bee';

import {getValidateFieldsTrim, Info, Warning} from "../../../utils";

import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import BussService from '../../../services/BussService';
import SysService from '../../../services/SysService';

import { convertWarnTypeText } from '../../../utils/tools';

import AppConsts from '../../../lib/appconst';
const FormItem = Form.FormItem;;

interface IOtherProps {
    
} 

interface IOtherState {
    flowTasks:Array<any>
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

/**
 * 查看
 */
class NoticeWarnView extends React.Component<IPageProps,IPageState> {
    
    id:string=''

    content:string=''

    state:IPageState={
        isLoading:false,
        record:{},
        flowTasks:[]
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/audit/warn-view/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!==''){
            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await BussService.findWarnById(id);

        if(result!=null){

            const  flowTasks=await SysService.getFlowInfoBy(result.wfProcId);

            this.setState({record:result,flowTasks:flowTasks,isLoading:false});
        }

    }
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }

    handler_submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                this.setState({isLoading:true});

                let taskId=this.state.flowTasks[0].id;
                values['title']=this.state.flowTasks[0].name;
                values['content']=this.content;
    
                values['wfProcId']=this.state.record.wfProcId;
                
                values['bussType']='4';
                values['refId']=this.id;

                SysService.actWorkflow(taskId,values)
                .then(()=>{

                    //Info('操作成功');
                    this.goBack(1)
                })
                .catch((err)=>{
                    Error('操作失败');
                }).finally(()=>{
                    this.setState({isLoading:false});
                });

            }else{
                Warning('输入验证不通过，请检查');
            }
        } );
    }

    renderAction=()=>{

        const { getFieldProps, getFieldError } = this.props.form;
        const curTask=this.state.flowTasks!=null&&this.state.flowTasks.length>0?this.state.flowTasks[0]:null;
    
        const isAssignee=curTask==null?false: curTask.assignee===AppConsts.session.userId;
    
        if(isAssignee){
    
            let taskDefinitionKey=curTask.taskDefinitionKey;
    
            if(taskDefinitionKey==='usertask_accept'){
                //民警接收
                this.content="民警接收通知函";
                return (
                    <FormItem style={{'paddingLeft':'106px'}}>
                            <Button colors="primary"  onClick={this.handler_submit}>接收通知函</Button>
                    </FormItem>
                )
    
            }else if(taskDefinitionKey==='usertask_doback'){
                //强戒
                this.content="戒毒人员被执行强戒";
                return (
                    <React.Fragment>
                            <FormItem>
                                <Label>说明</Label>
                                <FormControl placeholder="请输入审批说明" 
                                    {
                                    ...getFieldProps('remarks', {
                                        initialValue: ''
                                    }) 
                                }/>
                            </FormItem>
                            <FormItem style={{'paddingLeft':'106px'}}>
                               
                                <Button colors="primary"  onClick={this.handler_submit}>已执行强戒</Button>
                            </FormItem>
                    </React.Fragment>
                );
            }else if(taskDefinitionKey==='usertask_resp'){
                //回复
                this.content="通知函操作回复";
                return (
                    <React.Fragment>
                            <FormItem>
                                <Label>说明</Label>
                                <FormControl placeholder="请输入审批说明" 
                                    {
                                    ...getFieldProps('remarks', {
                                        initialValue: ''
                                    }) 
                                }/>
                            </FormItem>
                            <FormItem style={{'paddingLeft':'106px'}}>
                               
                                <Button colors="primary"  onClick={this.handler_submit}>提交</Button>
                            </FormItem>
                        
                    </React.Fragment>
                )
            }else if(taskDefinitionKey==='usertask_send'){
                //社工发送
    
            }else if(taskDefinitionKey==='usertask_action'){
                //民警操作
                this.content="民警对通知函选择操作类型";
               return (<React.Fragment>
                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入审批说明" 
                            {
                            ...getFieldProps('remarks', {
                                initialValue: ''
                            }) 
                        }/>
                    </FormItem>
                    <FormItem>
                    <Label>状态</Label>
                    <Radio.RadioGroup
                        {
                        ...getFieldProps('act', {
                            rules: [{ required: true }]
                        }) }>
                        <Radio value="0">回复</Radio>
                        <Radio value="1">强戒</Radio>
                    </Radio.RadioGroup>
                    <span className='error'>
                        {getFieldError('act')}
                    </span>
                    </FormItem>
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button colors="primary"  onClick={this.handler_submit}>提交</Button>
                    </FormItem>
                </React.Fragment>);
    
            }else{
    
                //未定义 
            }
        }
    
        return null;
    }
    
    render() {

    return (
        <Panel>
        {
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  业务审核
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  通知函
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                  查看
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
			</Breadcrumb>
			:null}

            <Row>
                <Col md="12">
                <Form className='edit_form_pop'>
                <FormItem>
                        <Label>姓名</Label>
                        <strong>{this.state.record.manName}</strong>
                </FormItem>
                <FormItem>
                        <Label>性别</Label>
                        <strong>{this.state.record.sex}</strong>
                </FormItem>
                <FormItem>
                        <Label>类型</Label>
                        <strong>{convertWarnTypeText(this.state.record.warnType)}</strong>
                </FormItem>
                <FormItem>
                        <Label>内容</Label>
                        <strong>{this.state.record.content}</strong>
                </FormItem>
                <FormItem>
                        <Label>状态</Label>
                        <strong>{ this.state.record.status==0?<Tag colors="danger">未接收</Tag>: this.state.record.status==1?<Tag colors="info">进行中</Tag>: this.state.record.status==2?<Tag colors="success">已完成</Tag>:<Tag colors="warning">未知</Tag>}</strong>
                </FormItem>
                <FormItem>
                        <Label>社区</Label>
                        <strong>{this.state.record.orgName}</strong>
                </FormItem>
                {this.renderAction()}
            </Form> 
          
            </Col>
        </Row>
    </Panel>);
    }
}

export default Form.createForm()(NoticeWarnView);