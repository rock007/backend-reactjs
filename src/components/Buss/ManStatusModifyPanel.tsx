import * as React from 'react';
import {Label,Radio,Panel, Button,Select, Form, FormControl} from 'tinper-bee';

//import {FormList ,FormListItem}from '../../components/FormList';
import {getValidateFieldsTrim} from "../../utils";
import FormError from '../../components/FormError';
import SelectDict from '../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../components/RefViews/RefGridTreeTableSelect';
import ManCateSelect from '../../components/ManCateSelect';
import {RefOrgTreeSelect} from '../../components/RefViews/RefOrgTreeSelect';

import DatePicker from "bee-datepicker";

//const FormItem = FormListItem;
const FormItem = Form.FormItem;;
const {Option} = Select;

interface IPanelProps{
   //children?: React.ReactNode
}
type IFooBar = IPanelProps & any;

interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any,
    selectedValue:number
}

/**
 * 戒毒人员状态信息修改（社区，人员分类，风险等级，网格）
 */
class ManStatusModifyPanel extends React.Component<IFooBar,IPanelState> {
    
    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null,
        selectedValue:-1
    }
    componentDidMount() {

    }
    submit=()=>{
        
    }
    render() {
      const me=this;
      let {getFieldProps, getFieldError} = this.props.form;

  //{this.props.others}
        return (<React.Fragment>
   <div>
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
                  <FormItem>
                      <Label>组织社区</Label>
                      <RefOrgTreeSelect />
                      <FormError errorMsg={getFieldError('dept')}/>
                  </FormItem>
                ):null}
                
             
               
               {this.state.selectedValue==2?(
                 <FormItem>
                  <Label>人员分类</Label>
                  
                    <ManCateSelect {...getFieldProps('cateType', {initialValue: ''})} />
                 
                </FormItem>
               ):null}

               {this.state.selectedValue==3?(
                 <FormItem>
                    <Label>风险等级</Label>
                    <SelectDict onChange={()=>{}} type={31} {...getFieldProps('level', {initialValue: ''})}  style={{width:'200px'}} />
                    <FormError errorMsg={getFieldError('dept')}/>
                </FormItem>
               ):null}

                {this.state.selectedValue==4?(
                 <FormItem>
                    <Label>网格单元</Label>
                    <RefGridTreeTableSelect {...getFieldProps('gridId', {initialValue: ''})}/>
                    <FormError errorMsg={getFieldError('dept')}/>
                </FormItem>
               ):null}
               
               {this.state.selectedValue==5?(
                    <FormItem>
                        <Label>社区报到时间</Label>
                        <DatePicker  format={'YYYY-MM-DD'} 
                               {...getFieldProps('registSetDate', {
                                   initialValue: '',
                                   validateTrigger: 'onBlur',
                                   rules: [{required: true, message: '请选择申请时间'}],
                               })}
                        />
                    </FormItem>
               ):null}
               
                <FormItem>
                    <Label>原因</Label>
                    <Select
          showSearch={true}
          allowClear={true}
        >
          <Option value="">(请选择)</Option>
          <Option value="confirming">不是我们社区的人员</Option>
          <Option value="executing">执行强戒，终止社区戒毒</Option>
          <Option value="termination">其它</Option>
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
                        <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary" className="login" onClick={this.submit}>保存</Button>
                </FormItem>
            </Form> 
                </div>
            </React.Fragment>);
    }
}

export default Form.createForm()(ManStatusModifyPanel);