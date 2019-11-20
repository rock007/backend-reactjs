import * as React from 'react';

import {Panel,Form,FormControl,Label,Upload,InputNumber,Icon,Button,Radio} from 'tinper-bee';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';
/**
 * 解除戒毒
 */

const FormItem = Form.FormItem;

interface ISceneProps {
    form:any
}
interface ISceneState {

}
class ManRelease extends React.Component<ISceneProps,ISceneState> {
    
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

        return ( <Form className='edit_form_pop'>
        <FormItem>
            <Label>戒毒人员</Label>
            <strong>张三</strong>
        </FormItem>
        <FormItem>
                <Label>性别</Label>
                <label>男</label>
        </FormItem>
        <FormItem>
                <Label>身份证号</Label>
                <strong>4202111111111111111111111111</strong>
        </FormItem>
        <FormItem>
                <Label>户籍地详细</Label>
                <strong>户籍地详细户籍地详细户籍地详细户籍地详细户籍地详细户籍地详细户籍地详细</strong>
        </FormItem>
      
        <FormItem>
                <Label>戒毒执行时间</Label>
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
        <FormItem>
                <Label>工作小组意见</Label>
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
        <FormItem>
                <Label>康复办公室意见</Label>
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
        <FormItem>
                <Label>公安机关意见</Label>
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
        <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>附件</Label></div>
                        <div>
                            <Upload {...demo4props}>
                                <Icon type="uf-plus" style={{fontSize:'22px'}}/> 
                                <p>上传</p>
                            </Upload>
                        </div>
        </FormItem>
        <FormItem>
                <Label>操作</Label>
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
</Form>)
    }
}

export default Form.createForm()(ManRelease)