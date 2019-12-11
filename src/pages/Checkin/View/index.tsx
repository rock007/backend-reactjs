import * as React from 'react';
import {Panel,Radio,Form,Label,Button,LoadingState ,Col, Row } from 'tinper-bee';

import {getValidateFieldsTrim,Warning,Info} from "../../../utils";
import ManService from '../../../services/ManService';
import FormError from '../../../components/FormError';

import MapView from '../../../components/MapView';
import UploadFile from '../../../components/UploadFile';
import AppConsts from '../../../lib/appconst';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:()=>void
}
interface IPageState {
    isLoading:boolean,
    record:any,
}

class CheckinView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/checkin-detail/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findCheckinById(id);

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

                values['id']=this.id;
                this.setState({isLoading:true});

                ManService.submitCheckinAudit(values).then(()=>{

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
            <Row>
                <Col md={6} >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.realName}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>时间</Label>
                    <strong>{this.state.record.createDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>地点</Label>
                    <strong>{this.state.record.location}</strong>
                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>图片</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                        <UploadFile disabled={true} defaultFileList={[{'uid':new Date().getTime(),'url':AppConsts.uploadUrl+ this.state.record.photo}]} ></UploadFile>
                    </div>
                </FormItem>
                <FormItem>
                    <Label>是否有校</Label>
                    <Radio.RadioGroup {...getFieldProps('status', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择审核结果',
                                }],
                            })}>
                            <Radio value="1">有效</Radio>
                            <Radio value="0">无效</Radio>
                        </Radio.RadioGroup>
                    <FormError errorMsg={getFieldError('status')}/>
                </FormItem>
                </Form>
                <div style={{'textAlign':'center'}}>
                    <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                    <LoadingState  colors="primary" show={ this.state.isLoading } onClick={this.handler_submit}>保存</LoadingState>
                </div>
                </Col>
                <Col md={6} >
                    <MapView width={370} height={300}/>
                </Col>
            </Row>
                
        </Panel>)
    }
}

export default Form.createForm()(CheckinView);