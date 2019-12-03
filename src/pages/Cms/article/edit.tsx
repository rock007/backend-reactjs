import * as React from 'react';
import {Panel,Breadcrumb,FormControl,Row,Col,Form, Select,Icon,LoadingState, Button ,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim,Warning,Info} from "../../../utils";
import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import UploadFile from '../../../components/UploadFile';
import FormError from '../../../components/FormError';
import CmsService from '../../../services/CmsService';
import Editor from '../../../components/Editor';

const FormItem = Form.FormItem;;


interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ArticleEdit extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
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
            const m1=new RegExp('/article-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await CmsService.findArticleById(id);

        this.setState({record:result,isLoading:false});
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

                //values.testDate = values.testDate!=null?values.testDate.format('YYYY-MM-DD'):"";

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

    render() {
        
        const _this = this;
        let {getFieldProps, getFieldError} = this.props.form;

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
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
                </Breadcrumb>)
                :null
            }

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>类别</Label>
                        <Select
                            defaultValue="all"
                            style={{ width: 200, marginRight: 6 }}
                            showSearch={true}
                            allowClear={true}>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="confirming">待确认</Select.Option>
                            <Select.Option value="executing">执行中</Select.Option>
                            <Select.Option value="termination">终止</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Label>标题</Label>
                        <FormControl 
                            {...getFieldProps('title', {
                                    initialValue: this.state.record.title 
                                }
                            )}
                        />
                    </FormItem>
                    <FormItem>
                        <Editor></Editor>
                    </FormItem>
                    <FormItem style={{display:'flex'}}>
                    <Label>封面</Label>
                        <div style={{display:'inline-block',width:'auto'}}>
                            <UploadFile    from='file1Ids'/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl 
                                 {...getFieldProps('index', {
                                     validateTrigger: 'onBlur',
                                     initialValue: '0',
                                     rules: [{
                                         type: 'string',
                                         required: true,
                                         pattern: /\d+/ig,
                                         message: '请输入排序值，数字',
                                     }],
                                 })}
                        />
                        <FormError errorMsg={getFieldError('respContent')}/>
                    </FormItem>
                <FormItem>
                    <Label>是否置顶</Label>
                    <Radio.RadioGroup {...getFieldProps('isTop', {
                                initialValue: '0',
                                rules: [{
                                    required: false, message: '是否置顶',
                                }],
                            })}>
                            <Radio value="0">否</Radio>
                            <Radio value="1">是</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('status')}/>
                </FormItem>
                <FormItem>
                    <Label>状态</Label>
                    <Radio.RadioGroup {...getFieldProps('status', {
                                initialValue: '',
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