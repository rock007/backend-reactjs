import * as React from 'react';
import {Panel, PanelGroup, Icon,Select, FormControl,Upload ,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';

import {deepClone, mergeListObj, delListObj,getValidateFieldsTrim} from "../../../utils";

import moment from "moment";
import PopDialog from '../../../components/Pop';
import FormError from '../../../components/FormError';
import SelectDict from '../../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';
import ManCateSelect from '../../../components/ManCateSelect';

import DatePicker from "bee-datepicker";
import InputNumber from 'bee-input-number';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

import './index.scss';

const FormItem = FormListItem;
const {Option} = Select;

interface IPageProps {
    
}
interface IPageState {
    btnFlag:number,
    rowData:any,
    activeKey:string
}

const {YearPicker} = DatePicker;
const format = "YYYY-MM-DD";
const formatYYYY = "YYYY";
let titleArr = ["新增", "修改", "详情"];


class ManEdit extends React.Component<any,IPageState> {
    
    state:IPageState={
        btnFlag:0,
        rowData:{},
        activeKey:'1'
    }
    
    constructor(args) {
        super(args);
        
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let _this = this;
        let {btnFlag, currentIndex} = this.props;
        let {btnFlag: nextBtnFlag, currentIndex: nextCurrentIndex, editModelVisible} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (btnFlag !== nextBtnFlag || currentIndex !== nextCurrentIndex) {
            _this.props.form.resetFields();
            // 防止网络阻塞造成btnFlag显示不正常
            this.setState({btnFlag: nextBtnFlag}); 
            if (nextBtnFlag !== 0 && editModelVisible) {
                let {list} = this.props;
                let rowData = list[nextCurrentIndex] || {};
                this.setState({rowData});
            }
        }

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
        let _this = this,
            {rowData} = this.state,
            resObj = {} as any;

        if (rowData) {
            resObj = Object.assign({}, rowData, values);
        }
        resObj.year = resObj.year.format(formatYYYY);
        //修改状态日期格式化
        if(resObj.applyTime){
            resObj.applyTime=resObj.applyTime.format(format);
        }
        _this.onHandleRef(resObj);
        return resObj;
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
        let {form, editModelVisible} = _this.props;
        let {rowData, btnFlag} = _this.state;
        let {getFieldProps, getFieldError} = form;
        let {
            code, serviceYearsCompany, pickTime,
            postLevel, levelName, year, sex, allowanceStandard, remark,
            deptName, dept, exdeeds, allowanceActual,
            allowanceType, month, pickType, name,
            serviceYears, applyTime
        } = rowData;

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
            }],
          };

        return (   <PopDialog
            show={editModelVisible}
            title={titleArr[btnFlag]}
            size='lg'
            btns={btns}
            autoFocus={false}
            enforceFocus={false}
            close={this.onCloseEdit}
            className="single-table-pop-model"
        >
            <PanelGroup activeKey={this.state.activeKey}  onSelect={this.handleSelect}   accordion>
                <Panel header="基本信息" eventKey="1">
                <FormList>
                <div style={{textAlign:'center'}}>
                    <Upload {...demo4props}>
                        <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                        <p>上传</p>
                    </Upload>
                </div>
                <FormItem
                    label="编号"
                >
                    <FormControl disabled={true}
                                 {...getFieldProps('code', {
                                     initialValue: code || '',
                                 })}
                    />
                </FormItem>
                <FormItem
                    required
                    label="姓名"
                >
                    <FormControl 
                                 {...getFieldProps('name', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="绰号/别名"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>

                <FormItem
                    required
                    label="性别"
                >
                    <Radio.RadioGroup {...getFieldProps('sex', {
                                initialValue: typeof sex !== 'undefined' ? sex : 0,
                                rules: [{
                                    required: true, message: '请选择员工性别',
                                }],
                            })}>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('sex')}/>
                </FormItem>
                <FormItem
                    label="民族"
                >
                    <Select 
                            {...getFieldProps('nation', {
                                initialValue: typeof sex !== 'undefined' ? sex : 0,
                                rules: [{
                                    required: true, message: '请选择员工性别',
                                }],
                            })}
                    >
                        <Option value={0}>女</Option>
                        <Option value={1}>男</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('sex')}/>
                </FormItem>
                <FormItem
                    className="time"
                    required
                    label="出生日期"
                >
                     <DatePicker className='form-item' format={format} 
                                    {...getFieldProps('applyTime', {
                                        initialValue: applyTime ? moment(applyTime) : moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择申请时间'}],
                                    })}
                    />
                </FormItem>
                <FormItem
                    required
                    label="联系方式"
                >
                    <FormControl disabled={btnFlag === 2}
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="政治面貌"
                >
                    <Select 
                            {...getFieldProps('politicalStatus', {
                                initialValue:  0,
                                rules: [{
                                    required: true, message: '请选择政治面貌',
                                }],
                            })}
                    >
                        <Option value={0}>身份证</Option>
                        <Option value={1}>护照</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('politicalStatus')}/>
                </FormItem>
                
                <FormItem
                    required
                    label="证件类型"
                >
                    <Select 
                            {...getFieldProps('idsType', {
                                initialValue:  0,
                                rules: [{
                                    required: true, message: '请选择证件类型',
                                }],
                            })}
                    >
                        <Option value={0}>身份证</Option>
                        <Option value={1}>护照</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('idsType')}/>
                </FormItem>
                <FormItem
                    required
                    label="证件号码"
                >
                    <FormControl disabled={btnFlag === 2}
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
             
                <FormItem
                    label="职业"
                >
                    <FormControl 
                                 {...getFieldProps('job', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('job')}/>
                </FormItem>
                <FormItem
                    label="婚姻状况"
                >
                    <Select 
                            {...getFieldProps('marriageStatus', {
                                initialValue:  '',
                                rules: [{
                                    required: true, message: '请选择政治面貌',
                                }],
                            })}
                    >
                        <Option value={"未婚"}>未婚</Option>
                        <Option value={"已婚"}>已婚</Option>
                        <Option value={"离婚"}>离婚</Option>
                        <Option value={"再婚"}>再婚</Option>
                        <Option value={"丧偶"}>丧偶</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('marriageStatus')}/>
                </FormItem>
                <FormItem
                    label="文化程度"
                >
                     <Select 
                            {...getFieldProps('educationLevel', {
                                initialValue:  '',
                                rules: [{
                                    required: true, message: '请选择文化程度',
                                }],
                            })}
                    >
                        <Option value={"文盲"}>文盲</Option>
                        <Option value={"小学"}>小学</Option>
                        <Option value={"初中"}>初中</Option>
                        <Option value={"高中"}>高中</Option>
                        <Option value={"中专"}>中专</Option>
                        <Option value={"大专"}>大专</Option>
                        <Option value={"本科"}>本科</Option>
                        <Option value={"硕士及以上"}>硕士及以上</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('educationLevel')}/>
                </FormItem>
                <FormItem
                    label="身高"
                >
                    <InputNumber iconStyle="one" min={0} step={1} max={399}
                                 {...getFieldProps('height', {
                                     initialValue: '',
                                     rules: [{pattern: /^[0-9]+$/, required: true}],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('height')}/>
                </FormItem>
                <FormItem
                    label="体重"
                >
                    <InputNumber iconStyle="weight" min={0} step={1}  max={400}
                                 {...getFieldProps('height', {
                                     initialValue: '',
                                     rules: [{pattern: /^[0-9]+$/, required: true}],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('weight')}/>
                </FormItem>
                <FormItem
                    label="户籍地"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="户籍地派出所"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="户籍地详址"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    
                    label="居住地"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    
                    label="居住地派出所"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    
                    label="居住地详址"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    
                    label="籍贯"
                >
                    <FormControl 
                                 {...getFieldProps('name2', {
                                     validateTrigger: 'onBlur',
                                     initialValue: name || '',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="宗教信仰"
                >
                    <Select multiple
                            {...getFieldProps('beliefType', {
                                initialValue:  0,
                                rules: [{
                                    required: true, message: '请选择宗教信仰',
                                }],
                            })}
                    >
                        <Option value={0}>身份证</Option>
                        <Option value={1}>护照</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                    label="滥用毒品种类"
                >
                    <Select multiple
                            {...getFieldProps('beliefType', {
                                initialValue:  0,
                                rules: [{
                                    required: true, message: '请选择宗教信仰',
                                }],
                            })}
                    >
                        <Option value={0}>身份证</Option>
                        <Option value={1}>护照</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('name')}/>
                </FormItem>
                <FormItem
                   label="查获日期"
               >
                    <DatePicker className='form-item' format={format} 
                                   {...getFieldProps('applyTime', {
                                       initialValue: applyTime ? moment(applyTime) : moment(),
                                       validateTrigger: 'onBlur',
                                       rules: [{required: true, message: '请选择申请时间'}],
                                   })}
                   />
                   <FormError errorMsg={getFieldError('name')}/>
               </FormItem>
               <FormItem
                   label="查获单位"
               >
                   <FormControl 
                                {...getFieldProps('name2', {
                                    validateTrigger: 'onBlur',
                                    initialValue: name || '',
                                    rules: [{
                                        type: 'string',
                                        required: true,
                                        pattern: /\S+/ig,
                                        message: '请输入员工姓名',
                                    }],
                                })}
                   />
                   <FormError errorMsg={getFieldError('name')}/>
               </FormItem>

                </FormList>

                </Panel>
                <Panel header="社戒情况" eventKey="2">
                <FormList>
               
               <FormItem
                       required
                       label="组织社区"
                   >
                       <RefOrgTreeSelect />
                       
                       <FormError errorMsg={getFieldError('dept')}/>
               </FormItem>
               <FormItem
                       required
                       label="网格单元"
                   >
                       <RefGridTreeTableSelect {...getFieldProps('gridId', {initialValue: ''})}/>
                       <FormError errorMsg={getFieldError('dept')}/>
               </FormItem>
               <FormItem
                       required
                       label="人员分类"
                   >
                       <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})}/>
                       <FormError errorMsg={getFieldError('dept')}/>
               </FormItem>
               <FormItem
                       required
                       label="风险等级"
                   >
                       <SelectDict onChange={()=>{}} type={31} {...getFieldProps('level', {initialValue: ''})}/>
                       <FormError errorMsg={getFieldError('dept')}/>
               </FormItem>
               <FormItem
                    className="time"
                    required
                    label="社区报到时间"
                >
                     <DatePicker className='form-item' format={format} 
                                    {...getFieldProps('registSetDate', {
                                        initialValue: applyTime ? moment(applyTime) : moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择申请时间'}],
                                    })}
                    />
                </FormItem>
               <FormItem
                   label="备注"
               >
                   <FormControl disabled={btnFlag === 2}
                                {...getFieldProps('remark', {
                                        initialValue: remark || ''
                                    }
                                )}
                   />
               </FormItem>
           </FormList>
                
                </Panel>
            </PanelGroup>
           

        </PopDialog>)
    }
}

export default Form.createForm()(ManEdit);