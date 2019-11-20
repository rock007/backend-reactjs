import * as React from 'react';
import moment from "moment";

import {Panel,Form,FormControl,Label,Upload,InputNumber,Icon,Button,Radio} from 'tinper-bee';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';

import DatePicker from "bee-datepicker";
/**
 * 发送通知函！！
 */

const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface ISceneProps {
    form:any
}
interface ISceneState {
    selectedValue:string
}

class ManWarn extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
        selectedValue:''
    }

    componentDidMount() {

    }

    submit=()=>{

    }

    render() {
        let {getFieldProps, getFieldError} = this.props.form;

        const me=this;
        const demo4props = {
            action: '/upload.do',
            listType: 'picture-card',
            defaultFileList: [ {
              uid: -2,
              name: 'zzz.png',
              status: 'done',
              url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
              thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
            }],
          };

        return ( <div>
                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>戒毒人员</Label>
                        <RefManTreeTableSelect />
                        <span className='error'>
                            {getFieldError('username')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>类别</Label>
                        <Radio.RadioGroup
                            {
                            ...getFieldProps('testType', {
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
                                    {...getFieldProps('birthday', {
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
                        <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary" className="login" onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>
        </div >)
    }
}

export default Form.createForm()(ManWarn)