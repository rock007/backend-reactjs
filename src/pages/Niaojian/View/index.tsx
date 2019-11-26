import * as React from 'react';
import {Panel,  FormControl, Form, Icon,Select, Upload ,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim} from "../../../utils";

import FormError from '../../../components/FormError';

import DatePicker from "bee-datepicker";

import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    isShow:boolean,
    onCloseEdit:()=>void
}
interface IPageState {
    btnFlag:number,
    rowData:any,
    activeKey:string,
    testType:number
}

class NiaojianView extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        btnFlag:0,
        rowData:{},
        activeKey:'1',
        testType:0
    }
    
    constructor(args) {
        super(args);
        this.handleSelect = this.handleSelect.bind(this);
    }
  
    componentDidMount() {

    }

     /**
     * 关闭Modal
     */
    onCloseEdit = () => {
        this.setState({rowData: {}, btnFlag: 0});
        
        this.props.onCloseEdit();
    }

    /**
     * 提交表单信息
     */
    onSubmitEdit = () => {
        let _this = this;
        let {btnFlag}=_this.state;
        _this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);
            if (!err) {
                values = _this.onHandleSaveData(values);
                this.onCloseEdit();
                values.btnFlag=btnFlag; // 弹框状态标识
            //    actions.popupEdit.saveOrder(values);
            }
        } );
    }

    /**
     *
     * @description 处理保存数据
     * @param {Object} values 待处理数据
     */
    onHandleSaveData = (values) => {
        
    }

    onHandleRef = (values) => {
        let arr = ['dept', 'postLevel'];
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = JSON.parse(values[arr[i]]);
            values[arr[i]] = item['refpk'];
        }
    }

    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [

            {
                label: '取消',
                fun: this.onCloseEdit,
                shape: 'border'
            },
            {
                label: '确定',
                fun: _this.onSubmitEdit,
                colors: 'primary'
            },
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }
    handleSelect(activeKey) {
        this.setState({activeKey:activeKey});
    }

    render() {
        
        const _this = this;
        let {form, isShow} = _this.props;
        let {rowData, btnFlag} = _this.state;
        let {getFieldProps, getFieldError} = form;
   

        // console.log('rowData', allowanceStandard);
        let btns = _this.onHandleBtns(btnFlag);

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

        return (<Panel >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    
                    <RefManTreeTableSelect />
                </FormItem>
                <FormItem>
                    <Label>尿检类型</Label>
                    <Radio.RadioGroup
                            selectedValue={this.state.testType}
                            {
                            ...getFieldProps('testType', {
                                initialValue: '',
                                onChange(value) {
                                   // me.setState({ selectedValue: value });
                                },
                                rules: [{ required: true }]
                            }
                            ) }
                        >
                            <Radio value="0" >常规</Radio>
                            <Radio value="1" >随机</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('testType')}/>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检时间</Label>
                    <DatePicker
                            format={'YYYY-MM-DD'}
                            onSelect={()=>{}}
                            onChange={()=>{}}
                        />
                    <FormError errorMsg={getFieldError('testDate')}/>
                </FormItem>

                <FormItem>
                    <Label>尿检结果</Label>
                    <Radio.RadioGroup {...getFieldProps('result', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择尿检结果',
                                }],
                            })}>
                            <Radio value="阴性">阴性</Radio>
                            <Radio value="阳性">阳性</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('sex')}/>
                </FormItem>
                <FormItem>
                    <Label>是否本地</Label>
                    <Radio.RadioGroup {...getFieldProps('isLocal', {
                                initialValue:  0,
                                rules: [{
                                    required: true, message: '请选择是否本地',
                                }],
                            })}>
                            <Radio value="0">是</Radio>
                            <Radio value="1">否</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('sex')}/>
                </FormItem>
                <FormItem>
                    <Label>尿检地点</Label>
                    <FormControl 
                                 {...getFieldProps('address', {
                                     validateTrigger: 'onBlur',
                                     initialValue: '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                </FormItem>
                <FormItem>
                    <Label>说明</Label>
                    <FormControl disabled={btnFlag === 2}
                                 {...getFieldProps('remarks', {
                                     validateTrigger: 'onBlur',
                                     initialValue:  '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('remarks')}/>
                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>尿检人</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <Upload {...demo4props} >
                        <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                        <p>上传</p>
                    </Upload>
                    </div>
                </FormItem>
                
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检报告</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <Upload {...demo4props}  >
                        <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                        <p>上传</p>
                    </Upload>
                    </div>

                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>谈话记录</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <Upload {...demo4props}  >
                        <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                        <p>上传</p>
                    </Upload>
                    </div>

                </FormItem>
             
                </Form>
        </Panel>)
    }
}

export default NiaojianView;