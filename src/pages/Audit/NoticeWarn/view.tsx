import * as React from 'react';
import {Label,Panel,LoadingState,Button,Tag,Breadcrumb,Row,Radio,Col,FormControl,Form} from 'tinper-bee';

import {getValidateFieldsTrim, Info, Warning} from "../../../utils";

import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import BussService from '../../../services/BussService';
import { convertWarnTypeText } from '../../../utils/tools';

import FormError from '../../../components/FormError';
const FormItem = Form.FormItem;;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:any
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

/**
 * 查看
 */
class NoticeWarnView extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        selectedValue:'',
        isLoading:false,
        record:{},
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

            this.setState({record:result,isLoading:false});
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

                values.registDate = values.registDate!=null?values.registDate.format('YYYY-MM-DD'):"";

                values['id']=this.id;
                this.setState({isLoading:true});

                BussService.submitWarn(values).then(()=>{

                    Info('操作成功');
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
    
    render() {
      const me=this;
      let {getFieldProps, getFieldError} = this.props.form;

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
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
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
                <FormItem>
                    <Label>审核</Label>
                    <Radio.RadioGroup {...getFieldProps('status', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择审核结果',
                                }],
                            })}>
                            <Radio value="1">同意</Radio>
                            <Radio value="-1">不同意</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('status')}/>
                </FormItem>
                
                <FormItem>
                    <Label>回复</Label>
                    <FormControl 
                                 {...getFieldProps('respContent', {
                                     validateTrigger: 'onBlur',
                                     initialValue: '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入审批回复',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('respContent')}/>
                </FormItem>
            </Form> 
            <div style={{'textAlign':'center'}}>
                    <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading } >保存</LoadingState>
            </div>
            </Col>
        </Row>
    </Panel>);
    }
}
//onClick={this.handler_submit}
export default Form.createForm()(NoticeWarnView);