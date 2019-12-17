import * as React from 'react';
import {Label,Radio,Panel,LoadingState,Button,Breadcrumb,Select, Form, FormControl} from 'tinper-bee';

import {getValidateFieldsTrim, Info, Warning} from "../../../utils";
import FormError from '../../../components/FormError';
import SelectDict from '../../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';
import ManCateSelect from '../../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import { convertLevelText, convertBussModifyTypeText } from '../../../utils/tools';

const FormItem = Form.FormItem;;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:any
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

/**
 * 查看，审核（社区，人员分类，风险等级，网格）
 */
class AuditManBussModifyView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/audit/buss-modify/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!==''){
            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findBussUpdateById(id);

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

                ManService.submitBussAudit(values).then(()=>{

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
                  社戒变更
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                  审核 
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
          <Form className='edit_form_pop'>
                <FormItem>
                    <Label>业务操作</Label>
                    <strong>{convertBussModifyTypeText (this.state.record.modifyType)}</strong>
                </FormItem>
                <FormItem>
                        <Label>旧值</Label>
                        <strong>{this.state.record.oldText}</strong>
                </FormItem>
                <FormItem>
                        <Label>新值</Label>
                        <strong>{this.state.record.newText}</strong>
                </FormItem>
                <FormItem>
                        <Label>原因</Label>
                        <strong>{this.state.record.reason}</strong>
                </FormItem>
                <FormItem>
                        <Label>备注</Label>
                        <strong>{this.state.record.remark}</strong>
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
                                 {...getFieldProps('resp', {
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
                    <FormError errorMsg={getFieldError('resp')}/>
                </FormItem>
               <FormItem style={{'paddingLeft':'106px'}}>
                    <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>
                </FormItem>
            </Form> 
                </Panel>);
    }
}

export default Form.createForm()(AuditManBussModifyView);