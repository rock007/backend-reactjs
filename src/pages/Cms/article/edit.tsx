import * as React from 'react';
import {Panel,Breadcrumb,FormControl,Loading,Col,Form, Select,Icon,LoadingState, Button ,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim,Warning,Info} from "../../../utils";
import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import UploadFile from '../../../components/UploadFile';
import FormError from '../../../components/FormError';
import CmsService from '../../../services/CmsService';
import Editor from '../../../components/Editor';
import RefArticleCateTreeSelect from '../../../components/RefViews/RefArticleCateTreeSelect';
import AppConsts from '../../../lib/appconst';

const FormItem = Form.FormItem;;


interface IOtherProps {
    
} 

interface IOtherState {
    id:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ArticleEdit extends React.Component<IPageProps,IPageState> {
    
    id:string=''
    logo:string=''

    editor:any;

    state:IPageState={
        isLoading:false,
        record:{},
        id:''
    }
    
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
    
        if(this.isPage()){
            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/article-edit/:id'.replace(':id','\w?'));
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
        let result = await CmsService.findArticleById(id);

        this.logo=result.logo||'';
        this.setState({record:result,isLoading:false});
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

            this.logo= files[0].url.replace(AppConsts.uploadUrl,'');
        }else{
            this.logo='';
        }

    }
    handler_submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                if(values.cateId!=null){

                    var obj=JSON.parse(values.cateId);
                    values.cateId=obj.refpk;
                    values.cateName=obj.refname;
                }

                values['logo']=this.logo;
                values['contentHtml']=this.editor.getEditorContent();

                values['id']=this.id;
                this.setState({isLoading:true});

                CmsService.submitArticle(values).then(()=>{

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

    renderUploadFile=()=>{

        if(this.id==='0'){

            return (  <UploadFile   from='fileIds' uploadChange={this.handler_uploadChange} />)

        }else {
            if(this.state.record.id!=null){
           return  (<UploadFile   from='fileIds' uploadChange={this.handler_uploadChange} 
                defaultFileList={[{
                    uid:this.state.record.id+'',
                    url:AppConsts.uploadUrl +this.state.record.logo
                }]}/>)
            }else{

                return (<span>加载中...</span>)
            }

        }

    }

    render() {
        
        const _this = this;
        let {getFieldProps, getFieldError} = this.props.form;

        if(this.id!=='0'&&this.state.record.id==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }

        return (<Panel >
            {this.isPage()?(
              <Breadcrumb>
			        <Breadcrumb.Item href="#">
			            工作台
			        </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        信息发布
			        </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        编辑
			        </Breadcrumb.Item>
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
                </Breadcrumb>)
                :null
            }

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>类别</Label>
                        <RefArticleCateTreeSelect {...getFieldProps('cateId', {
                            initialValue: JSON.stringify({refpk:this.state.record.cateId,refname:this.state.record.cateName}),
                            rules: [{
                                required: true, message: <span><span>请选择类别</span></span>,
                            }]
                        })}/>
                        <FormError errorMsg={getFieldError('cateId')}/>
                    </FormItem>
                    <FormItem>
                        <Label>标题</Label>
                        <FormControl 
                            {...getFieldProps('title', {
                                    initialValue: this.state.record.title ,
                                    rules: [{
                                        required: true, message: <span>请输入标题</span>,
                                    }]
                                }
                            )}
                        />
                        <FormError errorMsg={getFieldError('title')}/>
                    </FormItem>
                    <FormItem>
                        <Editor  ref={el => this.editor = el} defaultHtml={this.state.record.contentHtml}></Editor>

                    </FormItem>
                    <FormItem style={{display:'flex'}}>
                    <Label>封面</Label>
                        <div style={{display:'inline-block',width:'auto'}}>
                            <UploadFile   from='fileIds' uploadChange={this.handler_uploadChange} 
                                defaultFileList={this.state.record.id!=null?[{
                                    uid:this.state.record.id,
                                    name:'封面',
                                    url:AppConsts.uploadUrl +this.state.record.logo
                                }]:null}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl 
                                 {...getFieldProps('index', {
                                     validateTrigger: 'onBlur',
                                     initialValue: this.state.record.index,
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\d+/ig,
                                         message: '请输入排序值，数字',
                                     }],
                                 })}
                        />
                        <FormError errorMsg={getFieldError('index')}/>
                    </FormItem>
                <FormItem>
                    <Label>是否置顶</Label>
                    <Radio.RadioGroup {...getFieldProps('isTop', {
                                initialValue: this.state.record.isTop+'',
                                rules: [{
                                    required: false, message: '是否置顶',
                                }],
                            })}>
                            <Radio value="0">否</Radio>
                            <Radio value="1">是</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('isTop')}/>
                </FormItem>
                <FormItem>
                    <Label>状态</Label>
                    <Radio.RadioGroup {...getFieldProps('status', {
                                initialValue:this.state.record.status+'',
                                rules: [{
                                    required: true, message: '请选择审核结果',
                                }],
                            })}>
                            <Radio value="0">草稿</Radio>
                            <Radio value="1">发布</Radio>
                            <Radio value="2">下线</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('status')}/>
                </FormItem>
                
              
                </Form>
                <div style={{'textAlign':'center'}}>
                    <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading } onClick={this.handler_submit}>保存</LoadingState>
                </div>
        </Panel>)
    }
}

export default Form.createForm()(ArticleEdit);