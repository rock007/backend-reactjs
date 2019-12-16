import * as React from 'react';
import {Form,Label,Breadcrumb,Icon,Button} from 'tinper-bee';

import {getValidateFieldsTrim, Warning} from "../../../utils";

import moment from "moment";
import DatePicker from "bee-datepicker";
import AppConsts from '../../../lib/appconst';
import UploadFile from '../../../components/UploadFile';
import { convertFiles } from '../../../utils/tools';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';

/**
 * 社区报到
 */
const FormItem = Form.FormItem;

const format = "YYYY-MM-DD";

interface IOtherProps {
    
} 

interface IOtherState {
    fileIds0:Array<String>,
    fileIds1:Array<String>,
    fileIds2:Array<String>,
    fileIds3:Array<String>,
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManRegistPage extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={

        isLoading:false,
        record:{},

        fileIds0:[],
        fileIds1:[],
        fileIds2:[],
        fileIds3:[],
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/prrocess-regist/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
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

        const m1=files.map((m,i)=>m.fileId);
        const o1={};
        o1[where]=m1;

        this.setState(o1);
    }

    submit=()=>{

    }

    render() {
        let {getFieldProps, getFieldError} = this.props.form;

        return (<div>
             	{
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   社区报到
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}
                 <Form className='edit_form_pop'>
                     <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>社区戒毒协议书</Label></div>
                        <div>
                            <UploadFile from="0" uploadChange={this.handler_uploadChange} defaultFileList={convertFiles(this.state.fileIds0)}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>担保书</Label></div>
                        <div>
                            <UploadFile from="1" uploadChange={this.handler_uploadChange} defaultFileList={convertFiles(this.state.fileIds1)}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>社区康复决定书</Label></div>
                        <div>
                            <UploadFile from="2" uploadChange={this.handler_uploadChange} defaultFileList={convertFiles(this.state.fileIds2)}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div style={{ width: '100px', float: 'left'}}><Label>人员分类审批表</Label></div>
                        <div>
                            <UploadFile from="3" uploadChange={this.handler_uploadChange} defaultFileList={convertFiles(this.state.fileIds3)}/>
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
                        <Button shape="border"   onClick={this.goBack} style={{"marginRight":"8px"}}>取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>
        </div >)
    }
}

export default Form.createForm()(ManRegistPage)