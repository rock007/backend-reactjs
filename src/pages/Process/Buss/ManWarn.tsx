import * as React from 'react';
import moment from "moment";

import {Panel,Breadcrumb,Form,FormControl,Label,LoadingState,Icon,Button,Radio} from 'tinper-bee';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';

import DatePicker from "bee-datepicker";
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import BussService from '../../../services/BussService';
import { getValidateFieldsTrim, Info, Warning } from '../../../utils';
import ManService from '../../../services/ManService';

/**
 * 发送通知函！！
 */
const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:any
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManWarn extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        isLoading:false,
        record:{},
        selectedValue:''
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/process-warn/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!==''){
            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findProcessById(id);

        if(result!=null){

            this.setState({record:result,isLoading:false});
        }

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

                values.registSetDate = values.registSetDate!=null?values.registSetDate.format('YYYY-MM-DD'):"";

                values.niaojianDate = values.niaojianDate!=null?values.niaojianDate.format('YYYY-MM-DD'):"";
                
                values.examineDate = values.examineDate!=null?values.examineDate.format('YYYY-MM-DD'):"";

                values.lostDate = values.lostDate!=null?values.lostDate.format('YYYY-MM-DD'):"";

                if(values.manId!=null){

                    var obj=JSON.parse(values.manId);
                    values.manId=obj.refpk;
                    values.manName=obj.refname;
                }

                values['processId']=this.id;
                this.setState({isLoading:true});

                BussService.submitWarn(values).then(()=>{

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
        let {getFieldProps, getFieldError} = this.props.form;

        const me=this;
       
        return ( <div>
             {
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   发通知函
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>戒毒人员</Label>
                        <RefManTreeTableSelect disabled={!(this.state.record==null||this.state.record.manId==null)}  {
                            ...getFieldProps('manId', {
                                validateTrigger: 'onBlur',
                                initialValue: JSON.stringify({refpk:this.state.record.manId,refname:this.state.record.realName}),
                                rules: [{ required: true ,
                                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/,
                                    message: <span><Icon type="uf-exc-t"></Icon><span>请选择戒毒人员</span></span>}]
                            })
                    } />
                        <span className='error'>
                            {getFieldError('manId')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>类别</Label>
                        <Radio.RadioGroup
                            {
                            ...getFieldProps('warnType', {
                                initialValue: '',
                                onChange(value) {
                                    me.setState({ selectedValue: value });
                                },
                                rules: [{ required: true }]
                            }
                            ) }
                        >
                            <Radio value="1" >社区未报到</Radio>
                            <Radio value="2" >尿检阳性</Radio>
                            <Radio value="3" >拒绝检查</Radio>
                            <Radio value="4" >失联</Radio>
                            <Radio value="5" >其它</Radio>
                        </Radio.RadioGroup>
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    {this.state.selectedValue==='1'?(
                        <FormItem>
                        <Label>应报到时间</Label>
                        <DatePicker  format={format} 
                                    {...getFieldProps('registSetDate', {
                                        initialValue:  moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择应报到时间'}],
                                    })}
                        />
                        <span className='error'>
                            {getFieldError('registSetDate')}
                        </span>
                    </FormItem>
                    ):null}
                    {this.state.selectedValue==='2'?(
                    <FormItem>
                        <Label>尿检时间</Label>
                        <DatePicker  format={format} 
                                    {...getFieldProps('niaojianDate', {
                                        initialValue:  moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择尿检时间'}],
                                    })}
                        />
                        <span className='error'>
                            {getFieldError('niaojianDate')}
                        </span>
                    </FormItem>
                    ):null}
                    {this.state.selectedValue==='3'?(
                        <FormItem>
                        <Label>拒绝检查时间</Label>
                        <DatePicker  format={format} 
                                    {...getFieldProps('examineDate', {
                                        initialValue:  moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择检查时间'}],
                                    })}
                        />
                        <span className='error'>
                            {getFieldError('examineDate')}
                        </span>
                    </FormItem>
                    ):null}
                    {this.state.selectedValue==='4'?(
                        <React.Fragment>
                        <FormItem>
                        <Label>失联时间</Label>
                        <DatePicker  format={format} 
                                    {...getFieldProps('lostDate', {
                                        initialValue:  moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择失联时间'}],
                                    })}
                        />
                        <span className='error'>
                            {getFieldError('lostDate')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>失联天数</Label>
                        <FormControl style={{width:'150px'}}  placeholder="请输入失联天数"
                            {...getFieldProps('lostDays', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入失联天数</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>失联天数,只能输入数字</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('lostDays')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>失联次数</Label>
                        <FormControl  style={{width:'150px'}}  placeholder="请输入失联次数"
                            {...getFieldProps('lostTimes', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入失联次数</span></span>,
                                }, {
                                    pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>失联次数输入错误,只能输入数字</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('lostTimes')}
                        </span>
                    </FormItem>
                    </React.Fragment>
                    ):null}
                    {this.state.selectedValue==='5'?(
                        <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>其它</Label></div>
                        <textarea placeholder="请输入其它通知函内容" rows={3} cols={3} style={{minWidth:'300px'}}
                            {...getFieldProps('other', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入其它通知函内容</span></span>,
                                }],
                            }) }
                        ></textarea>
                        <span className='error'>
                            {getFieldError('other')}
                        </span>
                    </FormItem>
                    ):null}
                    
                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入说明描述"
                            {...getFieldProps('remarks', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: false, message: <span><Icon type="uf-exc-t"></Icon><span>请输入说明</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('remarks')}
                        </span>
                    </FormItem>
                    
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>

                    </FormItem>
                </Form>
        </div >)
    }
}

export default Form.createForm()(ManWarn)