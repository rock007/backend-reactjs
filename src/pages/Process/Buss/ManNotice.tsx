import * as React from 'react';

import {Panel,Form,FormControl,Label,Upload,Icon,Button} from 'tinper-bee';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';
import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';

/**
 * 发送告诫书
 */

const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface ISceneProps {
    form:any
}
interface ISceneState {

}
class ManNotice extends React.Component<ISceneProps,ISceneState> {
    
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

        return ( <div>
            <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>戒毒人员</Label>
                        <RefManTreeTableSelect />
                        <span className='error'>
                            {getFieldError('manId')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>内容</Label></div>
                        <textarea rows={3} cols={3} style={{minWidth:'300px'}}
                         {...getFieldProps('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入内容</span></span>,
                            }],
                        }) }>
                        </textarea>
                        <span className='error'>
                            {getFieldError('content')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>地址</Label>
                        <FormControl placeholder="请输入地址"
                            {...getFieldProps('address', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入地址</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('address')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>接收人</Label>
                        <RefUserTreeTableSelect
                            placeholder="请输入告诫书接收人（最多三个）"
                            {...getFieldProps('receiveName', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入接收人</span></span>,
                                }],
                            })} >
                        </RefUserTreeTableSelect>
                        <span className='error'>
                            {getFieldError('receiveName')}
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
                    
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary" className="login" onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>
        </div >)
    }
}

export default Form.createForm()(ManNotice)