import * as React from 'react';
import {Panel,  FormControl, Form, Icon,LoadingState, Button ,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim,Warning,Info} from "../../../utils";

import FormError from '../../../components/FormError';

import ManService from '../../../services/ManService';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:()=>void
}
interface IPageState {
    isLoading:boolean,
    record:any,
}

class ForHelpEdit extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
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
            const m1=new RegExp('/forhelp-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.find4HelpById(id);

        this.setState({record:result,isLoading:false});
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }

    handler_submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                //values.testDate = values.testDate!=null?values.testDate.format('YYYY-MM-DD'):"";

                this.setState({isLoading:true});

                ManService.submit4HelpResp(values).then(()=>{

                    Info('操作成功');
                    this.goBack()
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
        
        const _this = this;
        let {getFieldProps, getFieldError} = this.props.form;

        return (<Panel >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.realName}</strong>
                </FormItem>
                <FormItem>
                    <Label>类型</Label>
                    <strong>{this.state.record.helpType}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>时间</Label>
                    <strong>{this.state.record.createDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>内容</Label>
                    <p>{this.state.record.content}</p>
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
                    <LoadingState  colors="primary" show={ this.state.isLoading } onClick={this.handler_submit}>保存</LoadingState>
                </div>
        </Panel>)
    }
}

export default Form.createForm()(ForHelpEdit);