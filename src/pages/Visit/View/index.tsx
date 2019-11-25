import * as React from 'react';
import {Panel,  FormControl, Form, Icon,Button, Upload ,LoadingState, Col,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim, Warning,Info} from "../../../utils";

import FormError from '../../../components/FormError';
import SelectDict from '../../../components/SelectDict';
import DatePicker from "bee-datepicker";

import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';
import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';

import './index.scss';
import ManService from '../../../services/ManService';

const FormItem = Form.FormItem;;

const format = "YYYY-MM-DD";

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
    btnFlag:number,
    rowData:any,
    activeKey:string,
    testType:number,
    isLoading:boolean,
    fileIds:Array<String>,
    record:any
}

class VisitView extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        btnFlag:0,
        rowData:{},
        activeKey:'1',
        testType:0,
        isLoading:false,
        fileIds:[],
        record:{}
    }
    
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    constructor(args) {
        super(args);
    }
  
    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/visit-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findVisitById(id);

        if(result!=null)
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

            debugger;
            if (!err) {

                values.visitorDate = values.visitorDate!=null?values.visitorDate.format(format):"";

                //戒毒人员

                if(values.toUid&&values.toUid!=''){

                    let oo=JSON.parse(values.toUid);
                    values.toUid=oo.refpk;
                    values.toUser=oo.refname;
                }

                //走访人（两个）
                if(values.visitorName&&values.visitorName!=''){
                    let oo=JSON.parse(values.visitorName);
                    values.visitorUid=oo.refpk.replace(/;/g,',');
                    values.visitorName=oo.refname.replace(/;/g,',');
                }
                values['fileIds']=this.state.fileIds.join(',');

                this.setState({isLoading:true});

                ManService.submitVisit(values).then(()=>{

                    Info('保存操作成功');
                    this.goBack()
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

    render() {
        
        let {getFieldProps, getFieldError} = this.props.form;
   
        const demo4props = {
            action: '/upload.do',
            listType: 'picture-card',
            defaultFileList: [ {
              uid: -2,
              name: 'zzz.png',
              status: 'done',
              url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
              thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
            },{
                uid: 2,
                name: 'zzz.png',
                status: 'done',
                url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
                thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
              }],
          };

        return (<Panel>
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <RefManTreeTableSelect  {
                            ...getFieldProps('toUid', {
                                validateTrigger: 'onBlur',
                                initialValue: '',
                                rules: [{ required: true ,message: <span><Icon type="uf-exc-t"></Icon><span>请选择戒毒人员</span></span>}]
                            })
                    }/>
                    <span className='error'>
                            {getFieldError('toUid')}
                    </span>
                </FormItem>
                <FormItem>
                    <Label>被访人</Label>
                    <FormControl 
                                 {...getFieldProps('toVisitor', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.toVisitor,
                                     rules: [{
                                         required: true,
                                         message: '请输入被访人',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('toVisitor')}/>
                </FormItem>
                <FormItem>
                    <Label>和戒毒人员关系</Label>
                    <SelectDict  type={10}  {...getFieldProps('toVisitorRelationship', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.toVisitorRelationship,
                                     rules: [{
                                         required: true,
                                         message: '请输入和戒毒人员关系',
                                     }],
                    })}/>
                    <FormError errorMsg={getFieldError('toVisitorRelationship')}/>
                </FormItem>
                <FormItem>
                    <Label>联系方式</Label>
                    <FormControl 
                                 {...getFieldProps('toVisitorPhone', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.toVisitorPhone,
                                     rules: [{
                                         required: true,
                                         message: '请输入联系方式',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('toVisitorPhone')}/>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>走访时间</Label>
                    <DatePicker
                            {...getFieldProps('visitorDate', {
                               
                                initialValue: this.state.record.visitorDate,
                                rules: [{
                                    required: true,
                                    message: '请输入走访时间',
                                }],
                            })}
                            format={'YYYY-MM-DD'}
                        />
                    <FormError errorMsg={getFieldError('visitorDate')}/>
                </FormItem>

                <FormItem>
                    <Label>走访地点</Label>
                    <FormControl 
                                 {...getFieldProps('address', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.address,
                                     rules: [{
                                         required: true,
                                         message: '请输入走访地点',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('address')}/>
                </FormItem>
                <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>1：社区戒毒人员及家庭状况</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('key1', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.key1,
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入社区戒毒人员及家庭状况</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('key1')}
                        </span>
                </FormItem>
                <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>2:社区戒毒人员工作（生产）状况</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('key2', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.key2,
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入社区戒毒人员工作（生产）状况</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('key2')}
                        </span>
                </FormItem>
                <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>3:对社区戒毒康复工作办公室的意见和建议</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('key3', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.key3,
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入对社区戒毒康复工作办公室的意见和建议</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('key3')}
                        </span>
                </FormItem>
                <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>4:目前您最突出的困难是什么</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('key4', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.key4,
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入目前您最突出的困难是什么</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('key4')}
                        </span>
                </FormItem>
                <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>5:基它问题</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('key5', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.key5,
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入基它问题</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('key5')}
                        </span>
                </FormItem>
                <FormItem>
                    <Label>说明</Label>
                    <FormControl 
                                 {...getFieldProps('content', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.content,
                                     rules: [{
                                         required: true,
                                         message: '请输入说明',
                                     }],
                                 })}
                    />

                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>附件</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <Upload {...demo4props} >
                        <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                        <p>上传</p>
                    </Upload>
                    </div>
                </FormItem>
                <FormItem>
                    <Label>走访结果</Label>
                    <Radio.RadioGroup
                        {...getFieldProps('result', {
                            validateTrigger: 'onBlur',
                            initialValue: this.state.record.result,
                            rules: [{
                                required: true,
                                message: '请选择走访结果',
                            }],
                        })}
                        >
                            <Radio value="已找到" >已找到</Radio>
                            <Radio value="未找到" >未找到</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('result')}/>
                </FormItem>
                <FormItem>
                    <Label>走访人</Label>
                    <RefUserTreeTableSelect  {
                            ...getFieldProps('visitorName', {
                                validateTrigger: 'onBlur',
                                initialValue: {refId:this.state.record.visitorUid,refname:this.state.record.visitorName},
                                rules: [{ required: true }],message: <span><Icon type="uf-exc-t"></Icon><span>请选择走访人员</span></span>
                            }
                    )}/>
                    <span className='error'>
                            {getFieldError('visitorName')}
                     </span>
                </FormItem>
                </Form>
        </Panel>)
    }
}

export default Form.createForm()(VisitView);