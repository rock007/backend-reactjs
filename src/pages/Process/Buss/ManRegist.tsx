import * as React from 'react';
import {Panel,Form,FormControl,Label,Upload,Icon,ButtonGroup,Button} from 'tinper-bee';

import {getValidateFieldsTrim, Warning} from "../../../utils";

import moment from "moment";
import FormError from '../../../components/FormError';
import SelectDict from '../../../components/SelectDict';
import {RefGridTreeTableSelect} from '../../../components/RefViews/RefGridTreeTableSelect';
import ManCateSelect from '../../../components/ManCateSelect';

import DatePicker from "bee-datepicker";
import InputNumber from 'bee-input-number';
import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';

/**
 * 社区报到
 */

const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface ISceneProps {
    form:any
}
interface ISceneState {

}
class ManRegistPage extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
       
    }

    componentDidMount() {

    }
    submit=()=>{

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
            }],
          };

        return (<div>
             
                 <Form className='edit_form_pop'>
                     <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>社区戒毒协议书</Label></div>
                        <div>
                            <Upload {...demo4props}>
                                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                                <p>上传</p>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>担保书</Label></div>
                        <div>
                            <Upload {...demo4props}>
                                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                                <p>上传</p>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>社区康复决定书</Label></div>
                        <div>
                            <Upload {...demo4props}>
                                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                                <p>上传</p>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>人员分类审批表</Label></div>
                        <div>
                            <Upload {...demo4props}>
                                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                                <p>上传</p>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>报到时间</Label>
                        <DatePicker  format={format} 
                                    {...getFieldProps('registDate', {
                                        initialValue:  moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择报到时间'}],
                                    })}
                        />
                        <span className='error'>
                            {getFieldError('registDate')}
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

export default Form.createForm()(ManRegistPage)