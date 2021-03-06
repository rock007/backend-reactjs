import * as React from 'react';
import {Panel,  FormControl, Form, Icon,Loading, Button ,LoadingState, Col,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim, Warning,Info} from "../../../utils";

import FormError from '../../../components/FormError';
import UploadFile from '../../../components/UploadFile';
import DatePicker from "bee-datepicker";

import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';
import ManService from '../../../services/ManService';

import './index.scss';
import { convertFiles } from '../../../utils/tools';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:(flag:number)=>void
}
interface IPageState {
   
    isLoading:boolean,
    record:any,

    file1Ids:Array<any>,
    file2Ids:Array<any>,
    file3Ids:Array<any>,
}

class NiaojianEdit extends React.Component<IPageProps,IPageState> {
    
    id:string='';
    state:IPageState={
        isLoading:false,
        record:{},
        file1Ids:[],
        file2Ids:[],
        file3Ids:[]
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }
  
    componentDidMount() {

        if(this.isPage()){
            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/niaojian-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }else{
            this.forceUpdate();
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findNiaojianById(id);

        this.setState({record:result,isLoading:false});
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

                values.testDate = values.testDate!=null?values.testDate.format('YYYY-MM-DD'):"";

                //戒毒人员
                if(values.toUid&&values.toUid!=''){

                    let oo=JSON.parse(values.toUid);
                    values.toUid=oo.refpk;
                    values.toUser=oo.refname;
                }

                values['file1Ids']=this.state.file1Ids;//.join(',');
                values['file2Ids']=this.state.file2Ids;
                values['file3Ids']=this.state.file3Ids;

                values['id']=this.id==='0'?'':this.id;
                this.setState({isLoading:true});

                ManService.submitNiaojian(values).then(()=>{

                    this.goBack(1);
                })
                .catch((err)=>{
                    Error('保存操作失败');
                }).finally(()=>{
                    this.setState({isLoading:false});
                });

            }else{
                Warning('输入验证不通过，请检查');
            }
        } );
    }

    handler_uploadChange=(files:Array<any>,where:string)=>{

        const m1=files.map((m,i)=>m.uid);
        const o1={};
        o1[where]=m1;

        this.setState(o1);
    }

    render() {
        
        const _this = this;
        let {getFieldProps, getFieldError} = this.props.form;

        if(this.id!=='0'&&this.state.record.id==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }
        return (<Panel >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <RefManTreeTableSelect disabled={!(this.state.record==null||this.state.record.id==null)}  {
                            ...getFieldProps('toUid', {
                                validateTrigger: 'onBlur',
                                initialValue: JSON.stringify({refpk:this.state.record.toUid,refname:this.state.record.toUser}),
                                rules: [{ required: true ,
                                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/,
                                    message: <span><Icon type="uf-exc-t"></Icon><span>请选择戒毒人员</span></span>}]
                            })
                    }/>
                    
                    <FormError errorMsg={getFieldError('toUid')}/>
                    
                </FormItem>
                <FormItem>
                    <Label>尿检类型</Label>
                    <Radio.RadioGroup
                            {
                            ...getFieldProps('testType', {
                                initialValue: this.state.record.testType+'',
                                rules: [{ required: true ,message: '请选择尿检类型',}]
                            })}>
                        <Radio value="0" >常规</Radio>
                        <Radio value="1" >随机</Radio>
                    </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('testType')}/>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检时间</Label>
                    <DatePicker
                            {
                            ...getFieldProps('testDate', {
                                initialValue: this.state.record.testDate,
                                rules: [{ required: true ,message: '请选择尿检时间',}]
                            })}
                            format={'YYYY-MM-DD'}
                        />
                    <FormError errorMsg={getFieldError('testDate')}/>
                </FormItem>

                <FormItem>
                    <Label>尿检结果</Label>
                    <Radio.RadioGroup {...getFieldProps('result', {
                                initialValue: this.state.record.result,
                                rules: [{
                                    required: true, message: '请选择尿检结果',
                                }],
                            })}>
                            <Radio value="阴性">阴性</Radio>
                            <Radio value="阳性">阳性</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('result')}/>
                </FormItem>
                <FormItem>
                    <Label>是否本地</Label>
                    <Radio.RadioGroup {...getFieldProps('isLocal', {
                                initialValue: this.state.record.isLocal+"",
                                rules: [{
                                    required: true, message: '请选择是否本地',
                                }],
                            })}>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('isLocal')}/>
                </FormItem>
                <FormItem>
                    <Label>尿检地点</Label>
                    <FormControl 
                                 {...getFieldProps('address', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.address,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入尿检地点',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('address')}/>
                </FormItem>
                <FormItem>
                    <Label>说明</Label>
                    <FormControl 
                                 {...getFieldProps('remarks', {
                                     validateTrigger: 'onBlur',
                                     initialValue:  this.state.record.remarks,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入说明',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('remarks')}/>
                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>尿检人</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                        <UploadFile  maxSize={3}  defaultFileList={ convertFiles(this.state.record.files1)}  uploadChange={this.handler_uploadChange} from='file1Ids'/>
                    </div>
                </FormItem>
                
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检报告</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                        <UploadFile  maxSize={3}  defaultFileList={ convertFiles(this.state.record.files2)}  uploadChange={this.handler_uploadChange}  from='file2Ids'/>
                    </div>

                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>谈话记录</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                        <UploadFile maxSize={3}  defaultFileList={ convertFiles(this.state.record.files3)}  uploadChange={this.handler_uploadChange}  from='file3Ids'/>
                    </div>

                </FormItem>
             
                </Form>
                <div style={{'textAlign':'center'}}>
                    <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading } onClick={this.handler_submit}>保存</LoadingState>
                </div>
        </Panel>)
    }
}

export default Form.createForm()(NiaojianEdit);