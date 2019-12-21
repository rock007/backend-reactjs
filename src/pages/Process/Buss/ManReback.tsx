import * as React from 'react';
import DatePicker from "bee-datepicker";

import {Panel,Form,FormControl,Label,LoadingState,Icon,Button,Breadcrumb} from 'tinper-bee';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import { getValidateFieldsTrim, Info, Warning } from '../../../utils';
import UploadFile from '../../../components/UploadFile';
import { convertFiles } from '../../../utils/tools';

/**
 * 执行强戒
 */

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    fileIds:Array<String>,

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManReback extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/process-reback/:id'.replace(':id','\w?'));
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

        let ids=files.map(m=>m.fileId);
        this.setState({fileIds:ids});
    }

    handler_submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                //values.selectDate = values.selectDate!=null?values.selectDate.format('YYYY-MM-DD'):"";

                if(values.selectDate){
                    values['joinDate']=values.selectDate[0].format('YYYY-MM-DD');
                    values['finishDate']=values.selectDate[1].format('YYYY-MM-DD');
                }
                values['processId']=this.id;
                values['fileIds']=this.state.fileIds.join(',');
                this.setState({isLoading:true});

                ManService.submitRelease(values).then(()=>{

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

        return (<Panel> 
            {
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   执行强戒
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}

        <Form className='edit_form_pop'>
        <FormItem>
            <Label>戒毒人员</Label>
            <strong>{this.state.record.realName}</strong>
        </FormItem>
        <FormItem>
                <Label>性别</Label>
                <strong>{this.state.record.sex}</strong>
        </FormItem>
        <FormItem>
                <Label>身份证号</Label>
                <strong>{this.state.record.idsNo}</strong>
        </FormItem>
        <FormItem>
                <Label>户籍地详细</Label>
                <strong>{this.state.record.birthplaceAddress}</strong>
        </FormItem>
      
        <FormItem>
                <div style={{ width: '100px', float: 'left'}}><Label>报到时间</Label></div>
                <div>
                <strong>{this.state.record.registDate}</strong>
                </div>
        </FormItem>
        <FormItem>
                <Label>工作小组意见</Label>
                <FormControl placeholder="请输入工作小组意见"
                            {...getFieldProps('supLevel1Remarks', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入工作小组意见</span></span>,
                                }],
                            }) }
                />
                <span className='error'>
                     {getFieldError('supLevel1Remarks')}
                </span>
        </FormItem>
        <FormItem>
                <Label>康复办公室意见</Label>
                <FormControl placeholder="请输入康复办公室意见"
                            {...getFieldProps('supLevel2Remarks', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入康复办公室意见</span></span>,
                                }],
                            }) }
                />
                <span className='error'>
                     {getFieldError('supLevel2Remarks')}
                </span>
        </FormItem>
        <FormItem>
                <Label>公安机关意见</Label>
                <FormControl placeholder="请输入公安机关意见"
                            {...getFieldProps('supLevel3Remarks', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入公安机关意见</span></span>,
                                }],
                            }) }
                />
                <span className='error'>
                     {getFieldError('supLevel3Remarks')}
                </span>
        </FormItem>
        <FormItem>
                <div style={{ width: '100px', float: 'left'}}><Label>附件</Label></div>
                <div>
                    <UploadFile  maxSize={3}  uploadChange={this.handler_uploadChange} />
                </div>
        </FormItem>

        <FormItem style={{'paddingLeft':'106px'}}>
            <Button shape="border" onClick={this.goBack} className="reset" style={{"marginRight":"8px"}}>取消</Button>
            <LoadingState  colors="primary" show={ this.state.isLoading }  onClick={this.handler_submit}>保存</LoadingState>
        </FormItem>
</Form>
</Panel>)
    }
}

export default Form.createForm()(ManReback)