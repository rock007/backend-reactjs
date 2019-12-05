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
import { convertLevelText } from '../../../utils/tools';

const FormItem = Form.FormItem;;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:any
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

/**
 * 戒毒人员状态信息修改（社区，人员分类，风险等级，网格）
 */
class ManBussModifyPage extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/man-buss-modify/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!==''){
            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findManById(id);

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

                values.selectDate = values.testDate!=null?values.testDate.format('YYYY-MM-DD'):"";

                values['manId']=this.id;
                this.setState({isLoading:true});

                ManService.submitBussUpdate(values).then(()=>{

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
				  档案库
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   社戒变更
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
          <Form className='edit_form_pop'>
                <FormItem>
                    <Label>业务操作</Label>
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
                        <Radio value="1" >转移社区</Radio>
                        <Radio value="2" >修改人员分类</Radio>
                        <Radio value="3" >修改风险等级</Radio>
                        <Radio value="4" >修改所属网格</Radio>
                        <Radio value="5" >修改报到时间</Radio>
                    </Radio.RadioGroup>
                </FormItem>
                {this.state.selectedValue==1?(
                    <React.Fragment>
                    <FormItem>
                        <Label>当前社区</Label>
                        <strong>{this.state.record.orgName}</strong>
                    </FormItem>
                   <FormItem>
                      <Label>组织社区</Label>
                      <RefOrgTreeSelect {...getFieldProps('orgId', {initialValue: ''})} />
                      <FormError errorMsg={getFieldError('orgId')}/>
                  </FormItem>
                  </React.Fragment>
                ):null}
               
               {this.state.selectedValue==2?(
                    <React.Fragment>
                    <FormItem>
                        <Label>当前分类</Label>
                        <strong>{this.state.record.cateTypeText}</strong>
                    </FormItem>
                 <FormItem>
                  <Label>人员分类</Label>
                  
                    <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})} />
                    <FormError errorMsg={getFieldError('cateType')}/>
                </FormItem>
                </React.Fragment>
               ):null}

               {this.state.selectedValue==3?(
                    <React.Fragment>
                    <FormItem>
                        <Label>当前风险等级</Label>
                        <strong>{convertLevelText(this.state.record.level)}</strong>
                    </FormItem>
                 <FormItem>
                    <Label>风险等级</Label>
                    <SelectDict type={31} {...getFieldProps('level', {initialValue: ''})}  style={{width:'200px'}} />
                    <FormError errorMsg={getFieldError('level')}/>
                </FormItem>
                </React.Fragment>
               ):null}

                {this.state.selectedValue==4?(
                     <React.Fragment>
                     <FormItem>
                         <Label>当前网格</Label>
                         <strong>{this.state.record.cellName}</strong>
                     </FormItem>
                 <FormItem>
                    <Label>网格单元</Label>
                    <RefGridTreeTableSelect {...getFieldProps('cellId', {initialValue: ''})}/>
                    <FormError errorMsg={getFieldError('cellId')}/>
                </FormItem>
                </React.Fragment>
               ):null}
               
               {this.state.selectedValue==5?(
                    <React.Fragment>
                    <FormItem>
                        <Label>当前报到时间</Label>
                        <strong>{this.state.record.registDate}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>社区报到时间</Label>
                        <DatePicker  format={'YYYY-MM-DD'} 
                               {...getFieldProps('registDate', {
                                   initialValue: '',
                                   validateTrigger: 'onBlur',
                                   rules: [{required: true, message: '请选择申请时间'}],
                               })}
                        />
                    </FormItem>
                    </React.Fragment>
               ):null}
               
                <FormItem>
                    <Label>原因</Label>
                    <Select
          showSearch={true}
          allowClear={true}
        >
          <Select.Option value="">(请选择)</Select.Option>
          <Select.Option value="confirming">不是我们社区的人员</Select.Option>
          <Select.Option value="executing">执行强戒，终止社区戒毒</Select.Option>
          <Select.Option value="termination">其它</Select.Option>
        </Select>
               </FormItem>
               <FormItem>
                    <Label>备注</Label>
                   <FormControl 
                                {...getFieldProps('remark', {
                                        initialValue: ''
                                    }
                                )}
                   />
               </FormItem>
               <FormItem style={{'paddingLeft':'106px'}}>
                    <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>
                </FormItem>
            </Form> 
                </Panel>);
    }
}

export default Form.createForm()(ManBussModifyPage);