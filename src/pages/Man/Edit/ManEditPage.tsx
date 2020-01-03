import * as React from 'react';
import {Panel, PanelGroup, Loading,Icon,Select, FormControl,Upload ,Button,LoadingState,Form,Radio, Breadcrumb } from 'tinper-bee';

import {FormList ,FormListItem}from '../../../components/FormList';
import {getValidateFieldsTrim, Warning} from "../../../utils";

import moment from "moment";
import FormError from '../../../components/FormError';
import SelectDict from '../../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';
import ManCateSelect from '../../../components/ManCateSelect';

import DatePicker from "bee-datepicker";
import InputNumber from 'bee-input-number';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';
import ManService from '../../../services/ManService';

import './index.scss';
import UploadFile from '../../../components/UploadFile';
import { convertFile } from '../../../utils/tools';
import AppConsts from '../../../lib/appconst';
import { isArray, isString } from 'util';

const FormItem = FormListItem;
const {Option} = Select;

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
    record:any,
    activeKey:string,
    isLoading:boolean,

    manCateSelect:string
}

const format = "YYYY-MM-DD";

class ManEditPage extends React.Component<IPageProps,IPageState> {
    
    id:string=''
    avatar:string=''

    state:IPageState={
        record:{},
        activeKey:'1',
        isLoading:false,
        manCateSelect:''
    }
    
    constructor(args) {
        super(args);
        
        this.handleSelect = this.handleSelect.bind(this);
    }
   
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/man-edit/:id'.replace(':id','\w?'));
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
        let result = await ManService.findManById(id);

        this.setState({record:result,isLoading:false});
    }
    /**
     * 提交表单信息
     */
    onSubmitEdit = () => {
       
        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);
            
            if (!err) {

                values.birthday = values.birthday!=null?values.birthday.format(format):"";
                values.catchDate = values.catchDate!=null?values.catchDate.format(format):"";
                values.registSetDate = values.registSetDate!=null?values.registSetDate.format(format):"";

                if(values.drugsTypes!=null){

                    if(isString(values.drugsTypes)){
                        values.drugsTypes= values.drugsTypes;       
                    }else if(isArray (values.drugsTypes)){
                        values.drugsTypes=values.drugsTypes.join(',');
                    }
                }

                //values.drugsTypes=values.drugsTypes!=null&&isArray (values.drugsTypes) ?values.drugsTypes.join(','):values.drugsTypes;
                values.cellId=values.cellId!=null?JSON.parse(values.cellId).refpk:'';
                values.orgId=values.orgId!=null?JSON.parse(values.orgId).refpk:'';//eg:{"refname":"漫水乡中心戒毒社区","refpk":"001001005"}

                values['manId']=this.id=='0'?null:this.id;
                values['avatar']=this.avatar;
                this.setState({isLoading:true});
                this.doSubmit(values);
            }else{
                Warning('输入验证不通过，请检查');
            }
        } );
    }

    doSubmit=(args)=>{

        ManService.submitMan(args).then((resp)=>{

            this.goBack(1);

        }).catch((err)=>{

            Warning(err.data);

        }).finally(()=>{

            this.setState({isLoading:false});
        });
    }

    handleSelect(activeKey) {
        this.setState({activeKey:activeKey});
    }

    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }
    handler_uploadChange=(files:Array<any>)=>{

        if(files.length>0){

            this.avatar= files[0].url.replace(AppConsts.uploadUrl,'');
        }else{
            this.avatar='';
        }
    }
    handler_cate_change=(rec:string)=>{

        this.setState({manCateSelect:rec});
    }
    renderProcess(){

        if(this.state.record['manId']!=null) return null;

        let {getFieldProps, getFieldError} = this.props.form;

        return (
            <Panel header="社戒情况" eventKey="2">
            <FormList>
            <FormItem
                   required
                   label="组织社区" >

                   <RefOrgTreeSelect  
                    {...getFieldProps('orgId', {
                        initialValue: this.state.record.idsType,
                        rules: [{
                            required: true, message: '请选择组织社区',
                            pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                        }]
                    })}
                    />
                   
                   <FormError errorMsg={getFieldError('orgId')}/>
           </FormItem>
           <FormItem
                   required
                   label="网格单元">
                   <RefGridTreeTableSelect {...getFieldProps('cellId', {
                        initialValue: this.state.record.cellId,
                        rules: [{
                            required: true, message: '请选择网格单元',
                        }]
                    })}/>
                   <FormError errorMsg={getFieldError('cellId')}/>
           </FormItem>
           <FormItem
                   required
                   label="人员分类" >
                   <ManCateSelect 
                   isSelectLeaf={true}
                   handlerOnChange={this.handler_cate_change}
                   {...getFieldProps('cateType', {
                        initialValue: this.state.record.cateType,
                        onChange:this.handler_cate_change,
                        rules: [{
                            required: true, message: '请选择人员分类',
                        }]
                    })}/>
                   <FormError errorMsg={getFieldError('cateType')}/>
           </FormItem>
           <FormItem
                   required
                   label="风险等级" >
                   <SelectDict onChange={()=>{}} type={31} {
                       ...getFieldProps('level', {
                           initialValue: this.state.record.level,
                           rules: [{
                                required: true, message: '请选择风险等级',
                            }]
                        })
                    }/>
                   <FormError errorMsg={getFieldError('level')}/>
           </FormItem>
           {
               this.state.manCateSelect===AppConsts.MAN_CATE_TYPE_SHEJIE||
               this.state.manCateSelect===AppConsts.MAN_CATE_TYPE_SHEKANG?
            <FormItem
                className="time"
                required
                label="报到截止时间" >
                 <DatePicker className='form-item' format={format} 
                                {...getFieldProps('registSetDate', {
                                    initialValue: this.state.record.registSetDate ? moment(this.state.record.registSetDate ) : moment(),
                                    validateTrigger: 'onBlur',
                                    rules: [{required: true, message: '请选择到社区报到截止时间'}],
                                })}
                />
                <FormError errorMsg={getFieldError('registSetDate')}/>
            </FormItem>:null
           }
           
           <FormItem
               label="备注" >
               <FormControl 
                            {...getFieldProps('remark', {
                                    initialValue: this.state.record.remark 
                                }
                            )}
               />
           </FormItem>
       </FormList>
            
            </Panel>
        );

    }

    render() {

        let {getFieldProps, getFieldError} = this.props.form;

        if(this.id!=='0'&&this.state.record.manId==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }

        return (   <Panel>

             {this.isPage()?
                (<Breadcrumb>
			        <Breadcrumb.Item href="#">
			        工作台
			        </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                    档案库
			        </Breadcrumb.Item>
			        <Breadcrumb.Item active>
                    {this.id==''?"添加":"编辑"}
			        </Breadcrumb.Item>
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
                </Breadcrumb>)
                :null}
              
            <PanelGroup activeKey={this.state.activeKey}  onSelect={this.handleSelect}   accordion>
                <Panel header="基本信息" eventKey="1">
                <FormList>
                
                <div style={{textAlign:'center'}}>
                    
                    <UploadFile uploadChange={this.handler_uploadChange}  defaultFileList={ convertFile(this.state.record.avatar)}  disabled={false}/>
                     
                </div>
                <FormItem
                    label="编号">
                    <FormControl disabled={true}
                                 {...getFieldProps('manNo', {
                                     initialValue: this.state.record.manNo,
                                 })}
                    />
                </FormItem>
                <FormItem
                    required
                    label="姓名" >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('realName', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.realName,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入员工姓名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('realName')}/>
                </FormItem>
                <FormItem
                    label="绰号/别名" >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('nickName', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.nickName,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入绰号/别名',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('nickName')}/>
                </FormItem>

                <FormItem
                    required
                    label="性别">
                    <Radio.RadioGroup {...getFieldProps('sex', {
                                initialValue: this.state.record.sex,
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
                    label="民族" >
                    <Select 
                            {...getFieldProps('nation', {
                                initialValue: this.state.record.nation,
                                rules: [{
                                    required: false, message: '请选择民族',
                                }],
                            })}
                    >
                        <Option value={"汉族"}>汉族</Option>
                        <Option value={"苗族"}>苗族</Option>
                        <Option value={"土家族"}>土家族</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('nation')}/>
                </FormItem>
                <FormItem
                    className="time"
                    required
                    label="出生日期">
                     <DatePicker className='form-item' format={format} 
                                    {...getFieldProps('birthday', {
                                        initialValue: this.state.record.birthday==null? moment(): moment(this.state.record.birthday) ,
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择出生日期'}],
                                    })}
                    />
                    <FormError errorMsg={getFieldError('birthday')}/>
                </FormItem>
                <FormItem
                    required
                    label="联系方式">
                    <FormControl  maxLength={20}
                                 {...getFieldProps('linkPhone', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.linkPhone,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入联系方式',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('linkPhone')}/>
                </FormItem>
                <FormItem
                    label="政治面貌" >
                    <Select 
                            {...getFieldProps('politicalStatus', {
                                initialValue:  this.state.record.politicalStatus,
                                rules: [{
                                    required: false, message: '请选择政治面貌',
                                }],
                            })}    >
                        <Option value="群众">群众</Option>
                        <Option value="农民">农民</Option>
                        <Option value="团员">团员</Option>
                        <Option value="党员">党员</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('politicalStatus')}/>
                </FormItem>
                
                <FormItem
                    required
                    label="证件类型" >
                    <Select 
                            {...getFieldProps('idsType', {
                                initialValue: this.state.record.idsType,
                                rules: [{
                                    required: true, message: '请选择证件类型',
                                }],
                            })}
                    >
                        <Option value="身份证">身份证</Option>
                        <Option value="护照">护照</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('idsType')}/>
                </FormItem>
                <FormItem
                    required
                    label="证件号码" >
                    <FormControl  maxLength={25}
                                 {...getFieldProps('idsNo', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.idsNo,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\S+/ig,
                                         message: '请输入证件号码',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('idsNo')}/>
                </FormItem>
             
                <FormItem
                    label="职业"  >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('job', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.job,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入职业',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('job')}/>
                </FormItem>
                <FormItem
                    label="婚姻状况"  >
                    <Select 
                            {...getFieldProps('marriageStatus', {
                                initialValue:  this.state.record.marriageStatus,
                                rules: [{
                                    required: false, message: '请选择婚姻状况',
                                }],
                            })}  >
                        <Option value={"未婚"}>未婚</Option>
                        <Option value={"已婚"}>已婚</Option>
                        <Option value={"离婚"}>离婚</Option>
                        <Option value={"再婚"}>再婚</Option>
                        <Option value={"丧偶"}>丧偶</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('marriageStatus')}/>
                </FormItem>
                <FormItem
                    label="文化程度" >
                     <Select 
                            {...getFieldProps('educationLevel', {
                                initialValue: this.state.record.educationLevel,
                                rules: [{
                                    required: false, message: '请选择文化程度',
                                }],
                            })}   >
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
                    label="身高(cm)" >
                    <InputNumber iconStyle="one" min={0} step={1} max={399}
                                 {...getFieldProps('height', {
                                     initialValue: this.state.record.height,
                                     rules: [{pattern: /^[0-9]+$/, required: false,message: '请输入正确的数字'}],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('height')}/>
                </FormItem>
                <FormItem
                    label="体重(kg)" >
                    <InputNumber iconStyle="weight" min={0} step={1}  max={400}
                                 {...getFieldProps('weight', {
                                     initialValue: this.state.record.weight,
                                     rules: [{pattern: /^[0-9]+$/, required: false}],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('weight')}/>
                </FormItem>
                <FormItem
                    label="户籍地"  >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('birthplaceDistrict', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.birthplaceDistrict,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入户籍地',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('birthplaceDistrict')}/>
                </FormItem>
                <FormItem
                    label="户籍地派出所"  >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('birthplaceRegion', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.birthplaceRegion,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入户籍地派出所',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('birthplaceRegion')}/>
                </FormItem>
                <FormItem
                    label="户籍地详址">
                    <FormControl  maxLength={200}
                                 {...getFieldProps('birthplaceAddress', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.birthplaceAddress,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入户籍地详址',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('birthplaceAddress')}/>
                </FormItem>
                <FormItem
                    label="居住地" >
                    <FormControl 
                                 {...getFieldProps('liveDistrict', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.liveDistrict,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入居住地',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('liveDistrict')}/>
                </FormItem>
                <FormItem
                    label="居住地派出所" >
                    <FormControl  maxLength={20}
                                 {...getFieldProps('liveRegion', {
                                     validateTrigger: 'onBlur',
                                     initialValue:this.state.record.liveRegion,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入居住地派出所',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('liveRegion')}/>
                </FormItem>
                <FormItem
                    label="居住地详址" >
                    <FormControl  maxLength={200}
                                 {...getFieldProps('liveAddress', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.liveAddress,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入居住地详址',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('liveAddress')}/>
                </FormItem>
                <FormItem
                    label="籍贯">
                    <FormControl  maxLength={20}
                                 {...getFieldProps('birthplace', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.birthplace,
                                     rules: [{
                                         type: 'string',
                                         required: false,
                                         pattern: /\S+/ig,
                                         message: '请输入籍贯',
                                     }],
                                 })}
                    />
                    <FormError errorMsg={getFieldError('birthplace')}/>
                </FormItem>
                <FormItem
                    label="宗教信仰" >
                    <Select 
                            {...getFieldProps('beliefType', {
                                initialValue: this.state.record.beliefType,
                                rules: [{
                                    required: false, message: '请选择宗教信仰',
                                }],
                            })}
                    >
                        <Option value="无">无</Option>
                        <Option value="佛教">佛教</Option>
                        <Option value="道教">道教</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('beliefType')}/>
                </FormItem>
                <FormItem
                    label="滥用毒品种类"  >
                    <Select multiple
                            {...getFieldProps('drugsTypes', {
                                initialValue:  this.state.record.drugsTypes,
                                rules: [{
                                    required: false, message: '请选择滥用毒品种类',
                                }],
                            })}  >
                        <Option value="冰毒">冰毒</Option>
                        <Option value="麻古">麻古</Option>
                        <Option value="安定">安定</Option>
                        <Option value="海络因">海络因</Option>
                        <Option value="摇头丸">摇头丸</Option>
                        <Option value="氯胺酮">氯胺酮</Option>
                        <Option value="K粉">K粉</Option>
                    </Select>
                    <FormError errorMsg={getFieldError('drugsTypes')}/>
                </FormItem>
                <FormItem
                   label="查获日期" >
                    <DatePicker className='form-item' format={format} 
                                   {...getFieldProps('catchDate', {
                                       initialValue:  this.state.record.catchDate? moment(this.state.record.catchDate) : moment(),
                                       validateTrigger: 'onBlur',
                                       rules: [{required: false, message: '请选择查获日期'}],
                                   })}
                   />
                   <FormError errorMsg={getFieldError('catchDate')}/>
               </FormItem>
               <FormItem
                   label="查获单位" >
                   <FormControl  maxLength={20} 
                                {...getFieldProps('catchUnit', {
                                    initialValue: this.state.record.catchUnit
                                })}
                   />
                   <FormError errorMsg={getFieldError('catchUnit')}/>
               </FormItem>

                </FormList>
                </Panel>
                
               {this.renderProcess()}
            </PanelGroup>
            <div style={{'textAlign':'center'}}>
                    <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading } onClick={this.onSubmitEdit}>保存</LoadingState>
            </div>

        </Panel>)
    }
}

export default Form.createForm()(ManEditPage);