import * as React from 'react';

import {Panel,Breadcrumb,Form,FormControl,Label,LoadingState,Icon,Button} from 'tinper-bee';
import RefManTreeTableSelect from '../../../components/RefViews/RefManTreeTableSelect';
import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import { getValidateFieldsTrim, Warning, Info } from '../../../utils';
import BussService from '../../../services/BussService';
import UploadFile from '../../../components/UploadFile';

/**
 * 发送告诫书
 */

const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface IOtherProps {
    
} 

interface IOtherState {
    fileIds:Array<String>,
   
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;


class ManNotice extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        isLoading:false,
        record:{},
        fileIds:[]
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/process-notice/:id'.replace(':id','\w?'));
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
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }
    handler_uploadChange=(files:Array<any>,where:string)=>{

        let ids=files.map(m=>m.uid);
        this.setState({fileIds:ids});
    }
    handler_submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                if(values.manId!=null){

                    var obj=JSON.parse(values.manId);
                    values.manId=obj.refpk;
                    values.manName=obj.refname;
                }

                //多个
                if(values.receiveUid&&values.receiveUid!=''){
                    let oo=JSON.parse(values.receiveUid);
                    values.receiveUid=oo.refpk.replace(/;/g,',');
                    values.receiveName=oo.refname.replace(/;/g,',');
                }

                values['processId']=this.id;
                values['fileIds']=this.state.fileIds.join(',');
                this.setState({isLoading:true});

                BussService.submitNotice(values).then(()=>{

                    //Info('操作成功');
                    this.goBack(1)
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
                   发告诫书
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
                        }/>
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
                            {...getFieldProps('receiveUid', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入接收人</span></span>,
                                }],
                            })} >
                        </RefUserTreeTableSelect>
                        <span className='error'>
                            {getFieldError('receiveUid')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>附件</Label></div>
                        <div>
                            <UploadFile maxSize={3}  uploadChange={this.handler_uploadChange} />
                        </div>
                    </FormItem>
                    
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
                        <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>
                    </FormItem>
                </Form>
        </div >)
    }
}

export default Form.createForm()(ManNotice)